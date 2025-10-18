import { test, expect } from '@playwright/test';
import { config } from '../../config';

test.describe('API End-to-End Tests', () => {
  const baseUrl = config.api.baseUrl;

  test.beforeEach(async ({ request }) => {
    // Clear test data
    await request.post(`${baseUrl}/test/clear`);
  });

  test('should create and retrieve a training module', async ({ request }) => {
    // Create a module
    const createResponse = await request.post(`${baseUrl}/modules`, {
      data: {
        title: {
          en: 'Test Module',
          es: 'Módulo de Prueba'
        },
        description: {
          en: 'Test Description',
          es: 'Descripción de Prueba'
        },
        content: [{
          text: 'Test Content',
          language: 'en'
        }],
        metadata: {
          level: 'beginner',
          category: 'test',
          duration: 60,
          keywords: ['test'],
          prerequisites: [],
          targetAudience: ['testers']
        },
        price: {
          amount: 0,
          currency: 'USD'
        }
      }
    });

    expect(createResponse.ok()).toBeTruthy();
    const module = await createResponse.json();

    // Retrieve the module
    const getResponse = await request.get(`${baseUrl}/modules/${module.id}`);
    expect(getResponse.ok()).toBeTruthy();
    const retrievedModule = await getResponse.json();

    expect(retrievedModule.title.en).toBe('Test Module');
    expect(retrievedModule.metadata.level).toBe('beginner');
  });

  test('should search for training modules', async ({ request }) => {
    // Create test modules
    await request.post(`${baseUrl}/modules`, {
      data: {
        title: { en: 'JavaScript Basics' },
        description: { en: 'Learn JavaScript fundamentals' },
        content: [{ text: 'JavaScript content', language: 'en' }],
        metadata: {
          level: 'beginner',
          category: 'programming',
          duration: 60
        },
        price: { amount: 0, currency: 'USD' }
      }
    });

    // Search for modules
    const searchResponse = await request.get(`${baseUrl}/search?query=JavaScript`);
    expect(searchResponse.ok()).toBeTruthy();
    const results = await searchResponse.json();

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].title.en).toContain('JavaScript');
  });

  test('should handle user authentication', async ({ request }) => {
    // Register a user
    const registerResponse = await request.post(`${baseUrl}/auth/register`, {
      data: {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User'
      }
    });
    expect(registerResponse.ok()).toBeTruthy();

    // Login
    const loginResponse = await request.post(`${baseUrl}/auth/login`, {
      data: {
        email: 'test@example.com',
        password: 'password123'
      }
    });
    expect(loginResponse.ok()).toBeTruthy();
    const { token } = await loginResponse.json();

    // Access protected route
    const profileResponse = await request.get(`${baseUrl}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(profileResponse.ok()).toBeTruthy();
  });

  test('should track module progress', async ({ request }) => {
    // Create a module
    const createResponse = await request.post(`${baseUrl}/modules`, {
      data: {
        title: { en: 'Progress Test' },
        description: { en: 'Test progress tracking' },
        content: [{ text: 'Test content', language: 'en' }],
        metadata: {
          level: 'beginner',
          category: 'test',
          duration: 60
        },
        price: { amount: 0, currency: 'USD' }
      }
    });
    const module = await createResponse.json();

    // Register and login
    await request.post(`${baseUrl}/auth/register`, {
      data: {
        email: 'progress@example.com',
        password: 'password123',
        name: 'Progress User'
      }
    });
    const loginResponse = await request.post(`${baseUrl}/auth/login`, {
      data: {
        email: 'progress@example.com',
        password: 'password123'
      }
    });
    const { token } = await loginResponse.json();

    // Update progress
    const progressResponse = await request.post(`${baseUrl}/modules/${module.id}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        progress: 50
      }
    });
    expect(progressResponse.ok()).toBeTruthy();

    // Check progress
    const getProgressResponse = await request.get(`${baseUrl}/modules/${module.id}/progress`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    expect(getProgressResponse.ok()).toBeTruthy();
    const progress = await getProgressResponse.json();
    expect(progress.progress).toBe(50);
  });
}); 