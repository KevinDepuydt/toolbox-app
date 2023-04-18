import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'a9xxt5',
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
  e2e: {
    baseUrl: 'http://0.0.0.0:3000',
    supportFile: 'cypress/e2e/**/**.{ts,tsx}'
  },
})
