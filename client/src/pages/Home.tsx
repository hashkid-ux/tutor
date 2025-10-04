import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { AlertCircle, BookOpen, Award, Target, TrendingUp, Sparkles, Crown, User } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  if (!user) return null;

  const features = [
    {
      title: "Doubts & Derivations",
      description: "Ask questions and get step-by-step derivations - completely free!",
      icon: AlertCircle,
      link: "/doubts",
      badge: "Free",
      color: "hsl(220, 90%, 60%)",
    },
    {
      title: "Story Mode",
      description: "Learn through immersive story-based lessons with scenes and challenges",
      icon: BookOpen,
      link: "/story",
      badge: "Premium",
      color: "hsl(165, 75%, 50%)",
    },
    {
      title: "Syllabus Explorer",
      description: "Comprehensive Class 11 & 12 syllabus for Physics, Chemistry, and Math",
      icon: BookOpen,
      link: "/syllabus",
      badge: "Premium",
      color: "hsl(265, 85%, 65%)",
    },
    {
      title: "Quests & Achievements",
      description: "Complete quests, earn XP, unlock achievements, and level up!",
      icon: Target,
      link: "/quests",
      badge: "Gamified",
      color: "hsl(145, 70%, 55%)",
    },
    {
      title: "Progress Tracking",
      description: "Track your learning journey with detailed analytics",
      icon: TrendingUp,
      link: "/progress",
      badge: "Analytics",
      color: "hsl(195, 100%, 50%)",
    },
    {
      title: "Character Customization",
      description: "Customize your avatar and showcase your achievements",
      icon: User,
      link: "/character",
      badge: "Personalize",
      color: "hsl(280, 85%, 65%)",
    },
  ];

  const subscriptionTiers = [
    {
      name: "Free",
      price: "₹0",
      features: ["Unlimited Doubts", "Unlimited Derivations", "Basic Progress Tracking"],
    },
    {
      name: "Basic",
      price: "₹199/month",
      features: ["GPT-4 mini", "10,000 tokens/day", "All Free features", "Story Mode access"],
    },
    {
      name: "Pro",
      price: "₹899/month",
      features: ["GPT-4o", "50,000 tokens/day", "All Basic features", "3D Visualizations"],
    },
    {
      name: "Unlimited",
      price: "₹2999/month",
      features: ["GPT-4o", "Unlimited tokens", "All Pro features", "Priority Support"],
    },
  ];

  return (
    <div className="space-y-8 p-6">
      <div className="text-center space-y-2">
        <h1 className="font-display text-5xl font-bold bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Welcome back, {user.username}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Class {user.selectedClass} • Level {user.level} • {user.xp} XP
        </p>
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-primary" />
            Your Subscription: {user.subscriptionTier}
          </CardTitle>
          <CardDescription>
            {user.subscriptionTier === "free"
              ? "Upgrade to unlock Story Mode, 3D visualizations, and more!"
              : "You have access to premium features!"}
          </CardDescription>
        </CardHeader>
      </Card>

      <section>
        <h2 className="mb-6 font-display text-3xl font-semibold">Explore Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.link}>
              <Card className="h-full cursor-pointer transition-all hover:shadow-lg hover:scale-105" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s/g, "-")}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg" style={{ backgroundColor: feature.color }}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {feature.badge}
                    </span>
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {user.subscriptionTier === "free" && (
        <section>
          <h2 className="mb-6 font-display text-3xl font-semibold">Upgrade Your Learning</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {subscriptionTiers.map((tier) => (
              <Card key={tier.name} className={tier.name === "Pro" ? "border-primary" : ""}>
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground">{tier.price}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Sparkles className="h-4 w-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-4 w-full" variant={tier.name === "Pro" ? "default" : "outline"} data-testid={`button-upgrade-${tier.name.toLowerCase()}`}>
                    {tier.name === "Free" ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-6 font-display text-3xl font-semibold flex items-center gap-2">
          <Award className="h-8 w-8 text-primary" />
          Your Achievements
        </h2>
        <Link href="/achievements">
          <Button variant="outline" data-testid="button-view-achievements">
            View All Achievements <Sparkles className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
