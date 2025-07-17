
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LandingHeader } from '@/components/landing-header';
import { LandingFooter } from '@/components/landing-footer';
import { Timer, BarChart, BrainCircuit, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 animate-fade-up animation-delay-200">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Master Your Time, Maximize Your Potential
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    TimeWise is the ultimate tool for tracking your work, understanding your habits, and unlocking peak productivity with AI-powered insights.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/signup">Get Started for Free</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Hero"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="time management"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-card animate-fade-up animation-delay-400">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Be More Productive</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From simple time tracking to advanced AI analysis, TimeWise provides a complete suite of tools to help you achieve your goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
              <div className="grid gap-1 text-center">
                <Timer className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Effortless Time Tracking</h3>
                <p className="text-sm text-muted-foreground">Easily start, pause, and stop timers for any task. Stay focused on your work, we'll handle the tracking.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BarChart className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">Detailed History</h3>
                <p className="text-sm text-muted-foreground">View all your time logs in one place. Analyze your history to see where your time goes.</p>
              </div>
              <div className="grid gap-1 text-center">
                <BrainCircuit className="h-10 w-10 mx-auto text-primary" />
                <h3 className="text-lg font-bold">AI-Powered Recommendations</h3>
                <p className="text-sm text-muted-foreground">Receive personalized daily and weekly summaries with actionable advice to optimize your productivity.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quote/Testimonial Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 animate-fade-up animation-delay-600">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <Quote className="mx-auto h-12 w-12 text-primary" />
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                "The key is not to prioritize what's on your schedule, but to schedule your priorities."
              </p>
              <cite className="block font-semibold not-italic">- Stephen Covey</cite>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t bg-card animate-fade-up animation-delay-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">Ready to Transform Your Productivity?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of users who are taking control of their time. Sign up now and start your journey to peak performance.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Start Tracking Time</Link>
              </Button>
            </div>
          </div>
        </section>

      </main>
      <LandingFooter />
    </div>
  );
}
