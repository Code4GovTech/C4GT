export const config = {
  api: {
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
  },
  test: {
    timeout: 30000,
    retries: 2,
    workers: 4,
  },
  auth: {
    testUser: {
      email: 'test@example.com',
      password: 'password123',
    },
  },
}; 