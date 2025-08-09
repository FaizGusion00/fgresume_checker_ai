"use server";

import { analyzeResume, type AnalyzeResumeOutput } from "@/ai/flows/analyze-resume";

export async function getAnalysis(
  resumeText: string
): Promise<{ data: AnalyzeResumeOutput | null; error: string | null }> {
  if (!resumeText.trim()) {
    return { data: null, error: "Resume text cannot be empty." };
  }
  
  try {
    const result = await analyzeResume({ resumeText });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    // Provide a user-friendly error message
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `Failed to analyze resume: ${errorMessage}` };
  }
}
