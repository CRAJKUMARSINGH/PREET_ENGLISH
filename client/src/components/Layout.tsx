import { Link, useLocation } from "wouter";
import { BookOpen, Home, Trophy, User, Menu, X, Languages } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/profile", label: t("profile"), icon: User },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-slate-950 flex flex-col transition-colors duration-300">
      {/* Top Credits Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 dark:from-primary/20 dark:via-accent/20 dark:to-primary/20 border-b border-primary/20 dark:border-primary/30 py-2 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-primary dark:text-primary">
            ✨ {t("prepared_by")} <span className="font-bold">Mrs. Premlata Jain, AAO, PWD Udaipur</span> ✨
          </p>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b dark:border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-display font-bold text-xl text-primary">
          <BookOpen className="h-6 w-6" />
          <span>Preet English</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            title={t("language")}
          >
            <Languages className="h-5 w-5" />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r dark:border-slate-800 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center gap-3 mb-6 text-primary">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="font-display font-bold text-xl">Preet English</span>
          </div>

          {/* Theme Toggle for Desktop */}
          <div className="mb-6 flex justify-center">
            <ThemeToggle />
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer font-medium",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                        : "text-muted-foreground hover:bg-muted dark:hover:bg-slate-800 hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t dark:border-slate-800">
            {/* Language Toggle for Desktop */}
            <button 
              onClick={toggleLanguage}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer font-medium text-muted-foreground hover:bg-muted dark:hover:bg-slate-800 hover:text-foreground mb-4"
            >
              <Languages className="h-5 w-5" />
              {i18n.language === "en" ? "हिंदी" : "English"}
            </button>
            
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <Trophy className="h-5 w-5 text-accent" />
                <span>{t("pro_tip")}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t("consistency_tip")}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen w-full">
        <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </main>
      
      </div>
      
      {/* Bottom Credits Footer */}
      <footer className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-t border-slate-200 dark:border-slate-700 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            🙏 {t("initiative_credit")} <span className="font-semibold text-primary">Mrs. Premlata Jain, AAO, PWD Udaipur</span> | 
            <span className="ml-2">💝 {t("dedication_message")}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
