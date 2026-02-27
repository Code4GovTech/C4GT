import React from 'react';
import { Framework } from '../../types/framework';

interface FrameworkPreviewProps {
  framework: Framework;
  onClose: () => void;
}

const FrameworkPreview: React.FC<FrameworkPreviewProps> = ({ framework, onClose }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Framework Preview</h2>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close Preview
          </button>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Basic Information</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{framework.name || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Code</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{framework.code || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white">{framework.type || '—'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</dt>
                  <dd className="mt-1 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      framework.status === 'Active' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                        : framework.status === 'Draft' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {framework.status || 'Draft'}
                    </span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          
          <div>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Description</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 h-full">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {framework.description || 'No description provided.'}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">Categories</h3>
          
          {framework.categories.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No categories have been added to this framework.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {framework.categories.map((category) => (
                <div key={category.id} className="bg-gray-50 dark:bg-gray-700 rounded-md overflow-hidden">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-600">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</h4>
                    {category.description && (
                      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{category.description}</p>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h5 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Terms</h5>
                    
                    {category.terms.length === 0 ? (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        No terms have been added to this category.
                      </p>
                    ) : (
                      <ul className="divide-y divide-gray-200 dark:divide-gray-600">
                        {category.terms.map((term) => (
                          <li key={term.id} className="py-2">
                            <div>
                              <h6 className="text-xs font-medium text-gray-900 dark:text-white">{term.name}</h6>
                              {term.description && (
                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{term.description}</p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-white mb-2">JSON Preview</h3>
          <div className="bg-gray-900 rounded-md p-4 overflow-auto max-h-60">
            <pre className="text-xs text-green-400">
              {JSON.stringify(framework, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkPreview;