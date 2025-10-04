import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ThemeToggle from "@/components/ThemeToggle";
import Home from "@/pages/Home";
import Progress from "@/pages/Progress";
import Quests from "@/pages/Quests";
import Achievements from "@/pages/Achievements";
import StoryModePage from "@/pages/StoryMode";
import SubjectSyllabus from "@/pages/SubjectSyllabus";
import Character from "@/pages/Character";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story" component={StoryModePage} />
      <Route path="/syllabus" component={SubjectSyllabus} />
      <Route path="/character" component={Character} />
      <Route path="/progress" component={Progress} />
      <Route path="/quests" component={Quests} />
      <Route path="/achievements" component={Achievements} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
              <header className="flex items-center justify-between border-b p-4">
                <SidebarTrigger data-testid="button-sidebar-toggle" />
                <ThemeToggle />
              </header>
              <main className="flex-1 overflow-auto">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
