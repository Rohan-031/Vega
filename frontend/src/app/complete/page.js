"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import {
  Check,
  Download,
  Upload,
  Share2,
  FolderOpen,
  Plus,
  BarChart2,
  Folder,
  Play,
  Volume2,
  Maximize2,
  ArrowLeft,
  ExternalLink
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// All project files completed for this page
const completedProjectFiles = [
  { name: "research.md",    type: "doc",      status: "completed" },
  { name: "news.json",      type: "json",     status: "completed" },
  { name: "script.txt",     type: "script",   status: "completed" },
  { name: "voice.mp3",      type: "audio",    status: "completed" },
  { name: "storyboard.json",type: "json",     status: "completed" },
  { name: "assets/",        type: "folder",   status: "completed" },
  { name: "captions.srt",   type: "subtitle", status: "completed" },
  { name: "final.mp4",      type: "video",    status: "ready" },
];

// All 10 pipeline steps
const pipelineSteps = [
  { id: 1,  label: "Trend Selected",       status: "completed" },
  { id: 2,  label: "News Collection",      status: "completed" },
  { id: 3,  label: "Research",             status: "completed" },
  { id: 4,  label: "Script Generation",    status: "completed" },
  { id: 5,  label: "Voice Generation",     status: "completed" },
  { id: 6,  label: "Storyboard Generation",status: "completed" },
  { id: 7,  label: "Asset Collection",     status: "completed" },
  { id: 8,  label: "Video Composition",    status: "completed" },
  { id: 9,  label: "Subtitle Generation",  status: "completed" },
  { id: 10, label: "Final Video",          status: "final" },
];

// AI agent execution log rows
const agentRows = [
  { name: "TrendAgent",     time: "00:05" },
  { name: "NewsAgent",      time: "00:12" },
  { name: "ResearchAgent",  time: "00:18" },
  { name: "ScriptAgent",    time: "00:10" },
  { name: "VoiceAgent",     time: "00:34" },
  { name: "StoryboardAgent",time: "00:08" },
  { name: "AssetAgent",     time: "01:05" },
  { name: "VideoAgent",     time: "02:12" },
  { name: "SubtitleAgent",  time: "00:06" },
];

// Output metadata
const outputDetails = [
  { label: "File Name",   value: "final.mp4" },
  { label: "Resolution",  value: "1080 × 1920" },
  { label: "Duration",    value: "00:34" },
  { label: "File Size",   value: "24.7 MB" },
  { label: "Format",      value: "MP4 (H.264)" },
  { label: "Frame Rate",  value: "30 FPS" },
  { label: "Created At",  value: "07 July 2025, 11:24 AM" },
];

