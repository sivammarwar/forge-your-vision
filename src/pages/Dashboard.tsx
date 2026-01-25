import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Zap, 
  FolderOpen, 
  Settings, 
  CreditCard,
  BarChart3,
  LogOut,
  ChevronRight,
  Globe,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  name: string;
  status: "deployed" | "building" | "draft" | "error";
  lastUpdated: string;
  domain?: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-Commerce Platform",
    status: "deployed",
    lastUpdated: "2 hours ago",
    domain: "mystore.appforge.dev",
  },
  {
    id: "2",
    name: "Task Management App",
    status: "building",
    lastUpdated: "Just now",
  },
  {
    id: "3",
    name: "Portfolio Website",
    status: "draft",
    lastUpdated: "1 day ago",
  },
];

const statusConfig = {
  deployed: { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" },
  building: { icon: Clock, color: "text-forge-amber", bg: "bg-forge-amber/10" },
  draft: { icon: AlertCircle, color: "text-muted-foreground", bg: "bg-muted" },
  error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
};

const Dashboard = () => {
  const [projects] = useState<Project[]>(mockProjects);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-border bg-card/50 backdrop-blur-xl">
        <div className="p-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-lg bg-gradient-forge flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-forge">AppForge</span>
          </Link>

          {/* Navigation */}
          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-secondary text-foreground"
            >
              <FolderOpen className="w-5 h-5" />
              Projects
            </Link>
            <Link
              to="/monetization"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <CreditCard className="w-5 h-5" />
              Monetization
            </Link>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <BarChart3 className="w-5 h-5" />
              Analytics
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Settings className="w-5 h-5" />
              Settings
            </a>
          </nav>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-forge flex items-center justify-center text-primary-foreground font-semibold">
              J
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-muted-foreground" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Your Projects</h1>
            <p className="text-muted-foreground">Manage and deploy your applications</p>
          </div>
          <Link to="/create">
            <Button variant="forge" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Projects", value: "3" },
            { label: "Deployed", value: "1" },
            { label: "AI Credits", value: "850" },
            { label: "This Month", value: "12 builds" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-4 rounded-xl"
            >
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gradient-forge">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const StatusIcon = statusConfig[project.status].icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:shadow-glow hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-forge-subtle flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${statusConfig[project.status].bg}`}>
                    <StatusIcon className={`w-3 h-3 ${statusConfig[project.status].color}`} />
                    <span className={`text-xs capitalize ${statusConfig[project.status].color}`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-1">{project.name}</h3>
                
                {project.domain && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <Globe className="w-3 h-3" />
                    {project.domain}
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mb-4">
                  Updated {project.lastUpdated}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">View Details</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            );
          })}

          {/* Create New Project Card */}
          <Link to="/create">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projects.length * 0.1 }}
              className="glass rounded-xl p-6 border-dashed hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer h-full flex flex-col items-center justify-center min-h-[200px]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-forge-subtle flex items-center justify-center mb-4">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <p className="font-semibold">Create New Project</p>
              <p className="text-sm text-muted-foreground">Start from a PRD</p>
            </motion.div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
