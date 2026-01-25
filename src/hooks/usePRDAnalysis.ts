import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface PRDInput {
  name: string;
  category: string;
  description: string;
  features: string;
  platform: string;
  hasAuth: boolean;
  hasDatabase: boolean;
  colorScheme: string;
}

export interface Feature {
  name: string;
  description: string;
  priority: string;
  complexity: string;
}

export interface Page {
  name: string;
  route: string;
  description: string;
  components: string[];
}

export interface DataModel {
  name: string;
  fields: string[];
  relationships: string[];
}

export interface Architecture {
  appName: string;
  summary: string;
  architecture: {
    frontend: string[];
    backend: string[];
    database: string[];
    authentication: string[];
  };
  features: Feature[];
  pages: Page[];
  dataModels: DataModel[];
  estimatedBuildTime: string;
  aiModelsUsed: string[];
}

export function usePRDAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [architecture, setArchitecture] = useState<Architecture | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzePRD = async (prdData: PRDInput): Promise<Architecture | null> => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-prd", {
        body: {
          name: prdData.name,
          category: prdData.category,
          description: prdData.description,
          features: prdData.features,
          platform: prdData.platform,
          hasAuth: prdData.hasAuth,
          hasDatabase: prdData.hasDatabase,
        },
      });

      if (fnError) {
        throw fnError;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setArchitecture(data);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to analyze PRD";
      setError(message);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: message,
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyzePRD,
    isAnalyzing,
    architecture,
    error,
  };
}
