import { motion } from "framer-motion";
import { FileText, Cpu, Rocket, DollarSign } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Describe Your App",
    description: "Use our guided PRD template or upload your own document. Voice input supported.",
    time: "2-5 min",
  },
  {
    icon: Cpu,
    title: "AI Generation",
    description: "Our multi-AI system analyzes, architects, and builds your complete application.",
    time: "5-15 min",
  },
  {
    icon: Rocket,
    title: "Deploy & Launch",
    description: "One-click deployment with custom domain, SSL, and global CDN included.",
    time: "< 5 min",
  },
  {
    icon: DollarSign,
    title: "Monetize",
    description: "Integrate ads, set up subscriptions, or connect to app stores with guided setup.",
    time: "10-20 min",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            From Idea to <span className="text-gradient-forge">Launch</span> in 4 Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The fastest path from concept to production-ready application.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-forge-amber to-forge-yellow hidden md:block" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative flex items-center gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Step Number */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-forge items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow z-10">
                {index + 1}
              </div>
              
              {/* Content Card */}
              <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16"}`}>
                <div className={`glass p-6 rounded-xl inline-block ${index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"}`}>
                  <div className={`flex items-center gap-4 mb-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className="w-12 h-12 rounded-lg bg-gradient-forge flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <span className="text-sm text-primary">{step.time}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
              
              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
