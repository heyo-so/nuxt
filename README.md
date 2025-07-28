<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Heyo Nuxt
- Package name: @heyo.so/nuxt
- Description: Heyo chat widget integration for Nuxt
-->

# Heyo Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Heyo chat widget integration for Nuxt.

Website: [heyo.so](https://heyo.so?utm_source=npm&utm_campaign=heyo-nuxt)

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github.com/your-org/@heyo.so/nuxt?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ✨ &nbsp;Easy integration
- 🚀 &nbsp;Fast and lightweight
- 🎨 &nbsp;Customizable widget

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @heyo.so/nuxt
```

That's it! You can now use Heyo Nuxt in your Nuxt app ✨
No need for any configuration, the module will automatically load the Heyo chat widget.

However, it won't work in localhost out of the box.

## Configuration

You can configure the module in your `nuxt.config.ts` file.

```ts
export default defineNuxtConfig({
  // ... other config
  modules: ["@heyo.so/nuxt"],
  heyo: {
    projectId: "your-project-id", // Recommended for developmen
    showByDefault: true,
  },
});
```

## Usage

This module provides a `useHeyo` composable to interact with the chat widget.

### `useHeyo()`

The `useHeyo` composable exposes the following methods and properties:

- `show()`: Show the widget.
- `hide()`: Hide the widget.
- `open()`: Open the widget.
- `close()`: Close the widget.
- `identify(meta: Record<string, any>)`: Identify the user with custom data.
- `isReady: Ref<boolean>`: A read-only ref that indicates whether the widget is ready to be used.
- `isLoading: Ref<boolean>`: A read-only ref that indicates whether the widget is currently loading.

#### Example

````vue
<script setup>
import { useHeyo } from '#imports'

const { show, hide, open, close, identify, isReady, isLoading } = useHeyo()

const identifyUser = () => {
  identify({
    name: 'John Doe',
    email: 'john.doe@example.com',
  })
}
</script>

<template>
  <div>
    <h1>Heyo Chat Widget</h1>
    <div v-if="isLoading">Loading widget...</div>
    <div v-else-if="isReady">
      <button @click="show">Show</button>
      <button @click="hide">Hide</button>
      <button @click="open">Open</button>
      <button @click="close">Close</button>
      <button @click="identifyUser">Identify</button>
    </div>
  </div>
</template>

## Contribution

<details>
  <summary>Local development</summary>

  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
````

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@heyo.so/nuxt/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@heyo.so/nuxt
[npm-downloads-src]: https://img.shields.io/npm/dm/@heyo.so/nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/@heyo.so/nuxt
[license-src]: https://img.shields.io/npm/l/@heyo.so/nuxt.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@heyo.so/nuxt
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
