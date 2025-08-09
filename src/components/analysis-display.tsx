"use client";

import type { AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScoreCircle } from "./score-circle";
import { BarChart, Lightbulb, FileText } from "lucide-react";

interface AnalysisDisplayProps {
  result: AnalyzeResumeOutput | null;
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

  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-primary">
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <ScoreCircle score={result.score} />
          <p className="mt-4 text-center text-muted-foreground max-w-sm">
            This score reflects your resume's effectiveness based on content, structure, and clarity.
          </p>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg bg-card/50">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline px-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5" />
              Detailed Analysis
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-base text-foreground/80 leading-relaxed p-4 pt-0">
            {result.analysis}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border rounded-lg bg-card/50">
          <AccordionTrigger className="text-lg font-semibold text-primary hover:no-underline px-4">
            <div className="flex items-center gap-3">
             <Lightbulb className="h-5 w-5" />
              Actionable Suggestions
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-base text-foreground/80 leading-relaxed p-4 pt-0">
            {result.suggestions}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="bg-card/50">
        <CardHeader>
           <Skeleton className="h-8 w-1/2 mx-auto bg-muted/50" />
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center">
          <Skeleton className="h-40 w-40 rounded-full bg-muted/50" />
          <Skeleton className="h-4 w-3/4 mt-4 bg-muted/50" />
        </CardContent>
      </Card>
      <div className="space-y-4">
        <Skeleton className="h-16 w-full rounded-lg bg-muted/50" />
        <Skeleton className="h-16 w-full rounded-lg bg-muted/50" />
      </div>
    </div>
  );
}
