"use client"

import { useRef, useState } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

export function SolutionVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)

  function togglePlay() {
    if (!ref.current) return
    if (ref.current.paused) {
      ref.current.play()
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

  return (
    <div className="group relative aspect-video w-full overflow-hidden bg-background">
      <video
        ref={ref}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="size-full object-cover"
        onTimeUpdate={onTimeUpdate}
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      {/* Controls bar */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 px-4 pb-3 pt-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {/* Progress bar */}
        <div
          className="relative h-1 w-full cursor-pointer bg-white/20"
          onClick={seek}
        >
          <div
            className="h-full bg-white transition-none"
            style={{ width: `${progress}%` }}
          />
          {/* Scrub handle */}
          <div
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow"
            style={{ left: `${progress}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={toggleMute}
            className="flex size-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white transition-colors hover:border-white/60"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="size-3" /> : <Volume2 className="size-3" />}
          </button>
          <button
            onClick={togglePlay}
            className="flex size-7 items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm text-white transition-colors hover:border-white/60"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="size-3" /> : <Play className="size-3" />}
          </button>
        </div>
      </div>
    </div>
  )
}
