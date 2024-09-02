"use client";

import { getGPT4Response } from "@/actions/gpt-test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PDFDocument } from 'pdf-lib';
import { convertWordToPDF } from "@/actions/fileactions";
import { Trash } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { FlashCards } from "../_components/FlashCards";

export default function Dashboard() {
    const [objectives, setObjectives] = useState("");
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [pageCount, setPageCount] = useState([]);

    const maxPages = 200;

    const countPDFPages = async (arrayBuffer) => {
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const pages = pdfDoc.getPages();
        return pages.length;
    };

    const convertToBuffer = async (file) => {
        const buffer = await file.arrayBuffer();
        return buffer;
    };

    const onFileChange = async (e, id) => {
        const file = e.target.files[0];
        const buffer = await convertToBuffer(file);
        let pages = 0;

        if (file.type === 'application/pdf') {
            pages = await countPDFPages(buffer);
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            const pdfArrayBuffer = await convertWordToPDF(buffer);
            pages = await countPDFPages(pdfArrayBuffer);
        }

        setFiles((prevFiles) => {
            const newFiles = prevFiles.map(f => f.id === id ? { ...f, file } : f);
            return newFiles;
        });

        setPageCount((prevPageCount) => {
            const newPageCount = prevPageCount.map(p => p.id === id ? { ...p, pages } : p);
            return newPageCount;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);

        const formData = new FormData();
        formData.append('objectives', objectives);

        files.forEach(({ file }) => {
            if (file) {
                formData.append('files', file);
            }
        });

        const { fileName, fileBuffer } = await getGPT4Response(formData);
        const convertedBuffer = Buffer.from(fileBuffer, 'base64');

        const blob = new Blob([convertedBuffer], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        setResponse(fileName);
        setIsGenerating(false);
    };

    const removeFile = (id) => {
        setFiles((prevFiles) => prevFiles.filter(file => file.id !== id));
        setPageCount((prevPageCount) => prevPageCount.filter(page => page.id !== id));
    };

    const addFile = () => {
        const id = uuidv4();
        setFiles([...files, { id, file: null }]);
        setPageCount([...pageCount, { id, pages: 0 }]);
    };

    return (
        <main className="flex min-h-screen flex-col items-center">
            <div className="mt-44 container">
                <h1>Dashboard</h1>
                <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
                    <Textarea label="Summary" onChange={(e) => setObjectives(e.target.value)} />

                    {files.map(({ id, file }, index) => (
                        <div key={id}>
                            <p className="text-sm">File {index + 1}:</p>
                            <div className="flex gap-x-2 items-center">
                                <Input label="File" type="file" onChange={(e) => onFileChange(e, id)} />
                                <Trash className="w-6 h-6" onClick={() => removeFile(id)} />
                            </div>
                        </div>
                    ))}

                    {pageCount.reduce((part, a) => part + a.pages, 0) <= maxPages && (
                        <Button type="button" onClick={addFile}>Add File</Button>
                    )}

                    {pageCount.reduce((part, a) => part + a.pages, 0) > maxPages && (
                        <p className="text-red-500 text-sm">You can only upload a maximum of {maxPages} pages.</p>
                    )}
                    <Input
                        disabled={isGenerating || pageCount.reduce((part, a) => part + a.pages, 0) > maxPages}
                        type="submit"
                        value="Create summary"
                    />
                </form>
                <div className="flex w-[90%]">
                    {response && <p>{response}</p>}
                </div>

                <div className="mt-20">
                    <FlashCards />
                </div>
            </div>
        </main>
    );
}
