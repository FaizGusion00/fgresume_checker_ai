
"use client";

import { useState } from "react";
import { getAnalysis } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { AnalyzeDocumentOutput } from "@/ai/flows/analyze-document";
import FileUploader from "@/components/file-uploader";
import AnalysisDisplay from "@/components/analysis-display";
import { motion } from 'framer-motion';

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeDocumentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (documentText: string) => {
    if (!documentText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Document content cannot be empty.",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const { data, error } = await getAnalysis(documentText);

    if (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error,
      });
      setAnalysisResult(null);
    } else if (data) {
      setAnalysisResult(data);
    }

    setIsLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
       <motion.div 
        className="md:col-span-1 flex flex-col space-y-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
       >
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-500">
            Elevate Your Documents
          </h1>
          <p className="text-muted-foreground text-lg">
            Paste your document or upload a file. Our AI will provide instant feedback to help you improve it.
          </p>
        </div>
        <FileUploader onAnalyze={handleAnalyze} isLoading={isLoading} />
      </motion.div>

      <motion.div 
        className="md:col-span-2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnalysisDisplay result={analysisResult} isLoading={isLoading} />
      </motion.div>
    </div>
  );
}
