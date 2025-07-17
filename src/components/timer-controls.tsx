"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, StopCircle } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import { useAuthentication } from "@/hooks/use-authentication";
import { addTimeLog } from "@/lib/firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export function TimerControls() {
  const { user } = useAuthentication();
  const { toast } = useToast();
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<Date | null>(null);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (!taskName.trim()) {
      toast({ title: "Task name is required.", variant: "destructive" });
      return;
    }
    setIsActive(true);
    setIsPaused(false);
    startTimeRef.current = new Date();
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = async () => {
    if (user && startTimeRef.current) {
      try {
        await addTimeLog({
          userId: user.uid,
          taskName,
          startTime: startTimeRef.current,
          endTime: new Date(),
          duration: time,
        });
        toast({ title: "Success", description: "Time log saved successfully." });
      } catch (error) {
        toast({ title: "Error", description: "Failed to save time log.", variant: "destructive" });
      }
    }
    setIsActive(false);
    setTime(0);
    setTaskName("");
    startTimeRef.current = null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>What are you working on?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Enter task name..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          disabled={isActive}
        />
        <div className="flex items-center justify-between rounded-md bg-muted p-4">
          <div className="text-4xl font-bold font-mono text-foreground">
            {formatDuration(time)}
          </div>
          <div className="flex items-center gap-2">
            {!isActive ? (
              <Button onClick={handleStart} size="lg">
                <Play className="mr-2 h-5 w-5" /> Start
              </Button>
            ) : (
              <>
                <Button onClick={handlePauseResume} variant="secondary" size="icon" aria-label={isPaused ? "Resume" : "Pause"}>
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </Button>
                <Button onClick={handleStop} variant="destructive" size="icon" aria-label="Stop">
                  <StopCircle className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
