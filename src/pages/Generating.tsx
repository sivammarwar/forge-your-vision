import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  Brain, 
  Code, 
  Database, 
  Palette, 
  Globe,
  CheckCircle2,
  Loader2,
  AlertCircle,
  FileCode,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCodeGeneration } from "@/hooks/useCodeGeneration";
import { Architecture } from "@/hooks/usePRDAnalysis";

const stepIcons = {
  analyzing: Brain,
  backend: Database,
  frontend: Palette,
  integration: Code,
  deployment: Globe,
};

const Generating = () => {
  const [architecture, setArchitecture] = useState<Architecture | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const navigate = useNavigate();
  const { steps, currentStep, isGenerating, allFiles, totalProgress, startGeneration } = useCodeGeneration();

  useEffect(() => {
    // Get the architecture from sessionStorage
    const storedArchitecture = sessionStorage.getItem("prdArchitecture");
    if (storedArchitecture) {
      const parsed = JSON.parse(storedArchitecture);
      setArchitecture(parsed);
    }
  }, []);

  useEffect(() => {
    // Auto-start generation when architecture is available
    if (architecture && !hasStarted && !isGenerating) {
      setHasStarted(true);
      startGeneration(architecture);
    }
  }, [architecture, hasStarted, isGenerating, startGeneration]);

  const isComplete = steps.every(s => s.status === "complete");
  const hasError = steps.some(s => s.status === "error");

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-forge-amber/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          <div className={`w-24 h-24 rounded-2xl bg-gradient-forge flex items-center justify-center mx-auto shadow-glow ${isGenerating ? "animate-pulse" : ""}`}>
            <Zap className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {isComplete ? (
            <span className="text-gradient-forge">App Generated!</span>
          ) : hasError ? (
            <span className="text-destructive">Generation Error</span>
          ) : (
            <>Building <span className="text-gradient-forge">{architecture?.appName || "Your App"}</span></>
          )}
        </motion.h1>

        {architecture && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-8"
          >
            {architecture.summary}
          </motion.p>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-muted rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-forge"
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(totalProgress)}% complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-8">
          {steps.map((step, index) => {
            const StepIcon = stepIcons[step.id as keyof typeof stepIcons] || Brain;
            const isActive = currentStep === index;
            
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  step.status === "complete"
                    ? "glass"
                    : step.status === "running"
                    ? "glass border-primary/50"
                    : step.status === "error"
                    ? "glass border-destructive/50"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    step.status === "complete"
                      ? "bg-green-500/20"
                      : step.status === "running"
                      ? "bg-gradient-forge"
                      : step.status === "error"
                      ? "bg-destructive/20"
                      : "bg-muted"
                  }`}
                >
                  {step.status === "complete" ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : step.status === "running" ? (
                    <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
                  ) : step.status === "error" ? (
                    <AlertCircle className="w-6 h-6 text-destructive" />
                  ) : (
                    <StepIcon className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="text-left flex-1">
                  <p className={`font-medium ${
                    step.status === "complete" ? "text-green-500" : 
                    step.status === "error" ? "text-destructive" : ""
                  }`}>
                    {step.name}
                  </p>
                  {step.error && (
                    <p className="text-sm text-destructive">{step.error}</p>
                  )}
                  {step.files.length > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {step.files.length} files generated
                    </p>
                  )}
                </div>
                {step.status === "complete" && step.files.length > 0 && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <FileCode className="w-4 h-4" />
                    {step.files.length}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Generated Files Preview */}
        {allFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-4 rounded-xl mb-8 text-left"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileCode className="w-5 h-5 text-primary" />
              <span className="font-medium">Generated Files ({allFiles.length})</span>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {allFiles.slice(0, 10).map((file, i) => (
                <div key={i} className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  {file.path}
                </div>
              ))}
              {allFiles.length > 10 && (
                <p className="text-xs text-muted-foreground">
                  ...and {allFiles.length - 10} more files
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* AI Models */}
        {architecture?.aiModelsUsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3 flex-wrap mb-8"
          >
            {architecture.aiModelsUsed.map((model, i) => (
              <span
                key={model}
                className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground"
              >
                {model}
              </span>
            ))}
          </motion.div>
        )}

        {/* Actions */}
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Button variant="forge" size="lg" onClick={() => navigate("/dashboard")}>
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {hasError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Button variant="outline" size="lg" onClick={() => {
              setHasStarted(false);
              if (architecture) {
                startGeneration(architecture);
              }
            }}>
              Retry Generation
            </Button>
            <Button variant="ghost" size="lg" onClick={() => navigate("/create")}>
              Edit PRD
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generating;
