"use client";

import React, { useState, useCallback, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.mjs`;

interface FileUploaderProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function FileUploader({ onAnalyze, isLoading }: FileUploaderProps) {
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const extractTextFromPdf = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      fullText += textContent.items.map(item => 'str' in item ? item.str : '').join(' ') + '\n';
    }
    return fullText;
  };
  
  const handleFile = useCallback(async (file: File | null) => {
    if (!file) return;

    if (file.type === 'application/pdf') {
      try {
        const extractedText = await extractTextFromPdf(file);
        setText(extractedText);
      } catch (error) {
        console.error('Error parsing PDF:', error);
        toast({
          variant: 'destructive',
          title: 'PDF Parsing Error',
          description: 'Could not read text from the PDF. Please try a different file or paste the text manually.',
        });
      }
    } else if (file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setText(e.target?.result as string);
      reader.readAsText(file);
    } else {
      toast({
        variant: 'destructive',
        title: 'Unsupported File Type',
        description: 'Please upload a .pdf or .txt file.',
      });
    }
  }, [toast]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsDragging(false);
    handleFile(acceptedFiles[0]);
  }, [handleFile]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };


  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${isDragging ? 'border-primary bg-accent/10' : 'border-border'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <CardContent className="p-6 text-center cursor-pointer">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            <span className="font-semibold text-primary">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">PDF or TXT files</p>
        </CardContent>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept=".pdf,.txt"
          onChange={(e) => handleFile(e.target.files ? e.target.files[0] : null)}
        />
      </Card>

      <Textarea
        placeholder="Or paste your resume here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={15}
        className="bg-card"
        aria-label="Resume text input"
      />
      <Button onClick={() => onAnalyze(text)} disabled={isLoading || !text} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
      </Button>
    </div>
  );
}
