import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  Brain, 
  Code, 
  Database, 
  Palette, 
  Globe,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  { id: 1, title: "Analyzing PRD", description: "Understanding your requirements", icon: Brain, duration: 3000 },
  { id: 2, title: "Architecture Planning", description: "Designing system structure", icon: Database, duration: 4000 },
  { id: 3, title: "Generating Backend", description: "Creating APIs and database", icon: Code, duration: 5000 },
  { id: 4, title: "Building Frontend", description: "Crafting UI components", icon: Palette, duration: 5000 },
  { id: 5, title: "Deploying", description: "Going live worldwide", icon: Globe, duration: 3000 },
];

const Generating = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCompletedSteps([...completedSteps, currentStep]);
        setCurrentStep(currentStep + 1);
      }, steps[currentStep]?.duration || 3000);

      return () => clearTimeout(timer);
    } else {
      // All steps complete, redirect to dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  }, [currentStep, completedSteps, navigate]);

  const progress = (completedSteps.length / steps.length) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-forge-amber/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-forge flex items-center justify-center mx-auto shadow-glow animate-pulse">
            <Zap className="w-12 h-12 text-primary-foreground" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          {currentStep < steps.length ? (
            <>Building Your <span className="text-gradient-forge">App</span></>
          ) : (
            <span className="text-gradient-forge">App Ready!</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-12"
        >
          {currentStep < steps.length
            ? "Our AI is working its magic..."
            : "Redirecting to your dashboard..."}
        </motion.p>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <motion.div
              className="h-full bg-gradient-forge"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {Math.round(progress)}% complete
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                  isCompleted
                    ? "glass"
                    : isCurrent
                    ? "glass border-primary/50"
                    : "opacity-40"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500/20"
                      : isCurrent
                      ? "bg-gradient-forge"
                      : "bg-muted"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : isCurrent ? (
                    <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
                  ) : (
                    <step.icon className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="text-left">
                  <p className={`font-medium ${isCompleted ? "text-green-500" : ""}`}>
                    {step.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Models in use */}
        {currentStep < steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-4 flex-wrap"
          >
            {["GPT-4", "Claude 3", "DALL-E 3", "Gemini Pro"].map((model, i) => (
              <span
                key={model}
                className="px-3 py-1 rounded-full bg-muted text-xs text-muted-foreground"
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                {model}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generating;
