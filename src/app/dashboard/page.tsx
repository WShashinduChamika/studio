"use client";

import { useAuthentication } from "@/hooks/use-authentication";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";
import { TimerControls } from "@/components/timer-controls";
import { TimeLogList } from "@/components/time-log-list";
import { RecommendationsModal } from "@/components/recommendations-modal";

export default function DashboardPage() {
  const { user, loading } = useAuthentication();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-[calc(100vh-4rem)] w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6">
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl font-bold tracking-tight">Welcome, {user.email}</h2>
            <RecommendationsModal userId={user.uid} />
        </div>
        <TimerControls />
        <TimeLogList userId={user.uid} />
      </div>
    </div>
  );
}
