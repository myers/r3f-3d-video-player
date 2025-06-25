import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  viteFinal: (config) => {
    // Add base URL for GitHub Pages deployment
    if (
      typeof process !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      config.base = "/r3f-3d-video-player/storybook/"
    }
    return config
  },
}
export default config
