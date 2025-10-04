import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Atom,
  Beaker,
  Binary,
  BookOpen,
  Calculator,
  Home,
  Leaf,
  Sparkles,
  Target,
  TrendingUp,
  User,
  BookMarked,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LevelProgress from "./LevelProgress";
import { useAuth } from "@/hooks/use-auth";

const subjects = [
  { title: "Physics", icon: Atom, url: "/physics", color: "hsl(220, 90%, 60%)" },
  { title: "Chemistry", icon: Beaker, url: "/chemistry", color: "hsl(165, 75%, 50%)" },
  { title: "Mathematics", icon: Calculator, url: "/math", color: "hsl(265, 85%, 65%)" },
  { title: "Biology", icon: Leaf, url: "/biology", color: "hsl(145, 70%, 55%)" },
  { title: "Computer Science", icon: Binary, url: "/cs", color: "hsl(195, 100%, 50%)" },
  { title: "Agriculture", icon: Leaf, url: "/agriculture", color: "hsl(90, 60%, 50%)" },
];

const mainNav = [
  { title: "Home", icon: Home, url: "/" },
  { title: "Story Mode", icon: BookOpen, url: "/story" },
  { title: "Syllabus", icon: BookMarked, url: "/syllabus" },
  { title: "Character", icon: User, url: "/character" },
  { title: "Quests", icon: Target, url: "/quests" },
  { title: "Progress", icon: TrendingUp, url: "/progress" },
  { title: "Achievements", icon: Sparkles, url: "/achievements" },
];

export default function AppSidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const userInitials = user.username.substring(0, 2).toUpperCase();
  const maxXpForLevel = (user.level + 1) * 1000;

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-chart-2">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">AI Tutor</h2>
            <p className="text-xs text-muted-foreground">Class {user.selectedClass}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} data-testid={`link-${item.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Subjects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {subjects.map((subject) => (
                <SidebarMenuItem key={subject.title}>
                  <SidebarMenuButton asChild>
                    <a href={subject.url} data-testid={`link-subject-${subject.title.toLowerCase().replace(/\s/g, "-")}`}>
                      <subject.icon style={{ color: subject.color }} />
                      <span>{subject.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 space-y-4">
        <div>
          <LevelProgress level={user.level} xp={user.xp} maxXp={maxXpForLevel} streak={0} />
        </div>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 font-semibold text-white">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{user.username}</p>
            <p className="text-xs text-muted-foreground">
              Level {user.level} • {user.subscriptionTier}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => logout()}
            data-testid="button-logout"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
