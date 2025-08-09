"use server";

import { analyzeDocument, type AnalyzeDocumentOutput } from "@/ai/flows/analyze-document";

export async function getAnalysis(
  documentText: string
): Promise<{ data: AnalyzeDocumentOutput | null; error: string | null }> {
  if (!documentText.trim()) {
    return { data: null, error: "Document text cannot be empty." };
  }
  
  try {
    const result = await analyzeDocument({ documentText });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    // Provide a user-friendly error message
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `Failed to analyze document: ${errorMessage}` };
  }
}
