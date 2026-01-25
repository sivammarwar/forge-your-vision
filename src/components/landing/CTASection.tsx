import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-forge flex items-center justify-center mx-auto mb-8 shadow-glow">
            <Zap className="w-10 h-10 text-primary-foreground" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-forge">Build Your App</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Join thousands of entrepreneurs who've already launched their applications 
            with AppForge. No credit card required to start.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/create">
              <Button variant="forge" size="xl" className="group">
                Start Building Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="forgeOutline" size="xl">
                Create Free Account
              </Button>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            Free forever for basic features • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
