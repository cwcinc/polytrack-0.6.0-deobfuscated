export default {
  webServer: {
    command: 'npx http-server . -p 8080',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
  },
  testDir: './tests',
  use: { baseURL: 'http://localhost:8080' },
};