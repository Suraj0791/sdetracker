"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Target, Menu, X, Sparkles } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";

export default function Navigation() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/opportunities", label: "Opportunities", icon: Sparkles },
    { href: "/sde", label: "SDE Tracker", icon: Briefcase },
    { href: "/product", label: "Product Tracker", icon: Target },
  ];

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CT</span>
            </div>
            <span className="font-bold text-lg hidden sm:block">
              Career Tracker
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname?.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Menu */}
            <UserMenu />
          </div>
        </div>

        {/* Mobile menu content */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border animate-in slide-in-from-top duration-200">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive =
                pathname === link.href || pathname?.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
            <div className="px-4 py-2 flex items-center justify-between border-t border-border mt-2 pt-4">
              <span className="text-sm text-muted-foreground">Account</span>
              <UserMenu />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
