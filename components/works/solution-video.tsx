"use client"

import { useRef, useState } from "react"
import { Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react"

export function SolutionVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  function togglePlay() {
    if (!ref.current) return
    if (ref.current.paused) {
      ref.current.play().catch(() => setPlaying(false))
      setPlaying(true)
    } else {
      ref.current.pause()
      setPlaying(false)
    }
  }

  function toggleMute() {
    if (!ref.current) return
    ref.current.muted = !ref.current.muted
    setMuted(ref.current.muted)
  }

  function onTimeUpdate() {
    if (!ref.current) return
    setProgress((ref.current.currentTime / ref.current.duration) * 100)
  }

  function seek(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    ref.current.currentTime = ratio * ref.current.duration
    setProgress(ratio * 100)
  }

  function toggleFullscreen() {
    if (!containerRef.current) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      containerRef.current.requestFullscreen()
    }
  }

  return (
    <div ref={containerRef} className="group relative aspect-video w-full overflow-hidden bg-background">
      <video
        ref={ref}
        src={src}
        loop
        muted
        playsInline
        poster={poster}
        className="size-full object-cover"
        onTimeUpdate={onTimeUpdate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Gradient overlay */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-200 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      />

      {/* Center play button - only when paused */}
      {!playing && (
        <button
          onClick={togglePlay}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-16 items-center justify-center border border-white/30 bg-black/50 backdrop-blur-sm text-white transition-colors hover:border-white/80 hover:bg-black/70">
            <Play className="size-6" />
          </span>
        </button>
      )}

      {/* Controls bar */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 pb-3 pt-6 transition-opacity duration-200 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {/* Progress bar */}
        <div
          className="relative h-1 w-full cursor-pointer bg-white/20"
          onClick={seek}
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={togglePlay}
              className="flex size-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white transition-colors hover:border-white/60"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
            </button>
            <button
              onClick={toggleMute}
              className="flex size-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white transition-colors hover:border-white/60"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
            </button>
          </div>
          <button
            onClick={toggleFullscreen}
            className="flex size-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white transition-colors hover:border-white/60"
            aria-label="Toggle fullscreen"
          >
            <Maximize className="size-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
