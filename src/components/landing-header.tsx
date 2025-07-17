
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Timer, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function LandingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '/login', label: 'Login' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <Timer className="h-6 w-6 text-primary" />
            <span className="font-bold">TimeWise</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
        </nav>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div
          className={cn(
            "md:hidden absolute top-14 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            "animate-in fade-in-20 slide-in-from-top-4"
            )}
        >
          <div className="container flex flex-col items-start gap-4 py-4">
             <Button variant="ghost" asChild className="w-full justify-start text-base">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
            </Button>
            <Button asChild className="w-full text-base">
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
