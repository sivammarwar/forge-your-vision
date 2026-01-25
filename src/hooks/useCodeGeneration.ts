import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Architecture } from "./usePRDAnalysis";

export interface GeneratedFile {
  path: string;
  content: string;
  description: string;
}

export interface GenerationStep {
  id: string;
  name: string;
  status: "pending" | "running" | "complete" | "error";
  progress: number;
  files: GeneratedFile[];
  error?: string;
}

export function useCodeGeneration() {
  const [steps, setSteps] = useState<GenerationStep[]>([
    { id: "analyzing", name: "Analyzing PRD", status: "pending", progress: 0, files: [] },
    { id: "backend", name: "Generating Backend", status: "pending", progress: 0, files: [] },
    { id: "frontend", name: "Building Frontend", status: "pending", progress: 0, files: [] },
    { id: "integration", name: "Integration & Testing", status: "pending", progress: 0, files: [] },
    { id: "deployment", name: "Deploying", status: "pending", progress: 0, files: [] },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [allFiles, setAllFiles] = useState<GeneratedFile[]>([]);
  const { toast } = useToast();

  const updateStep = useCallback((stepId: string, updates: Partial<GenerationStep>) => {
    setSteps(prev => prev.map(s => s.id === stepId ? { ...s, ...updates } : s));
  }, []);

  const generateStep = async (stepId: string, architecture: Architecture): Promise<boolean> => {
    updateStep(stepId, { status: "running" });

    try {
      const { data, error } = await supabase.functions.invoke("generate-code", {
        body: {
          step: stepId,
          architecture,
        },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      const files = data.generatedFiles || [];
      setAllFiles(prev => [...prev, ...files]);
      
      updateStep(stepId, { 
        status: "complete", 
        progress: 100,
        files,
      });

      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Generation failed";
      updateStep(stepId, { status: "error", error: message });
      toast({
        variant: "destructive",
        title: "Generation Error",
        description: message,
      });
      return false;
    }
  };

  const startGeneration = async (architecture: Architecture) => {
    setIsGenerating(true);
    setAllFiles([]);
    setCurrentStep(0);

    const stepIds = ["analyzing", "backend", "frontend", "integration", "deployment"];

    for (let i = 0; i < stepIds.length; i++) {
      setCurrentStep(i);
      const success = await generateStep(stepIds[i], architecture);
      
      if (!success) {
        setIsGenerating(false);
        return false;
      }

      // Add a small delay between steps for UX
      if (i < stepIds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    setIsGenerating(false);
    toast({
      title: "Generation Complete!",
      description: "Your application has been generated successfully.",
    });
    return true;
  };

  const totalProgress = steps.reduce((acc, step) => acc + step.progress, 0) / steps.length;

  return {
    steps,
    currentStep,
    isGenerating,
    allFiles,
    totalProgress,
    startGeneration,
  };
}