export default function CompletePage() {
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);

  const activeProject = {
    title: "Samsung Galaxy Z Fold 6 Launch",
    image: "/samsung_fold_6.png",
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base text-ink-primary">
      {/* ─── Sidebar: all project files completed ─── */}
      <Sidebar
        activePath="/complete"
        activeProject={activeProject}
        overrideProjectFiles={completedProjectFiles}
      />

      {/* ─── Main workspace ─── */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#fafafb]">

        {/* Top Header */}
        <header className="px-8 py-5 flex items-center justify-between shrink-0 border-b border-border-soft bg-white">
          <div className="space-y-1">
            <span className="text-xs font-bold text-accent-primary tracking-wide uppercase">
              Step 3 of 3
            </span>
            <h1 className="text-2xl font-extrabold text-ink-primary tracking-tight flex items-center gap-2">
              Pipeline Completed
              <span className="text-2xl">🎉</span>
            </h1>
            <p className="text-xs text-ink-secondary">
              Your video is ready! Review the summary and download or upload to YouTube.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Opening project folder...")}
              className="flex items-center gap-2 px-4 py-2 border border-border-soft hover:border-accent-primary hover:bg-accent-primary/5 hover:text-accent-primary rounded-xl text-xs font-bold text-ink-secondary transition-all cursor-pointer bg-white shadow-sm"
            >
              <FolderOpen className="w-4 h-4" />
              Open Project Folder
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-xl text-xs font-bold hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              New Project
            </button>
          </div>
        </header>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">

          {/* ── Pipeline Timeline ── */}
          <section className="bg-white border border-border-soft rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-5">
              Pipeline Timeline
            </h3>
            <div className="flex items-center justify-between w-full relative py-3 select-none overflow-x-auto no-scrollbar">
              {pipelineSteps.map((step, idx) => {
                const isFinal = step.status === "final";
                return (
                  <React.Fragment key={step.id}>
                    {/* Circle */}
                    <div className="flex flex-col items-center text-center relative z-10 min-w-[72px]">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                        isFinal
                          ? "bg-accent-primary border-accent-primary text-white shadow-md shadow-accent-primary/20 ring-4 ring-accent-primary/10"
                          : "bg-trend-spark border-trend-spark text-white shadow-sm shadow-trend-spark/10"
                      }`}>
                        {isFinal ? step.id : <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <span className={`text-[10px] font-bold mt-2 leading-tight ${isFinal ? "text-accent-primary" : "text-ink-primary"}`}>
                        {step.label}
                      </span>
                      <span className={`text-[9px] font-semibold mt-0.5 ${isFinal ? "text-accent-primary font-bold" : "text-trend-spark"}`}>
                        {isFinal ? "Completed" : "Done"}
                      </span>
                    </div>
                    {/* Connector */}
                    {idx < pipelineSteps.length - 1 && (
                      <div className="flex-1 h-[2px] bg-trend-spark mx-1 relative top-[-14px]" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>

          {/* ── Three-column main content ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

            {/* LEFT: Pipeline Summary + AI Agents */}
            <div className="space-y-5">

              {/* Pipeline Summary card */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Pipeline Summary
                </h3>
                <div className="space-y-2.5 text-xs">
                  {[
                    { label: "Topic",        value: "Samsung Galaxy Z Fold 6 Launch" },
                    { label: "Duration",     value: "00:34" },
                    { label: "Video Format", value: "9:16 (1080×1920)" },
                    { label: "Video Size",   value: "24.7 MB" },
                    { label: "Created At",   value: "07 July 2025, 11:24 AM" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-start gap-3 py-1.5 border-b border-border-soft/60 last:border-0">
                      <span className="text-ink-muted font-bold w-24 shrink-0">{label}</span>
                      <span className="text-ink-primary font-semibold flex-1 leading-tight">{value}</span>
                    </div>
                  ))}
                  {/* Status row with badge */}
                  <div className="flex items-center gap-3 py-1.5">
                    <span className="text-ink-muted font-bold w-24 shrink-0">Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-trend-spark/10 text-trend-spark border border-trend-spark/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-trend-spark" />
                      Completed
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Agents Execution card */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  AI Agents Execution
                </h3>
                <div className="space-y-0.5">
                  {agentRows.map((agent) => (
                    <div key={agent.name} className="flex items-center justify-between py-2 border-b border-border-soft/50 last:border-0 text-xs group hover:bg-bg-muted/30 rounded-lg px-2 -mx-2 transition-colors">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-accent-primary/10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent-primary" />
                        </div>
                        <span className="font-semibold text-ink-primary">{agent.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-ink-secondary">{agent.time}</span>
                        <span className="text-[10px] font-bold text-trend-spark">Done</span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Total time row */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-border-soft text-xs font-bold text-ink-primary">
                  <span>Total Time</span>
                  <span className="font-mono text-sm">04:50</span>
                </div>
              </div>
            </div>

            {/* CENTER: Generated Video Preview */}
            <div className="space-y-4">
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Generated Video Preview
                </h3>

                {/* Video Player Mock */}
                <div className="relative rounded-xl overflow-hidden border border-border-soft bg-zinc-900 group cursor-pointer"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {/* Thumbnail */}
                  <img
                    src="/video_thumb.png"
                    alt="Samsung Z Fold 6 Video Preview"
                    className="w-full object-cover"
                    style={{ maxHeight: "340px" }}
                  />

                  {/* Play overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-200 ${isPlaying ? "opacity-0" : "opacity-100"}`}>
                    <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                      <Play className="w-6 h-6 fill-accent-primary text-accent-primary ml-0.5" />
                    </div>
                  </div>

                  {/* Video controls bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <button className="text-white hover:text-accent-primary transition-colors cursor-pointer">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <span className="text-white text-[10px] font-mono shrink-0">0:00 / 0:34</span>
                      {/* Progress track */}
                      <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                        <div className="w-0 h-full bg-accent-primary rounded-full" />
                      </div>
                      <button className="text-white hover:text-accent-primary transition-colors cursor-pointer">
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button className="text-white hover:text-accent-primary transition-colors cursor-pointer">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Open in Player button */}
                <button
                  onClick={() => alert("Opening video in external media player...")}
                  className="w-full py-2.5 bg-accent-primary text-white rounded-xl text-xs font-bold hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Open in Player
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* RIGHT: Output Details + Actions + What's Next */}
            <div className="space-y-5">

              {/* Output Details card */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Output Details
                </h3>
                <div className="space-y-2">
                  {outputDetails.map(({ label, value }) => (
                    <div key={label} className="flex items-center justify-between py-1.5 border-b border-border-soft/50 last:border-0 text-xs">
                      <span className="text-ink-muted font-bold">{label}</span>
                      <span className="text-ink-primary font-bold font-mono text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions card */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
                  Actions
                </h3>

                {/* Download — solid primary */}
                <button
                  onClick={() => alert("Downloading final.mp4 (24.7 MB)...")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-accent-primary text-white rounded-xl text-xs font-bold hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Video
                </button>

                {/* Upload to YouTube — outlined */}
                <button
                  onClick={() => alert("Connecting to YouTube Studio for upload...")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-border-soft hover:border-rose-500/40 hover:bg-rose-50 hover:text-rose-600 text-ink-primary rounded-xl text-xs font-bold bg-white transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  Upload to YouTube
                </button>

                {/* Share Video — outlined */}
                <button
                  onClick={() => alert("Generating shareable video link...")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-border-soft hover:border-accent-primary/40 hover:bg-accent-primary/5 hover:text-accent-primary text-ink-secondary rounded-xl text-xs font-bold bg-white transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  Share Video
                </button>

                {/* Open Folder — outlined */}
                <button
                  onClick={() => alert("Opening project output folder...")}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-border-soft hover:border-accent-primary/40 hover:bg-accent-primary/5 hover:text-accent-primary text-ink-secondary rounded-xl text-xs font-bold bg-white transition-all cursor-pointer"
                >
                  <FolderOpen className="w-4 h-4" />
                  Open Project Folder
                </button>
              </div>

              {/* What's Next? card */}
              <div className="bg-white border border-border-soft rounded-2xl p-5 shadow-sm space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-ink-primary">What's Next?</h3>
                  <p className="text-[11px] text-ink-secondary mt-0.5 leading-relaxed">
                    Great job! Your video is ready to go live.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* Create Another Video */}
                  <button
                    onClick={() => router.push("/")}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border-soft hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all cursor-pointer group text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary group-hover:bg-accent-primary group-hover:text-white transition-all">
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-ink-primary leading-tight">Create Another Video</span>
                  </button>

                  {/* View Analytics */}
                  <button
                    onClick={() => alert("Analytics coming soon!")}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border-soft opacity-60 cursor-not-allowed text-center"
                    disabled
                  >
                    <div className="w-8 h-8 rounded-lg bg-bg-muted flex items-center justify-center text-ink-muted">
                      <BarChart2 className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-ink-muted leading-tight">View Analytics (Coming Soon)</span>
                  </button>

                  {/* Manage Projects */}
                  <button
                    onClick={() => alert("Navigating to projects manager...")}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border-soft hover:border-accent-primary/30 hover:bg-accent-primary/5 transition-all cursor-pointer group text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-bg-muted flex items-center justify-center text-ink-secondary group-hover:bg-accent-primary group-hover:text-white transition-all">
                      <Folder className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold text-ink-primary leading-tight">Manage Projects</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ── Bottom Navigation Footer ── */}
        <footer className="h-20 border-t border-border-soft bg-white px-8 flex items-center justify-between shrink-0 shadow-sm select-none">
          <button
            onClick={() => router.push("/workflow")}
            className="flex items-center gap-1.5 py-2.5 px-5 border border-border-soft hover:bg-bg-muted text-ink-primary rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 py-2.5 px-6 bg-accent-primary text-white hover:bg-opacity-95 shadow-sm shadow-accent-primary/20 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Finish
            <Check className="w-4 h-4 stroke-[2.5]" />
          </button>
        </footer>

      </main>
    </div>
  );
}
