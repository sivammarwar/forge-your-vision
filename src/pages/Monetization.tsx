import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Zap, 
  ArrowLeft,
  ExternalLink,
  DollarSign,
  TrendingUp,
  BarChart3,
  CreditCard,
  Store,
  Share2,
  ChevronRight,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";

const adNetworks = [
  {
    name: "Google AdSense",
    description: "Display ads from Google's network on your app",
    category: "Ad Network",
    difficulty: "Easy",
    earning: "$$",
    icon: "🎯",
  },
  {
    name: "PropellerAds",
    description: "Push notifications, popunders, and native ads",
    category: "Ad Network",
    difficulty: "Easy",
    earning: "$$$",
    icon: "🚀",
  },
  {
    name: "Media.net",
    description: "Contextual ad network by Yahoo & Bing",
    category: "Ad Network",
    difficulty: "Medium",
    earning: "$$",
    icon: "📰",
  },
];

const socialAds = [
  {
    name: "Meta Ads",
    description: "Advertise on Facebook and Instagram",
    category: "Social Media",
    difficulty: "Medium",
    earning: "$$$",
    icon: "📱",
  },
  {
    name: "Twitter Ads",
    description: "Promoted tweets and campaigns",
    category: "Social Media",
    difficulty: "Medium",
    earning: "$$",
    icon: "🐦",
  },
  {
    name: "LinkedIn Ads",
    description: "B2B advertising platform",
    category: "Social Media",
    difficulty: "Hard",
    earning: "$$$",
    icon: "💼",
  },
];

const appStores = [
  {
    name: "Google Play Store",
    description: "Publish and monetize on Android",
    category: "App Store",
    difficulty: "Medium",
    earning: "$$$$",
    icon: "🤖",
  },
  {
    name: "Apple App Store",
    description: "Publish and monetize on iOS",
    category: "App Store",
    difficulty: "Hard",
    earning: "$$$$",
    icon: "🍎",
  },
];

const affiliates = [
  {
    name: "Amazon Associates",
    description: "Earn from Amazon product referrals",
    category: "Affiliate",
    difficulty: "Easy",
    earning: "$$",
    icon: "📦",
  },
  {
    name: "ShareASale",
    description: "Connect with thousands of merchants",
    category: "Affiliate",
    difficulty: "Medium",
    earning: "$$$",
    icon: "🔗",
  },
];

const Monetization = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-forge flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Monetization Hub</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-forge flex items-center justify-center mx-auto mb-6 shadow-glow">
            <DollarSign className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Start <span className="text-gradient-forge">Earning</span> From Your App
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our curated list of monetization platforms. We provide step-by-step 
            integration guides and direct API connections where available.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {[
            { icon: TrendingUp, label: "Revenue Potential", value: "High" },
            { icon: BarChart3, label: "Platforms", value: "10+" },
            { icon: CreditCard, label: "Payout Methods", value: "Multiple" },
            { icon: Share2, label: "Integration Time", value: "< 1 hour" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-4 rounded-xl text-center"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-lg font-bold text-gradient-forge">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Ad Networks */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Ad Networks
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {adNetworks.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* Social Media Ads */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">📱</span> Social Media Advertising
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {socialAds.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* App Stores */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Store className="w-6 h-6" /> App Stores
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {appStores.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} delay={i * 0.1} />
            ))}
          </div>
        </section>

        {/* Affiliate Networks */}
        <section>
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="text-2xl">🔗</span> Affiliate Networks
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {affiliates.map((platform, i) => (
              <PlatformCard key={platform.name} platform={platform} delay={i * 0.1} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

interface Platform {
  name: string;
  description: string;
  category: string;
  difficulty: string;
  earning: string;
  icon: string;
}

const PlatformCard = ({ platform, delay }: { platform: Platform; delay: number }) => {
  const difficultyColors = {
    Easy: "text-green-500 bg-green-500/10",
    Medium: "text-forge-amber bg-forge-amber/10",
    Hard: "text-destructive bg-destructive/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass rounded-xl p-6 hover:shadow-glow hover:border-primary/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl">{platform.icon}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[platform.difficulty as keyof typeof difficultyColors]}`}>
          {platform.difficulty}
        </span>
      </div>
      
      <h3 className="font-semibold text-lg mb-1">{platform.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{platform.description}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">Earning:</span>
          <span className="text-sm text-primary font-medium">{platform.earning}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-primary transition-colors">
          Setup Guide
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default Monetization;
