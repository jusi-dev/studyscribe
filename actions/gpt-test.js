"use server";

import OpenAI from "openai";
import fs from "fs";
import streamifier from "streamifier";

const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI()

const getFileAndCovert = async(fileId) => {
    // const response = await openai.files.content("file-HIqXwcCvzOZKWJR4lQM5n0tG");
    const response = await openai.files.content(fileId);

    const contentDisposition = response.headers.get('content-disposition');
    const fileName = contentDisposition.split('filename="')[1].split('"')[0];

    let chunks = [];

    for await (let chunk of response.body) {
        chunks.push(chunk);
    }

    const bufferReceived = Buffer.concat(chunks);
    console.log("Bufferreceived lenghts: ", bufferReceived.length);

    return {
        fileName,
        fileBuffer: bufferReceived.toString('base64')
    };
}

export async function getGPT4Response(formData) {
    const objectives = formData.get('objectives');
    const arrayOfBuffers = formData.getAll('files');

    const assistant = await openai.beta.assistants.retrieve("asst_yAYMkw4ZaUQYyj4FyIOPlfRv");

    let fileIds = [];

    // const assistant = await openai.beta.assistants.create({
    //     name: "Summarizer for Students",
    //     instructions: "You are a summary bot. Your task is to analyze uploaded files and summarize important content based on learning objects which will be sent to you together with the files.",
    //     model: "gpt-4o-mini",
    //     tools: [{"type": "code_interpreter"}, {"type": "file_search"}],
    //     });


    for (const file of arrayOfBuffers) {
        const createdFile = await openai.files.create({
            file,
            purpose: "assistants",
        });

        fileIds.push(createdFile.id);
    }

    const thread = await openai.beta.threads.create({
        messages: [
            {
            role: "user",
            content:
                objectives,
            attachments: fileIds.map(file_id => ({ file_id, tools: [{ type: "file_search" }] }))
            },
        ],
    });

    await openai.beta.threads.runs
        .stream(thread.id, {
            assistant_id: assistant.id,
        })
        .on("textCreated", () => console.log("assistant >"))
        .on("toolCallCreated", (event) => console.log("assistant " + event.type))
        .on("messageDone", async (event) => {
            if (event.content[0].type === "text") {
                const { text } = event.content[0];
                const { annotations } = text;
                const citations = [];

                let index = 0;
                for (let annotation of annotations) {
                    text.value = text.value.replace(annotation.text, "[" + index + "]");
                    const { file_citation } = annotation;
                    if (file_citation) {
                        const citedFile = await openai.files.retrieve(file_citation.file_id);
                        citations.push("[" + index + "]" + citedFile.filename);
                    }
                    index++;
                }
            }
        })

    // Wait 1 minute
    await new Promise((resolve) => setTimeout(resolve, 60000));
    
    await openai.beta.threads.messages.create(thread.id,
        {
            role: "user",
            content: "Now create a word document with the summary of the file and only output this."
        }
    )

    // Create summary document and return it
    return new Promise((resolve, reject) => {
        openai.beta.threads.runs
            .stream(thread.id, {
                assistant_id: assistant.id,
            })
            .on("textCreated", () => console.log("assistant >"))
            .on("toolCallCreated", (event) => console.log("assistant " + event.type))
            .on("messageDone", async (event) => {
                const fileId = event.attachments[0].file_id;
                // Wait 10 seconds
                await new Promise((resolve) => setTimeout(resolve, 10000));
                console.log("Getting file")
                const {fileBuffer, fileName} = await getFileAndCovert(fileId);
                console.log("Filename: ", fileName)
                await openai.beta.threads.del(thread.id)
                resolve({
                    fileName,
                    fileBuffer
                });
            })
            .on('error', reject);
    });
    
}