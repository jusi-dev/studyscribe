"use client";

import { getGPT4Response } from "@/actions/gpt-test";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PDFDocument } from 'pdf-lib';
import { convertWordToPDF } from "@/actions/fileactions";
import { FileText, Loader2, Plus, Trash2, Upload } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';
import { FlashCards } from "../_components/FlashCards";
import ReactMarkdown from 'react-markdown';

export default function Dashboard() {
    const [objectives, setObjectives] = useState("");
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState("");
    const [citations, setCitations] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [pageCount, setPageCount] = useState([]);

    const maxPages = 50;

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

        try {
            const { text, citiations } = await getGPT4Response(formData);
            // const convertedBuffer = Buffer.from(fileBuffer, 'base64');

            // const blob = new Blob([convertedBuffer], { type: 'application/octet-stream' });
            // const url = URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = fileName;
            // a.click();

            console.log('Got response:', text);

            setResponse(text);
            setCitations(citiations);
        } catch (error) {
            console.error('Error generating summary:', error);
        } finally {
            setIsGenerating(false);
        }
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

    const totalPages = pageCount.reduce((part, a) => part + a.pages, 0);

    return (
        <main className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Summary</h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Learning Objectives
                                </label>
                                <Textarea 
                                    placeholder="Enter your learning objectives..."
                                    className="min-h-[120px]"
                                    onChange={(e) => setObjectives(e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Files
                                </label>
                                
                                {files.map(({ id, file }, index) => (
                                    <div key={id} className="relative">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <FileText className="h-6 w-6 text-gray-400" />
                                                    <div className="flex-1 min-w-0">
                                                        <label className="cursor-pointer">
                                                            <Input 
                                                                type="file" 
                                                                className="hidden"
                                                                onChange={(e) => onFileChange(e, id)}
                                                                accept=".pdf,.docx"
                                                            />
                                                            {file ? (
                                                                <span className="text-sm text-gray-900 font-medium truncate block">
                                                                    {file.name}
                                                                </span>
                                                            ) : (
                                                                <span className="text-sm text-gray-500">
                                                                    Click to upload file {index + 1}
                                                                </span>
                                                            )}
                                                        </label>
                                                        {pageCount[index]?.pages > 0 && (
                                                            <span className="text-xs text-gray-500">
                                                                {pageCount[index].pages} pages
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFile(id)}
                                                className="text-gray-400 hover:text-red-500"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}

                                {totalPages <= maxPages && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addFile}
                                        className="w-full"
                                    >
                                        <Plus className="h-5 w-5 mr-2" />
                                        Add Another File
                                    </Button>
                                )}

                                {totalPages > maxPages && (
                                    <p className="text-sm text-red-500">
                                        Maximum page limit ({maxPages} pages) exceeded
                                    </p>
                                )}

                                {totalPages > 0 && (
                                    <p className="text-sm text-gray-500">
                                        Total pages: {totalPages} / {maxPages}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isGenerating || totalPages > maxPages || totalPages === 0}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Generating Summary...
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mr-2 h-4 w-4" />
                                        Create Summary
                                    </>
                                )}
                            </Button>
                        </form>

                        {response && (
                            <div className="w-full p-4 mt-4 rounded-lg border border-input bg-background">
                                <div className="prose prose-sm max-w-none">
                                    <ReactMarkdown>
                                        {response}
                                    </ReactMarkdown>
                                </div>
                                {citations && citations.length > 0 && (
                                    <div className="mt-4 text-sm text-gray-500">
                                        <div className="font-semibold">Citations:</div>
                                        {citations.map((citation, index) => (
                                            <div key={index}>{citation}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="mt-12">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Flashcards</h2>
                            <FlashCards flashcardsText={response}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
