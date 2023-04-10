import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'a9xxt5',
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})
