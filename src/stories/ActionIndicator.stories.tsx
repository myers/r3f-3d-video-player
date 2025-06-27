import type { Meta, StoryObj } from "@storybook/react-vite"
import { Canvas } from "@react-three/fiber"
import { ActionIndicator } from "../ActionIndicator"
import { useEffect, useRef, useState } from "react"

const meta = {
  title: "Components/ActionIndicator",
  component: ActionIndicator,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ActionIndicator>

export default meta
type Story = StoryObj<typeof ActionIndicator>

const MockVideoStory = () => {
  const [video] = useState(() => {
    const vid = document.createElement("video", {}) as HTMLVideoElement
    Object.defineProperty(vid, "duration", { value: 100, writable: true })
    vid.currentTime = 0
    return vid
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  // Create event with type
  const createEvent = (type: string) => new Event(type, { bubbles: true })

  // Simulate video events
  const simulatePlay = () => {
    setIsPlaying(true)
    video.dispatchEvent(createEvent("play"))
    video.dispatchEvent(createEvent("playing"))
  }

  const simulatePause = () => {
    setIsPlaying(false)
    video.dispatchEvent(createEvent("pause"))
  }

  const simulateBuffering = () => {
    setIsBuffering(true)
    video.dispatchEvent(createEvent("waiting"))
    // Auto-resolve buffering after 3 seconds
    timeoutRef.current = window.setTimeout(() => {
      setIsBuffering(false)
      video.dispatchEvent(createEvent("playing"))
    }, 3000)
  }

  const simulateSeek = (seconds: number) => {
    video.currentTime = Math.max(
      0,
      Math.min(video.duration, video.currentTime + seconds),
    )
    video.dispatchEvent(createEvent("timeupdate"))
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas
        style={{ position: "absolute", top: 0, left: 0 }}
        gl={{ alpha: false }}
        camera={{ position: [0, 0, 10] }}
      >
        <color attach="background" args={["#808080"]} />
        <ActionIndicator video={video} />
      </Canvas>
      <div
        style={{
          position: "relative",
          zIndex: 1000,
          margin: "20px",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={isPlaying ? simulatePause : simulatePlay}
            style={{
              padding: "8px 16px",
              background: isPlaying ? "#f44336" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button
            onClick={simulateBuffering}
            disabled={isBuffering}
            style={{
              padding: "8px 16px",
              background: isBuffering ? "#cccccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: isBuffering ? "default" : "pointer",
            }}
          >
            {isBuffering ? "Buffering..." : "Simulate Buffer"}
          </button>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => simulateSeek(-10)}
            style={{
              padding: "8px 16px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Seek -10s
          </button>
          <button
            onClick={() => simulateSeek(10)}
            style={{
              padding: "8px 16px",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Seek +10s
          </button>
        </div>
        <div
          style={{
            color: "white",
            background: "rgba(0,0,0,0.5)",
            padding: "8px 16px",
            borderRadius: "4px",
            fontFamily: "monospace",
          }}
        >
          Current Time: {video.currentTime.toFixed(1)}s / {video.duration}s
        </div>
      </div>
    </div>
  )
}

export const WithControls: Story = {
  render: MockVideoStory,
  args: {
    video: document.createElement("video", {}) as HTMLVideoElement,
  },
}
