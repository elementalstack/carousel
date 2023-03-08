
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  "core": {
    "builder": {
      "name": "@storybook/builder-vite",
      "options": {
        "fsCache": false
      }
    }
  },
  "features": {
    "storyStoreV7": true
  },
  "framework": "@storybook/react",
}
