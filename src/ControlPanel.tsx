import { Container, Root, Text } from "@react-three/uikit"
import { Slider } from "@react-three/uikit-default"

export const ControlPanelRoot = () => {
  return (
    <group rotation={[-0.3, 0, 0]} scale={0.5}>
      <Root
        backgroundColor="red"
        sizeX={8}
        sizeY={2}
        flexDirection="row"
      ></Root>
    </group>
  )
}

export const ControlPanel = () => {
  return (
    <Container
      flexGrow={1}
      margin={32}
      backgroundColor="green"
      justifyContent="center"
    >
      <Text>Hi</Text>
      <Slider />
    </Container>
  )
}
