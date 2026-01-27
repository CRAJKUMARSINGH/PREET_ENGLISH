import { Link, useLocation } from "wouter";
import { BookOpen, Home, Trophy, User, Users, Video, Menu, X, Brain, Flame, TrendingUp, BookMarked, Gamepad2, Calendar, Library, MessageCircle, Bot, Search, Zap, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { SaraswatiLogo } from "./SaraswatiMascot";
import { GlobalSearch } from "./GlobalSearch";

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home, highlight: false },
  { href: "/chat", label: "Preet AI", icon: Bot, highlight: true },
  { href: "/lessons", label: "Lessons", icon: BookOpen, highlight: false },
  { href: "/hindi-stories", label: "Stories", icon: Library, highlight: false },
  { href: "/vocabulary", label: "Vocab", icon: BookMarked, highlight: false },
  { href: "/conversations", label: "Talk", icon: MicIcon, highlight: false },
  { href: "/hindi-games", label: "Games", icon: Gamepad2, highlight: false },
  { href: "/profile", label: "Profile", icon: User, highlight: false },
  { href: "/lite", label: "Lite Mode", icon: Zap, highlight: false },
  { href: "/labs", label: "Labs", icon: Brain, highlight: false },
  { href: "/admin/checker", label: "Checker", icon: Library, highlight: false },
];

const secondaryNavItems = [
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/hindi-daily", label: "Daily Goal", icon: Calendar },
  { href: "/hindi-mastery", label: "Mastery", icon: Star },
];

const labsNavItems = [
  { href: "/labs/voicerooms", label: "AI Voicerooms", icon: MessageCircle },
  { href: "/labs/reader", label: "Bilingual Reader", icon: BookOpen },
  { href: "/labs/stories", label: "Story Generator", icon: Star },
  { href: "/labs/srs", label: "SRS Review", icon: Brain },
  { href: "/labs/videos", label: "Native Videos", icon: Users },
  { href: "/labs/video-call", label: "AI Video Call", icon: Video },
];

function MicIcon(props: any) {
  return <MessageCircle {...props} />;
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex font-sans selection:bg-primary/30">

      {/* Mobile Header */}
      <div className={cn(
        "fixed top-0 left-0 right-0 z-50 md:hidden transition-all duration-300 border-b border-border/50",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 hover:bg-muted rounded-full transition-colors">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <SaraswatiLogo size="xs" />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Sidebar Navigation - Glassmorphism Premium */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-[280px] flex flex-col transition-transform duration-500 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen border-r border-border/50",
          "glass-panel md:bg-card/50",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 md:p-8 flex-shrink-0">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <SaraswatiLogo size="sm" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-display tracking-tight text-foreground group-hover:text-primary transition-colors">
                  Preet<span className="text-primary">.</span>
                </h1>
                <p className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground uppercase">English AI</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="px-4 mb-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full relative group flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50 hover:bg-secondary/80 border border-transparent hover:border-primary/20 transition-all duration-300 text-sm font-medium text-muted-foreground hover:text-foreground hover:shadow-lg hover:shadow-primary/5"
          >
            <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Search...</span>
            <kbd className="ml-auto px-2 py-0.5 text-[10px] font-mono bg-background/50 rounded border border-border/50 text-muted-foreground group-hover:text-foreground transition-colors">⌘K</kbd>
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto no-scrollbar py-2">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 cursor-pointer font-medium text-sm overflow-hidden group",
                    isActive
                      ? "bg-primary/10 text-primary font-bold shadow-none"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  )}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full shadow-[0_0_10px_2px_rgba(28,231,131,0.5)]" />
                  )}
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary drop-shadow-[0_0_5px_rgba(28,231,131,0.5)]" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span className="relative z-10">{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
                  )}
                </div>
              </Link>
            );
          })}

          <div className="pt-6 mt-6 border-t border-border/50">
            <h3 className="px-4 text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">My Progress</h3>
            {secondaryNavItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-sm font-medium",
                      isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Labs Section */}
          <div className="pt-4 mt-4 border-t border-border/50">
            <h3 className="px-4 text-xs font-bold text-purple-500 uppercase tracking-widest mb-2 flex items-center gap-2">🧪 Labs</h3>
            {labsNavItems.map((item) => {
              const isActive = location === item.href || location.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-colors cursor-pointer text-sm font-medium",
                      isActive ? "text-purple-500 bg-purple-500/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                    )}
                  >
                    <item.icon className={cn("h-4 w-4", isActive ? "text-purple-500" : "text-muted-foreground")} />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>


        <div className="p-4 mt-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-5 border border-white/10 shadow-2xl group cursor-pointer">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-primary/20 blur-2xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-primary font-bold text-xs mb-1 uppercase tracking-wider">
                <Zap className="h-3 w-3 fill-primary" />
                <span>Pro Member</span>
              </div>
              <p className="text-white text-xs opacity-70 mb-3 leading-relaxed">
                Unlock unlimited AI practice & advanced analytics.
              </p>
              <button className="w-full py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95">
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <button onClick={toggleLanguage} className="text-xs font-bold text-muted-foreground hover:text-foreground transition-colors">
                {i18n.language === "en" ? "🇮🇳 HI" : "🇺🇸 EN"}
              </button>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full min-w-0 pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>

      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </div>
  );
}
