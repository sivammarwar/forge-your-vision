import { motion } from "framer-motion";
import { 
  Brain, 
  Rocket, 
  DollarSign, 
  Shield, 
  Zap, 
  Globe,
  Database,
  Users,
  Layers
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Multi-AI Orchestration",
    description: "Leverage GPT-4, Claude 3, Gemini Pro, and specialized models for optimal results.",
  },
  {
    icon: Rocket,
    title: "One-Click Deployment",
    description: "Deploy to production instantly with automatic SSL, scaling, and CDN integration.",
  },
  {
    icon: DollarSign,
    title: "Monetization Hub",
    description: "Integrated advertising platforms, app store listings, and affiliate network setup.",
  },
  {
    icon: Database,
    title: "Built-in Backend",
    description: "Supabase, Firebase, and AWS integrations with automatic credential management.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "End-to-end encryption, 2FA, GDPR compliance, and regular security audits.",
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Lightning-fast performance worldwide with edge caching and optimization.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Role-based access, real-time editing, and change approval workflows.",
  },
  {
    icon: Zap,
    title: "Smart Credit System",
    description: "Intelligent AI usage management with automatic model switching.",
  },
  {
    icon: Layers,
    title: "No Git Required",
    description: "Internal version control with one-click rollback and change history.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="text-gradient-forge">Build & Launch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From idea to production in minutes. No technical expertise required.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group h-full p-6 glass rounded-xl hover:bg-card/80 transition-all duration-300 hover:shadow-glow hover:border-primary/30">
                <div className="w-12 h-12 rounded-lg bg-gradient-forge-subtle flex items-center justify-center mb-4 group-hover:bg-gradient-forge transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
