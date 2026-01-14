"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="w-4 h-4 text-primary" />
        </div>
        <span className="text-sm font-medium hidden sm:block max-w-[150px] truncate">
          {user.email}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs text-muted-foreground mt-1">Signed in</p>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors text-destructive"
            >
              <LogOut className="w-4 h-4" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
