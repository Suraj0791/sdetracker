"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Target } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/sde", label: "SDE", icon: Briefcase },
    { href: "/product", label: "Product", icon: Target },
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

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
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
                  <span className="hidden sm:block">{link.label}</span>
                </Link>
              );
            })}

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
