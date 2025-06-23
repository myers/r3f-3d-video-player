import { Root, type RootRef } from "@react-three/uikit"
import { Pause } from "@react-three/uikit-lucide"
import { useCallback, useRef, useMemo } from "react"
import { useSpring } from "@react-spring/web"
import { signal } from "@preact/signals-core"

export const IconFlash = () => {
  const rootRef = useRef<RootRef>(null)
  const opacity = useMemo(() => signal(1), [])

  const { scale } = useSpring({
    from: { scale: 1.5 },
    to: { scale: 1.5 },
    config: {
      duration: 250,
    },
    onChange: ({ value: { scale } }) => {
      if (!rootRef.current) return
      rootRef.current.setStyle({ transformScale: scale })
    },
  })

  const { progress } = useSpring({
    from: { progress: 0 },
    to: { progress: 0 },
    config: {
      duration: 250,
    },
    onChange: ({ value: { progress } }) => {
      if (!rootRef.current) return

      let currentOpacity
      if (progress <= 0.4) {
        currentOpacity = 1 - (progress / 0.4) * 0.1
      } else {
        const finalProgress = (progress - 0.4) / 0.6
        currentOpacity = 0.9 * (1 - finalProgress)
      }

      opacity.value = currentOpacity
      rootRef.current.setStyle({
        backgroundOpacity: currentOpacity,
      })
    },
    onRest: () => {
      if (!rootRef.current) return
      opacity.value = 0
      rootRef.current.setStyle({
        backgroundOpacity: 0,
      })
    },
  })

  const handleClick = useCallback(() => {
    if (!rootRef.current) return

    opacity.value = 1
    rootRef.current.setStyle({
      transformScale: 1.5,
      backgroundOpacity: 1,
    })

    scale.start({
      from: 1.5,
      to: 3,
    })

    progress.start({
      from: 0,
      to: 1,
    })
  }, [scale, progress])

  return (
    <Root
      ref={rootRef}
      borderRadius={50}
      backgroundColor="black"
      padding={10}
      onClick={handleClick}
      cursor="pointer"
      justifyContent="center"
      alignItems="center"
      transformScale={1.5}
      backgroundOpacity={1}
    >
      <Pause opacity={opacity} />
    </Root>
  )
}
