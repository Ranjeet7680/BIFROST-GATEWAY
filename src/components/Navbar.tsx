"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Cpu,
  Shield,
  Code2,
  Terminal,
  Activity,
  ArrowRight,
  Menu,
  X,
  Github,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Product", href: "/#product" },
    { name: "Features", href: "/#features" },
    { name: "Architecture", href: "/architecture" },
    { name: "Providers", href: "/#providers" },
    { name: "Playground", href: "/playground" },
    { name: "Docs", href: "/docs" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-nav border-b border-white/[0.08] py-3.5 shadow-apple"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-[#2997FF] via-[#0071E3] to-[#A855F7] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow">
            <div className="w-full h-full bg-[#07080e] rounded-[10px] flex items-center justify-center">
              <Layers className="w-5 h-5 text-[#2997FF] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold tracking-tight text-white font-sans">
                BIFROST
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70 border border-white/10">
                v2.4
              </span>
            </div>
            <span className="text-[10px] text-white/40 tracking-wider -mt-1 hidden sm:block">
              OPEN-SOURCE AI GATEWAY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 font-medium"
                    : "text-white/60 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Action buttons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span>15 Providers Active</span>
          </div>

          <a
            href="https://github.com/maximhq/bifrost"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>

          <Link
            href="/dashboard"
            className="relative group overflow-hidden rounded-full bg-gradient-to-r from-[#2997FF] to-[#0071E3] px-4 py-2 text-sm font-medium text-white shadow-glow transition-all duration-300 hover:shadow-[0_0_25px_rgba(41,151,255,0.6)] hover:scale-[1.02] flex items-center gap-1.5"
          >
            <span>Launch Console</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/dashboard"
            className="text-xs px-3 py-1.5 rounded-full bg-[#2997FF] text-white font-medium"
          >
            Console
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/70 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-white/80 hover:text-white py-2 border-b border-white/5"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#2997FF] text-white text-center font-medium text-sm flex items-center justify-center gap-2"
            >
              <span>Launch Enterprise Console</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/playground"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 rounded-xl bg-white/10 text-white text-center font-medium text-sm"
            >
              Interactive API Playground
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
