"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { 
  Check, 
  Clock, 
  Hourglass, 
  Cpu, 
  SkipForward, 
  RotateCw, 
  ArrowLeft, 
  ArrowRight, 
  FolderOpen, 
  AudioLines,
  Volume2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function WorkflowPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(56);
  const [elapsed, setElapsed] = useState(78); // 1:18 in seconds
  const [estimated, setEstimated] = useState(52); // 00:52 in seconds

  // Handle mock clock updates
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
      setEstimated((prev) => (prev > 0 ? prev - 1 : 0));
      setProgress((prev) => (prev < 100 ? prev + 0.1 : 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Pipeline timeline steps (10 steps)
  const steps = [
    { id: 1, label: "Trend Selected", status: "completed" },
    { id: 2, label: "News Collection", status: "completed" },
    { id: 3, label: "Research", status: "completed" },
    { id: 4, label: "Script Generation", status: "completed" },
    { id: 5, label: "Voice Generation", status: "in-progress" },
    { id: 6, label: "Storyboard Generation", status: "pending" },
    { id: 7, label: "Asset Collection", status: "pending" },
    { id: 8, label: "Video Composition", status: "pending" },
    { id: 9, label: "Subtitle Generation", status: "pending" },
    { id: 10, label: "Final Video", status: "pending" }
  ];

  // Mock console log entries
  const logs = [
    { time: "10:30:12", text: "Trend selected: Samsung Galaxy Z Fold 6 Launch", status: "neutral" },
    { time: "10:30:15", text: "Fetching top stories from Google News...", status: "neutral" },
    { time: "10:30:22", text: "Downloaded 12 articles", status: "neutral" },
    { time: "10:30:28", text: "Sending data to Gemini for research...", status: "neutral" },
    { time: "10:30:45", text: "Research completed (8.2s)", status: "success" },
    { time: "10:30:46", text: "Generating script with Gemini...", status: "neutral" },
    { time: "10:31:02", text: "Script generated successfully (2.4s)", status: "success" },
    { time: "10:31:03", text: "Initializing Edge TTS Engine (en-IN-NeerjaNeural)...", status: "neutral" },
    { time: "10:31:05", text: "Converting script to speech...", status: "neutral" },
    { time: "10:31:18", text: `Generating voice from script... (${Math.floor(progress)}%)`, status: "active" },
    { time: "10:31:18", text: "Synthesizing audio...", status: "neutral" },
    { time: "10:31:18", text: `Estimated time remaining: ${formatTime(estimated)}`, status: "neutral" }
  ];

  const handleNextStep = () => {
    alert("Moving to Step 3 of 3: Video Assembly & Preview Stage...");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-ink-primary">
      {/* 1. Left Sidebar (Pass activeProject to trigger Project Files mode) */}
      <Sidebar 
        activePath="/workflow" 
        activeProject={{
          title: "Samsung Galaxy Z Fold 6 Launch",
          image: "/samsung_fold_6.png"
        }} 
      />

      {/* 2. Main content area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#fafafb]">
        
        {/* Workspace Page Header */}
        <header className="px-8 py-6 flex items-center justify-between shrink-0 border-b border-border-soft bg-white">
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent-primary tracking-wide uppercase">
              Step 2 of 3
            </span>
            <h1 className="text-2xl font-extrabold text-ink-primary tracking-tight">
              AI Pipeline in Progress
            </h1>
            <p className="text-xs text-ink-secondary">
              Monitor the AI agents as they work together to create your video.
            </p>
          </div>

          <button 
            onClick={() => alert("Opening native project workspace directory...")}
            className="flex items-center gap-2 px-4 py-2 border border-border-soft hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary rounded-xl text-xs font-bold text-ink-secondary transition-all cursor-pointer bg-white shadow-sm"
          >
            <FolderOpen className="w-4 h-4" />
            Open Project Folder
          </button>
        </header>

        {/* Workstation Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          
          {/* Pipeline Timeline Stepper */}
          <section className="bg-white border border-border-soft rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
              Pipeline Timeline
            </h3>

            {/* Stepper Grid Container */}
            <div className="flex items-center justify-between w-full relative overflow-x-auto py-4 select-none no-scrollbar">
              {steps.map((step, idx) => {
                const isCompleted = step.status === "completed";
                const isInProgress = step.status === "in-progress";
                const isPending = step.status === "pending";

                return (
                  <React.Fragment key={step.id}>
                    {/* Step item */}
                    <div className="flex flex-col items-center text-center relative z-10 min-w-[80px]">
                      {/* Step Circle */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${
                        isCompleted 
                          ? "bg-trend-spark border-trend-spark text-white shadow-sm shadow-trend-spark/10" 
                          : isInProgress
                            ? "bg-accent-primary/5 border-accent-primary text-accent-primary ring-4 ring-accent-primary/10 shadow-sm"
                            : "bg-bg-muted border-border-soft text-ink-muted"
                      }`}>
                        {isCompleted && <Check className="w-4.5 h-4.5 stroke-[2.5]" />}
                        {isInProgress && <AudioLines className="w-4.5 h-4.5 animate-pulse" />}
                        {isPending && step.id}
                      </div>

                      {/* Step Label */}
                      <span className={`text-[10px] font-bold mt-2 leading-tight ${
                        isCompleted 
                          ? "text-ink-primary" 
                          : isInProgress 
                            ? "text-accent-primary" 
                            : "text-ink-muted"
                      }`}>
                        {step.label}
                      </span>

                      {/* Sub-label status text */}
                      <span className={`text-[9px] font-semibold mt-0.5 ${
                        isCompleted 
                          ? "text-trend-spark" 
                          : isInProgress 
                            ? "text-accent-primary animate-pulse" 
                            : "text-ink-muted/80"
                      }`}>
                        {isCompleted ? "Done" : isInProgress ? "In Progress" : "Pending"}
                      </span>
                    </div>

                    {/* Step Connection Connector Line */}
                    {idx < steps.length - 1 && (
                      <div className="flex-1 min-w-[20px] h-[2px] mx-1 relative top-[-14px]">
                        <div className={`absolute inset-0 transition-all duration-300 ${
                          isCompleted && steps[idx + 1].status === "completed"
                            ? "bg-trend-spark"
                            : isCompleted && steps[idx + 1].status === "in-progress"
                              ? "bg-accent-primary"
                              : "border-t-2 border-dashed border-border-active"
                        }`} />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          {/* Console logs & detailed progress card grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Live Logs console card */}
            <section className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Live Logs
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-ink-secondary font-bold">
                  <span className="w-2 h-2 rounded-full bg-trend-spark animate-ping" />
                  Auto scroll
                </div>
              </div>

              {/* Terminal View Container */}
              <div className="h-[380px] overflow-y-auto bg-slate-50 border border-border-soft rounded-xl p-4 font-mono text-xs text-slate-800 leading-relaxed shadow-inner">
                <div className="space-y-2">
                  {logs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {/* Log Timestamp */}
                      <span className="text-slate-400 select-none shrink-0 font-medium">{log.time}</span>
                      
                      {/* Log text content based on status */}
                      <div className="flex-1">
                        {log.status === "success" && (
                          <span className="text-emerald-600 font-semibold">{log.text}</span>
                        )}
                        {log.status === "active" && (
                          <span className="text-accent-primary font-bold flex items-center gap-1">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-primary animate-ping" />
                            {log.text}
                          </span>
                        )}
                        {log.status === "neutral" && (
                          <span className="text-slate-700 font-medium">{log.text}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Current Agent Execution Progress Card */}
            <section className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Current Task
                </h3>
                <button 
                  onClick={() => {
                    setProgress(0);
                    setElapsed(0);
                    setEstimated(52);
                    alert("Retrying voice generation agent execution...");
                  }}
                  className="py-1 px-3 bg-accent-primary text-white rounded-lg text-xs font-bold hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Retry Current Agent
                </button>
              </div>

              {/* Active Voice Task Card */}
              <div className="p-4 bg-bg-muted/30 border border-border-soft rounded-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary border border-accent-primary/20">
                    <Volume2 className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink-primary">Generating Voice from Script</h4>
                    <p className="text-[10px] text-ink-muted font-semibold mt-0.5">Using Edge TTS (en-IN-NeerjaNeural)</p>
                  </div>
                </div>

                {/* Horizontal Progress Bar */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2.5 bg-bg-muted border border-border-soft rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-accent-primary rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-sm font-extrabold text-ink-primary w-10 text-right select-none">
                    {Math.floor(progress)}%
                  </span>
                </div>
              </div>

              {/* Run Metrics Grid (4 columns) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 select-none">
                <div className="border border-border-soft rounded-xl p-3 bg-white text-center shadow-sm">
                  <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
                    <Clock className="w-3 h-3 text-ink-muted" />
                    Elapsed Time
                  </div>
                  <div className="text-sm font-extrabold text-ink-primary font-mono">{formatTime(elapsed)}</div>
                </div>

                <div className="border border-border-soft rounded-xl p-3 bg-white text-center shadow-sm">
                  <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
                    <Hourglass className="w-3 h-3 text-ink-muted" />
                    Remaining
                  </div>
                  <div className="text-sm font-extrabold text-ink-primary font-mono">{formatTime(estimated)}</div>
                </div>

                <div className="border border-border-soft rounded-xl p-3 bg-white text-center shadow-sm">
                  <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
                    <Cpu className="w-3 h-3 text-ink-muted" />
                    Agent
                  </div>
                  <div className="text-xs font-extrabold text-accent-primary truncate">VoiceAgent</div>
                </div>

                <div className="border border-border-soft rounded-xl p-3 bg-white text-center shadow-sm">
                  <div className="text-[9px] font-bold text-ink-muted uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-ping" />
                    Status
                  </div>
                  <div className="text-xs font-extrabold text-accent-primary">In Progress</div>
                </div>
              </div>

              {/* Task Details Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Task Details
                </h4>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 border border-border-soft rounded-xl p-4 bg-bg-muted/10 text-xs font-medium text-ink-secondary shadow-sm">
                  <div className="flex items-center justify-between border-b border-border-soft/60 pb-1.5">
                    <span className="text-ink-muted font-bold">Engine</span>
                    <span className="text-ink-primary font-bold">Edge TTS</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border-soft/60 pb-1.5">
                    <span className="text-ink-muted font-bold">Words</span>
                    <span className="text-ink-primary font-bold">128</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border-soft/60 pb-1.5">
                    <span className="text-ink-muted font-bold">Voice</span>
                    <span className="text-ink-primary font-bold">en-IN-NeerjaNeural</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-border-soft/60 pb-1.5">
                    <span className="text-ink-muted font-bold">Duration (Est.)</span>
                    <span className="text-ink-primary font-bold">00:34</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-ink-muted font-bold">Output File</span>
                    <span className="text-ink-primary font-bold font-mono text-[11px]">voice.mp3</span>
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-ink-muted font-bold">Sample Rate</span>
                    <span className="text-ink-primary font-bold">24kHz</span>
                  </div>
                </div>
              </div>

              {/* Actions Footer inside card */}
              <div className="flex items-center gap-3 pt-2 select-none">
                <button 
                  onClick={() => alert("Skipping voice agent and proceeding to storyboard step...")}
                  className="flex-1 py-2.5 px-4 border border-border-soft hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary text-ink-primary rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 bg-white shadow-sm"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                  Skip This Agent
                </button>
                <button 
                  onClick={() => {
                    setProgress(0);
                    setElapsed(0);
                    setEstimated(52);
                  }}
                  className="flex-1 py-2.5 px-4 bg-accent-primary text-white rounded-xl text-xs font-bold hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Retry
                </button>
              </div>
            </section>

          </div>

        </div>

        {/* Floating Stepper Navigation Footer */}
        <footer className="h-20 border-t border-border-soft bg-white px-8 flex items-center justify-between shrink-0 select-none shadow-sm">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 py-2.5 px-5 border border-border-soft hover:bg-bg-muted text-ink-primary rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button 
            onClick={handleNextStep}
            className="flex items-center gap-1.5 py-2.5 px-6 bg-accent-primary text-white hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </footer>

      </main>
    </div>
  );
}
