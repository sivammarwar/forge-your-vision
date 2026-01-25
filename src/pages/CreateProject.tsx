import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Mic,
  Sparkles,
  Code,
  Palette,
  Database,
  Users,
  Globe,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";

const platforms = [
  { id: "web", label: "Web App", icon: Globe },
  { id: "mobile", label: "Mobile App", icon: Code },
  { id: "both", label: "Both", icon: Layers },
];

const categories = [
  "E-Commerce", "SaaS", "Social Media", "Productivity", 
  "Education", "Healthcare", "Finance", "Entertainment"
];

import { Layers } from "lucide-react";

const CreateProject = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    features: "",
    platform: "web",
    colorScheme: "orange",
    hasAuth: true,
    hasDatabase: true,
  });

  const steps = [
    { number: 1, title: "Basic Info" },
    { number: 2, title: "Features" },
    { number: 3, title: "Design" },
    { number: 4, title: "Review" },
  ];

  const colorSchemes = [
    { id: "orange", colors: ["#f97316", "#fbbf24"] },
    { id: "blue", colors: ["#3b82f6", "#06b6d4"] },
    { id: "purple", colors: ["#8b5cf6", "#ec4899"] },
    { id: "green", colors: ["#22c55e", "#84cc16"] },
    { id: "red", colors: ["#ef4444", "#f97316"] },
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-forge flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Create New Project</span>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= s.number
                      ? "bg-gradient-forge text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > s.number ? <Check className="w-4 h-4" /> : s.number}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-8 h-px ${step > s.number ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Let's Build Your App</h1>
                <p className="text-muted-foreground">Start by telling us about your project</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">App Name</Label>
                  <Input
                    id="name"
                    placeholder="My Awesome App"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-secondary border-border h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Category</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setFormData({ ...formData, category: cat })}
                        className={`px-4 py-2 rounded-lg text-sm transition-all ${
                          formData.category === cat
                            ? "bg-gradient-forge text-primary-foreground"
                            : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Platform</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {platforms.map((platform) => (
                      <button
                        key={platform.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, platform: platform.id })}
                        className={`p-4 rounded-xl border transition-all ${
                          formData.platform === platform.id
                            ? "border-primary bg-gradient-forge-subtle"
                            : "border-border bg-secondary hover:border-primary/50"
                        }`}
                      >
                        <platform.icon className={`w-8 h-8 mx-auto mb-2 ${
                          formData.platform === platform.id ? "text-primary" : "text-muted-foreground"
                        }`} />
                        <p className="text-sm font-medium">{platform.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Describe Your Features</h1>
                <p className="text-muted-foreground">Tell us what your app should do</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="description">App Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your app in a few sentences..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-secondary border-border min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Core Features</Label>
                  <Textarea
                    id="features"
                    placeholder="List the main features you want...&#10;• User authentication&#10;• Dashboard with analytics&#10;• Payment integration"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="bg-secondary border-border min-h-[150px]"
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1" size="lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload PRD
                  </Button>
                  <Button variant="outline" className="flex-1" size="lg">
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Input
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hasAuth: !formData.hasAuth })}
                    className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      formData.hasAuth
                        ? "border-primary bg-gradient-forge-subtle"
                        : "border-border bg-secondary"
                    }`}
                  >
                    <Users className={`w-6 h-6 ${formData.hasAuth ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="font-medium">User Authentication</p>
                      <p className="text-xs text-muted-foreground">Login, signup, profiles</p>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, hasDatabase: !formData.hasDatabase })}
                    className={`p-4 rounded-xl border transition-all flex items-center gap-3 ${
                      formData.hasDatabase
                        ? "border-primary bg-gradient-forge-subtle"
                        : "border-border bg-secondary"
                    }`}
                  >
                    <Database className={`w-6 h-6 ${formData.hasDatabase ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-left">
                      <p className="font-medium">Database</p>
                      <p className="text-xs text-muted-foreground">Store and manage data</p>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Design Preferences</h1>
                <p className="text-muted-foreground">Choose how your app should look</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Color Scheme</Label>
                  <div className="flex gap-4">
                    {colorSchemes.map((scheme) => (
                      <button
                        key={scheme.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, colorScheme: scheme.id })}
                        className={`w-16 h-16 rounded-xl overflow-hidden transition-all ${
                          formData.colorScheme === scheme.id
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : ""
                        }`}
                        style={{
                          background: `linear-gradient(135deg, ${scheme.colors[0]}, ${scheme.colors[1]})`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="glass p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Palette className="w-5 h-5 text-primary" />
                    <span className="font-medium">AI Design Suggestions</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Based on your {formData.category || "app"} category, we recommend a modern, clean design 
                    with emphasis on usability and clear call-to-actions.
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Minimal", "Modern", "Bold"].map((style) => (
                      <button
                        key={style}
                        type="button"
                        className="px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 text-sm transition-colors"
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Ready to Build!</h1>
                <p className="text-muted-foreground">Review your project configuration</p>
              </div>

              <div className="glass p-6 rounded-xl space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">App Name</span>
                  <span className="font-medium">{formData.name || "Untitled"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{formData.category || "Not selected"}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Platform</span>
                  <span className="font-medium capitalize">{formData.platform}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-border">
                  <span className="text-muted-foreground">Authentication</span>
                  <span className="font-medium">{formData.hasAuth ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Database</span>
                  <span className="font-medium">{formData.hasDatabase ? "Enabled" : "Disabled"}</span>
                </div>
              </div>

              <div className="glass p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="font-medium">AI Models Selected</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["GPT-4 (Logic)", "Claude 3 (Docs)", "DALL-E 3 (Assets)", "Gemini (Code)"].map((model) => (
                    <div key={model} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {model}
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>Estimated build time: <span className="text-primary font-medium">15-25 minutes</span></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-12">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button variant="forge" onClick={handleNext}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link to="/generating">
              <Button variant="forge" size="lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Generate App
              </Button>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
