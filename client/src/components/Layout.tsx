import { Link, useLocation } from "wouter";
import { BookOpen, Home, Award, User, Menu, X, Languages, Mic, BookText, MessagesSquare, Search, Brain, Flame, TrendingUp, BookMarked, Gamepad2, Calendar, Library, MessageCircle, MoreHorizontal, ChevronDown, HelpCircle, Crown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { SaraswatiLogo } from "./SaraswatiMascot";
import { GlobalSearch } from "./GlobalSearch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  // Simplified Navigation Groups - Focused on User Journey
  const navGroups = [
    {
      title: "Learn",
      items: [
        { href: "/", label: t("home"), icon: Home },
        { href: "/hindi-learning", label: "Learning Path", icon: BookOpen },
        { href: "/advanced-hindi", label: "AI Tutor", icon: Brain },
      ]
    },
    {
      title: "Practice",
      items: [
        { href: "/review", label: "Daily Review", icon: Brain },
        { href: "/speak", label: "Speaking", icon: Mic },
        { href: "/vocabulary", label: "Vocabulary", icon: Library },
        { href: "/conversations", label: "Conversations", icon: MessageCircle },
      ]
    },
    {
      title: "Progress",
      items: [
        { href: "/hindi-complete", label: "My Stats", icon: TrendingUp },
        { href: "/leaderboard", label: "Leaderboard", icon: Crown },
        { href: "/hindi-mastery", label: "Mastery", icon: Award },
      ]
    },
    {
      title: "Community",
      items: [
        { href: "/community", label: "Community", icon: MessagesSquare },
      ]
    },
    {
      title: "Support & Help",
      items: [
        { href: "/support", label: "Help Center", icon: HelpCircle },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 flex overflow-hidden">

      {/* Sidebar Navigation (Desktop) */}
      <aside className={cn(
        "hidden md:flex flex-col w-72 h-screen fixed inset-y-0 left-0 bg-sidebar border-r border-sidebar-border/50 z-50 transition-all duration-300",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="p-6 pb-2 flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-xl ring-1 ring-primary/20">
            <SaraswatiLogo className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg leading-tight tracking-tight text-sidebar-foreground">Preet English</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Premium Learning</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 mb-4 mt-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-sidebar-accent/50 hover:bg-sidebar-accent border border-white/5 transition-all text-sm text-muted-foreground group"
          >
            <Search className="h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Search lessons...</span>
            <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 rounded border border-white/10 opacity-50">Ctrl K</kbd>
          </button>
        </div>

        {/* Nav Items */}
        <div className="flex-1 overflow-y-auto px-4 space-y-8 scrollbar-hide py-2">
          {navGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-4 text-xs font-bold text-sidebar-foreground/40 uppercase tracking-widest mb-3 font-display">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location === item.href;
                  return (
                    <Link key={item.href} href={item.href}>
                      <div className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer text-sm font-medium group relative",
                        isActive
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
                      )}>
                        <item.icon className={cn(
                          "h-5 w-5 transition-transform group-hover:scale-110",
                          isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                        )} />
                        {item.label}

                        {isActive && (
                          <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Pro Card */}
          <Link href="/pro">
            <div className="relative p-5 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/20 overflow-hidden group cursor-pointer hover:border-amber-500/40 transition-all mx-1 mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl shadow-lg shadow-orange-500/20 text-white">
                  <Crown className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <h4 className="font-bold text-amber-500">Go Pro</h4>
                  <p className="text-xs text-muted-foreground">Unlock AI Tutor</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer User Profile */}
        <div className="p-4 mt-auto border-t border-white/5 bg-sidebar/50 backdrop-blur-sm">
          <Link href="/profile">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20 ring-2 ring-background">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate text-sidebar-foreground">My Profile</p>
                <p className="text-xs text-muted-foreground truncate">View stats</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </Link>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="flex-1 md:ml-72 relative flex flex-col h-screen overflow-hidden bg-background">

        {/* Top Header (Mobile & Desktop) */}
        <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-8 flex items-center justify-between">

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-xl hover:bg-accent/10">
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
            <SaraswatiLogo className="h-8 w-8" />
          </div>

          {/* Desktop Breadcrumbs/Welcome */}
          <div className="hidden md:block">
            <h2 className="text-sm font-medium text-muted-foreground/80">
              {t("welcome_back")}, <span className="text-primary font-bold">Learner</span>
            </h2>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary border border-transparent hover:border-primary/20 transition-all text-xs font-medium"
            >
              <Languages className="h-3.5 w-3.5 text-primary" />
              <span>{i18n.language === "en" ? "Switch to Hindi" : "English Mode"}</span>
            </button>

            <ThemeToggle />
          </div>
        </header>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-secondary p-4 md:p-8 relative">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

          {/* Credits Banner (Restored & Styled) */}
          <div className="mb-8 p-3 rounded-2xl bg-gradient-to-r from-secondary/50 to-transparent border border-white/5 flex items-center justify-between max-w-2xl mx-auto md:mx-0 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <p className="text-xs font-medium text-muted-foreground flex items-center gap-2 relative z-10">
              <span className="bg-primary/20 text-primary px-2 py-0.5 rounded text-[10px] font-bold">CREDITS</span>
              Prepared by <strong className="text-foreground">Mrs. Premlata Jain</strong> (AAO, PWD Udaipur)
            </p>
          </div>

          <div className="max-w-6xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {children}
          </div>
        </div>
      </main>

      <GlobalSearch open={isSearchOpen} onOpenChange={setIsSearchOpen} />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Drawer */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-[280px] bg-sidebar z-50 transform transition-transform duration-300 md:hidden border-r border-white/5",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 space-y-6 h-full overflow-y-auto">
          <div className="flex items-center gap-3 mb-6">
            <SaraswatiLogo className="h-8 w-8" />
            <span className="font-bold text-lg text-sidebar-foreground">Preet English</span>
          </div>

          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              <h3 className="px-2 text-xs font-bold text-sidebar-foreground/40 uppercase tracking-widest mb-2">{group.title}</h3>
              {group.items.map(item => (
                <Link key={item.href} href={item.href}>
                  <div onClick={() => setIsMobileMenuOpen(false)} className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium",
                    location === item.href ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/5"
                  )}>
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
