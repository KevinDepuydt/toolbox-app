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
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts'
  },
})
