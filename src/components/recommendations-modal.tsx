"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bot, Loader2 } from "lucide-react";
import {
  getAllTimeLogs,
  TimeLog,
} from "@/lib/firebase/firestore";
import {
  getTimeOptimizationRecommendations,
  TimeOptimizationRecommendationsOutput,
} from "@/ai/flows/time-optimization-recommendations";
import { useToast } from "@/hooks/use-toast";

interface RecommendationsModalProps {
  userId: string;
}

export function RecommendationsModal({ userId }: RecommendationsModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TimeOptimizationRecommendationsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const logs: TimeLog[] = await getAllTimeLogs(userId);

      if (logs.length < 1) {
          setError("You need at least one time log to generate recommendations.");
          setLoading(false);
          return;
      }

      const formattedLogs = logs.map(log => ({
        taskName: log.taskName,
        startTime: log.startTime.toDate().toISOString(),
        endTime: log.endTime.toDate().toISOString(),
        duration: Math.round(log.duration / 60), // duration in minutes
      }));
      
      const recommendations = await getTimeOptimizationRecommendations({
        userId,
        timeLogs: formattedLogs,
      });

      setResult(recommendations);
    } catch (e) {
      console.error(e);
      setError("Failed to generate recommendations. Please try again.");
      toast({
        title: "Error",
        description: "Could not generate recommendations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if(isOpen) {
        // Reset state when opening
        setResult(null);
        setError(null);
        setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Bot className="mr-2 h-4 w-4" /> Get AI Recommendations
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>AI Time Optimization</DialogTitle>
          <DialogDescription>
            Get a summary of your time and personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {!result && !loading && !error && (
             <div className="text-center space-y-4">
                <p>Click the button below to analyze your time logs and generate your report.</p>
                <Button onClick={handleGenerate}>
                    <Bot className="mr-2 h-4 w-4" /> Generate Report
                </Button>
             </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing your time logs...</p>
            </div>
          )}
          {error && <p className="text-destructive text-center">{error}</p>}
          {result && (
            <div className="space-y-6 text-sm">
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Daily Summary</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.dailySummary}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Weekly Summary</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.weeklySummary}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-foreground">Recommendations</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{result.recommendations}</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
