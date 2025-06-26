# 3D VR Video Player

A VR-ready video player built with React Three Fiber and React XR, featuring an immersive 3D control panel. This project demonstrates how to create a VR video player with modern UI controls in a 3D space.

## Features

- **VR Support**: Built for VR headsets like Meta Quest, with full controller support
- **3D Control Panel**: Floating control panel with:
  - Play/Pause button
  - Volume control with mute toggle
  - Video progress slider
  - Fast forward/rewind buttons
  - Title display
- **Controller Integration**:
  - A button: Play/Pause video
  - B button: Toggle control panel
  - Right thumbstick: Fast forward (right) / rewind (left) by 10 seconds
- **360° Video Support**: Supports equirectangular video projection
- **Modern UI**: Built with UIKit for React Three Fiber, providing a sleek and responsive interface
- **Component Library**: Includes a Storybook showcase of all UI components

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (package manager)
- A VR headset (tested on Meta Quest) or a modern browser with WebXR support

### Installation

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Development

```bash
# Run Storybook to view and develop components in isolation
pnpm storybook

# Build for production
pnpm build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT license.
