import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateCodeInput {
  step: string;
  architecture: Record<string, unknown>;
  context?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { step, architecture, context }: GenerateCodeInput = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Generating code for step:", step);

    const systemPrompt = `You are an expert React/TypeScript developer. Generate production-ready code based on the provided architecture. 
Your code should:
- Use TypeScript with proper types
- Follow React best practices with hooks
- Use Tailwind CSS for styling
- Be clean, well-commented, and production-ready
- Include proper error handling

Respond with a JSON object containing:
{
  "stepComplete": true,
  "generatedFiles": [
    {
      "path": "src/components/Example.tsx",
      "content": "// Full file content here",
      "description": "What this file does"
    }
  ],
  "nextStep": "Description of what to do next",
  "progress": 0-100
}`;

    const stepPrompts: Record<string, string> = {
      "analyzing": "Analyze the architecture and identify all required components, pages, and utilities. List what needs to be created.",
      "backend": "Generate the backend API structure, database schemas, and edge function stubs based on the architecture.",
      "frontend": "Generate the main React components, pages, and layout based on the architecture.",
      "integration": "Generate the integration layer - API calls, state management, and data flow.",
      "deployment": "Generate configuration files for deployment and final optimizations.",
    };

    const userPrompt = `
Architecture: ${JSON.stringify(architecture, null, 2)}

Current Step: ${step}
Task: ${stepPrompts[step] || "Generate the next part of the application."}
${context ? `Additional Context: ${context}` : ""}

Generate the code for this step.`;

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
        temperature: 0.5,
        max_tokens: 8000,
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

    // Extract JSON from the response
    let jsonContent = content;
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonContent = jsonMatch[1];
    }

    const result = JSON.parse(jsonContent);

    console.log("Code generation complete for step:", step);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating code:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
