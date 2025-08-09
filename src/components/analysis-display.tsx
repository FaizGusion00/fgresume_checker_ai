
"use client";

import type { AnalyzeDocumentOutput } from "@/ai/flows/analyze-document";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScoreCircle } from "./score-circle";
import { BarChart, Lightbulb, FileText, CheckCircle2, BookOpen, Scaling, Pencil } from "lucide-react";

interface AnalysisDisplayProps {
  result: AnalyzeDocumentOutput | null;
  isLoading: boolean;
}

export default function AnalysisDisplay({ result, isLoading }: AnalysisDisplayProps) {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!result) {
    return (
      <Card className="flex h-full min-h-[60vh] items-center justify-center bg-card/50 border-dashed">
        <CardContent className="p-6 text-center">
          <BarChart className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
          <p className="mt-4 text-muted-foreground">
            Your analysis results will appear here.
          </p>
        </CardContent>
      </Card>
    );
  }

  const analysisItems = [
    {
      title: "Content",
      icon: BookOpen,
      text: result.analysis.content,
    },
    {
      title: "Structure",
      icon: Scaling,
      text: result.analysis.structure,
    },
    {
      title: "Clarity",
      icon: Pencil,
      text: result.analysis.clarity,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <Card className="bg-card/50 sticky top-24">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-primary">
              Overall Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ScoreCircle score={result.score} />
            <p className="mt-4 text-center text-muted-foreground text-sm">
              This score reflects your document's effectiveness based on content, structure, and clarity.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Tabs defaultValue="analysis" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50">
            <TabsTrigger value="analysis">
              <FileText className="mr-2 h-4 w-4" />
              Detailed Analysis
            </TabsTrigger>
            <TabsTrigger value="suggestions">
              <Lightbulb className="mr-2 h-4 w-4" />
              Suggestions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analysis" className="mt-4 space-y-4">
             {analysisItems.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                     <item.icon className="h-6 w-6 text-primary" />
                     <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-foreground/80 leading-relaxed">{item.text}</p>
                  </CardContent>
                </Card>
             ))}
          </TabsContent>
          <TabsContent value="suggestions" className="mt-4">
            <Card className="bg-card/50">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-base text-foreground/80">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}


function LoadingSkeleton() {
  return (
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <Card className="bg-card/50">
                <CardHeader>
                    <Skeleton className="h-8 w-3/4 mx-auto bg-muted/50" />
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                    <Skeleton className="h-40 w-40 rounded-full bg-muted/50" />
                    <Skeleton className="h-4 w-full mt-4 bg-muted/50" />
                    <Skeleton className="h-4 w-5/6 mt-2 bg-muted/50" />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-10 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-24 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-24 w-full rounded-lg bg-muted/50" />
            <Skeleton className="h-24 w-full rounded-lg bg-muted/50" />
        </div>
    </div>
  );
}
