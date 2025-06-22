import { useFrame } from "@react-three/fiber"
import { XRLayer, useXRInputSourceState, useXRStore } from "@react-three/xr"
import { useMemo, useState, useEffect } from "react"

interface EquirectPlayerProps {
  videoUrl: string
  videoAngle?: number
  layout?: XRLayerLayout
}

export function EquirectPlayer({
  videoUrl,
  videoAngle = 180,
  layout = "stereo-left-right",
}: EquirectPlayerProps) {
  const store = useXRStore()
  const [buttonADown, setButtonADown] = useState(false)
  const [moveRightDown, setMoveRightDown] = useState(false)
  const [moveLeftDown, setMoveLeftDown] = useState(false)
  const controllerRight = useXRInputSourceState("controller", "right")
  const video = useMemo(() => {
    const videoElement = document.createElement("video")
    videoElement.src = videoUrl
    videoElement.crossOrigin = "anonymous"
    videoElement.preload = "auto"
    return videoElement
  }, [videoUrl])

  useEffect(() => {
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1)
        const duration = video.duration
        console.log(
          `Video buffered: ${bufferedEnd.toFixed(1)}s / ${duration.toFixed(1)}s`,
        )
      }
    }

    video.addEventListener("progress", handleProgress)
    return () => {
      video.removeEventListener("progress", handleProgress)
    }
  }, [video])

  useFrame(() => {
    if (!controllerRight) {
      return
    }
    const rightGamepad = controllerRight.inputSource.gamepad
    if (!rightGamepad || !video) {
      return
    }

    // Check if thumbstick is pushed right (x > 0.5)
    if (rightGamepad.axes[2] > 0.5 && !moveRightDown) {
      setMoveRightDown(true)
      console.log("thumbstick right: ff")
      video.currentTime += 10
    }
    if (rightGamepad.axes[2] < 0.5 && moveRightDown) {
      setMoveRightDown(false)
    }
    // Check if thumbstick is pushed left (x < -0.5)
    if (rightGamepad.axes[2] < -0.5 && !moveLeftDown) {
      setMoveLeftDown(true)
      console.log("thumbstick left: rew")
      video.currentTime -= 10
    }
    if (rightGamepad.axes[2] > -0.5 && moveLeftDown) {
      setMoveLeftDown(false)
    }

    if (controllerRight?.gamepad?.["b-button"]?.state === "pressed") {
      video.pause()
      store.getState().session?.end()
    }
    // Check if A button is pressed (button 0)
    if (
      controllerRight?.gamepad?.["a-button"]?.state === "pressed" &&
      !buttonADown
    ) {
      setButtonADown(true)
      console.log("A button pressed")
      if (video.paused) {
        video.play()
      } else {
        video.pause()
      }
    }
    if (
      controllerRight?.gamepad?.["a-button"]?.state !== "pressed" &&
      buttonADown
    ) {
      setButtonADown(false)
    }
  })

  return (
    <group>
      <XRLayer
        src={video}
        layout={layout}
        shape="equirect"
        centralHorizontalAngle={(Math.PI * videoAngle) / 180}
        upperVerticalAngle={Math.PI / 2.0}
        lowerVerticalAngle={-Math.PI / 2.0}
        scale={100}
      />
    </group>
  )
}
