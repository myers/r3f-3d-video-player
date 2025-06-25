import { useXRSessionModeSupported, type XRStore } from "@react-three/xr"
import { useState, useEffect } from "react"

const styles = {
  container: {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    zIndex: 1000,
  },
  childrenWrapper: {
    marginBottom: "10px",
  },
  button: {
    padding: "8px 16px",
    background: "#007AFF",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    "&:disabled": {
      background: "#cccccc",
      cursor: "not-allowed",
      opacity: 0.7,
    },
  },
}

interface SplashScreenProps {
  store: XRStore
  children: React.ReactNode
}

export function SplashScreen({ store, children }: SplashScreenProps) {
  const [inSession, setInSession] = useState(false)

  useEffect(() => {
    const unsubscribe = store.subscribe((state, prevState) => {
      if (state.session !== prevState.session) {
        setInSession(state.session !== undefined)
      }
    })

    return unsubscribe
  }, [store])
  if (inSession) {
    return null
  }
  return (
    <div style={styles.container}>
      <div style={styles.childrenWrapper}>{children}</div>
      <EnterVRButton store={store} />
    </div>
  )
}

const EnterVRButton = ({ store }: { store: XRStore }) => {
  const isVRSupported = useXRSessionModeSupported("immersive-vr")

  if (!isVRSupported) {
    return (
      <button
        disabled
        style={{
          ...styles.button,
          background: "#cccccc",
          cursor: "not-allowed",
          opacity: 0.7,
        }}
      >
        VR not supported on this device
      </button>
    )
  }
  return (
    <button onClick={() => store.enterVR()} style={styles.button}>
      Enter VR
    </button>
  )
}
