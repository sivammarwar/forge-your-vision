import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PRDInput {
  name: string;
  category: string;
  description: string;
  features: string;
  platform: string;
  hasAuth: boolean;
  hasDatabase: boolean;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const prdData: PRDInput = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Analyzing PRD:", prdData.name);

    const systemPrompt = `You are an expert software architect and application designer. Analyze the given Product Requirements Document (PRD) and provide a comprehensive application architecture plan.

Your response MUST be valid JSON with this exact structure:
{
  "appName": "string",
  "summary": "Brief 1-2 sentence summary of what the app does",
  "architecture": {
    "frontend": ["list of frontend technologies and frameworks"],
    "backend": ["list of backend technologies"],
    "database": ["database schema suggestions"],
    "authentication": ["auth method suggestions"]
  },
  "features": [
    {
      "name": "Feature name",
      "description": "Brief description",
      "priority": "P0/P1/P2",
      "complexity": "low/medium/high"
    }
  ],
  "pages": [
    {
      "name": "Page name",
      "route": "/route",
      "description": "What this page does",
      "components": ["List of main components needed"]
    }
  ],
  "dataModels": [
    {
      "name": "Model name",
      "fields": ["field1: type", "field2: type"],
      "relationships": ["relationships to other models"]
    }
  ],
  "estimatedBuildTime": "Estimated time in minutes",
  "aiModelsUsed": ["List of AI models that would be used for generation"]
}`;

    const userPrompt = `Analyze this PRD and create an application architecture:

App Name: ${prdData.name}
Category: ${prdData.category}
Description: ${prdData.description}
Features Requested: ${prdData.features}
Platform: ${prdData.platform}
Needs Authentication: ${prdData.hasAuth}
Needs Database: ${prdData.hasDatabase}

Provide a detailed, production-ready architecture plan as JSON.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No response from AI");
    }

    // Extract JSON from the response (handle potential markdown code blocks)
    let jsonContent = content;
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    const architecture = JSON.parse(jsonContent);

    console.log("PRD analysis complete for:", prdData.name);

    return new Response(JSON.stringify(architecture), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error analyzing PRD:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
