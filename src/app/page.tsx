"use client";

import { useState } from "react";
import { getAnalysis } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import type { AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";
import FileUploader from "@/components/file-uploader";
import AnalysisDisplay from "@/components/analysis-display";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResumeOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalyze = async (resumeText: string) => {
    if (!resumeText.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Resume content cannot be empty.",
      });
      return;
    }

    setIsLoading(true);
    setAnalysisResult(null);

    const { data, error } = await getAnalysis(resumeText);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
      <div className="flex flex-col space-y-6">
        <h1 className="text-3xl font-bold text-primary">Upload Your Resume</h1>
        <p className="text-muted-foreground">
          Paste your resume text or upload a .txt or .pdf file. Our AI will provide instant feedback to help you land your dream job.
        </p>
        <FileUploader onAnalyze={handleAnalyze} isLoading={isLoading} />
      </div>

      <div className="mt-8 lg:mt-0">
        <AnalysisDisplay result={analysisResult} isLoading={isLoading} />
      </div>
    </div>
  );
}
