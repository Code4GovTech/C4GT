import { Framework } from '../types/framework';

// Mock data for development
const MOCK_FRAMEWORKS: Framework[] = [
  {
    id: 'f1',
    name: 'National Curriculum Framework',
    description: 'The national curriculum framework for K-12 education',
    code: 'NCF2023',
    status: 'Active',
    type: 'Curriculum',
    categories: [
      {
        id: 'c1',
        name: 'Subjects',
        description: 'Subject categories for the curriculum',
        terms: [
          {
            id: 't1',
            name: 'Mathematics',
            description: 'All mathematics related curriculum'
          },
          {
            id: 't2',
            name: 'Science',
            description: 'All science related curriculum'
          }
        ]
      }
    ],
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    createdBy: 'user1'
  },
  {
    id: 'f2',
    name: 'Digital Skills Framework',
    description: 'Framework for digital skills and competencies',
    code: 'DSF2023',
    status: 'Draft',
    type: 'Competency',
    categories: [
      {
        id: 'c2',
        name: 'Skill Levels',
        description: 'Levels of digital skill proficiency',
        terms: [
          {
            id: 't3',
            name: 'Basic',
            description: 'Fundamental digital skills'
          },
          {
            id: 't4',
            name: 'Intermediate',
            description: 'Moderate level of digital skills'
          },
          {
            id: 't5',
            name: 'Advanced',
            description: 'Expert level digital skills'
          }
        ]
      }
    ],
    createdAt: '2023-02-15T00:00:00Z',
    updatedAt: '2023-03-01T00:00:00Z',
    createdBy: 'user2'
  }
];

// Simulated delay to mimic API call latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions with simulated network requests
export const fetchFrameworks = async (): Promise<Framework[]> => {
  await delay(800); // Simulate network delay
  
  // In a real app, this would be an API fetch
  // return fetch('/api/frameworks').then(res => res.json());
  
  return [...MOCK_FRAMEWORKS];
};

export const fetchFrameworkById = async (id: string): Promise<Framework> => {
  await delay(500);
  
  const framework = MOCK_FRAMEWORKS.find(f => f.id === id);
  
  if (!framework) {
    throw new Error('Framework not found');
  }
  
  return { ...framework };
};

export const createFramework = async (framework: Framework): Promise<Framework> => {
  await delay(1000);
  
  // Generate a random ID for the new framework
  const newFramework: Framework = {
    ...framework,
    id: `f${Math.floor(Math.random() * 10000)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 'current-user' // In a real app, this would be the authenticated user's ID
  };
  
  // In a real app, this would be a POST request
  // return fetch('/api/frameworks', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(framework)
  // }).then(res => res.json());
  
  MOCK_FRAMEWORKS.push(newFramework);
  
  return newFramework;
};

export const updateFramework = async (framework: Framework): Promise<Framework> => {
  await delay(1000);
  
  if (!framework.id) {
    throw new Error('Framework ID is required for updates');
  }
  
  // Find the framework index
  const index = MOCK_FRAMEWORKS.findIndex(f => f.id === framework.id);
  
  if (index === -1) {
    throw new Error('Framework not found');
  }
  
  // Update the framework
  const updatedFramework: Framework = {
    ...framework,
    updatedAt: new Date().toISOString()
  };
  
  // In a real app, this would be a PUT or PATCH request
  // return fetch(`/api/frameworks/${framework.id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(framework)
  // }).then(res => res.json());
  
  MOCK_FRAMEWORKS[index] = updatedFramework;
  
  return updatedFramework;
};

export const deleteFramework = async (id: string): Promise<void> => {
  await delay(800);
  
  // Find the framework index
  const index = MOCK_FRAMEWORKS.findIndex(f => f.id === id);
  
  if (index === -1) {
    throw new Error('Framework not found');
  }
  
  // In a real app, this would be a DELETE request
  // return fetch(`/api/frameworks/${id}`, {
  //   method: 'DELETE'
  // }).then(res => res.json());
  
  MOCK_FRAMEWORKS.splice(index, 1);
};