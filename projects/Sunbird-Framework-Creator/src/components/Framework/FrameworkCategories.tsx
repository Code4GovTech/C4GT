import React, { useState } from 'react';
import { Plus, Trash2, Edit, Save, X, PlusCircle } from 'lucide-react';
import { Category, Term } from '../../types/framework';

interface FrameworkCategoriesProps {
  categories: Category[];
  onChange: (categories: Category[]) => void;
}

const FrameworkCategories: React.FC<FrameworkCategoriesProps> = ({ 
  categories, 
  onChange 
}) => {
  const [newCategory, setNewCategory] = useState<Category>({
    id: '',
    name: '',
    description: '',
    terms: []
  });
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [newTerm, setNewTerm] = useState<Term>({
    id: '',
    name: '',
    description: ''
  });
  const [editingTermId, setEditingTermId] = useState<string | null>(null);
  const [showAddTerm, setShowAddTerm] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (!newCategory.name) return;

    const categoryId = Math.random().toString(36).substring(2, 9);
    const categoryToAdd: Category = {
      ...newCategory,
      id: categoryId,
      terms: []
    };

    onChange([...categories, categoryToAdd]);
    setNewCategory({
      id: '',
      name: '',
      description: '',
      terms: []
    });
    setShowAddCategory(false);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleEditCategory = (category: Category) => {
    setNewCategory(category);
    setEditingCategoryId(category.id);
    setShowAddCategory(true);
  };

  const handleUpdateCategory = () => {
    if (!newCategory.name || !editingCategoryId) return;

    const updatedCategories = categories.map(category => 
      category.id === editingCategoryId ? { ...newCategory } : category
    );

    onChange(updatedCategories);
    setNewCategory({
      id: '',
      name: '',
      description: '',
      terms: []
    });
    setEditingCategoryId(null);
    setShowAddCategory(false);
  };

  const handleDeleteCategory = (categoryId: string) => {
    const updatedCategories = categories.filter(category => category.id !== categoryId);
    onChange(updatedCategories);
  };

  const handleAddTerm = (categoryId: string) => {
    if (!newTerm.name) return;

    const termId = Math.random().toString(36).substring(2, 9);
    const termToAdd: Term = {
      ...newTerm,
      id: termId
    };

    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          terms: [...category.terms, termToAdd]
        };
      }
      return category;
    });

    onChange(updatedCategories);
    setNewTerm({
      id: '',
      name: '',
      description: ''
    });
    setShowAddTerm(null);
  };

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTerm({ ...newTerm, [name]: value });
  };

  const handleEditTerm = (categoryId: string, term: Term) => {
    setNewTerm(term);
    setEditingTermId(term.id);
    setShowAddTerm(categoryId);
  };

  const handleUpdateTerm = (categoryId: string) => {
    if (!newTerm.name || !editingTermId) return;

    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          terms: category.terms.map(term => 
            term.id === editingTermId ? { ...newTerm } : term
          )
        };
      }
      return category;
    });

    onChange(updatedCategories);
    setNewTerm({
      id: '',
      name: '',
      description: ''
    });
    setEditingTermId(null);
    setShowAddTerm(null);
  };

  const handleDeleteTerm = (categoryId: string, termId: string) => {
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          terms: category.terms.filter(term => term.id !== termId)
        };
      }
      return category;
    });

    onChange(updatedCategories);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Categories and Terms</h2>
        <button
          type="button"
          onClick={() => setShowAddCategory(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </button>
      </div>
      
      {showAddCategory && (
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md border border-gray-200 dark:border-gray-600 animate-fadeIn">
          <h3 className="text-md font-medium mb-4">
            {editingCategoryId ? 'Edit Category' : 'Add New Category'}
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="categoryName"
                name="name"
                value={newCategory.name}
                onChange={handleCategoryChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Subjects, Grades, Competencies"
              />
            </div>
            
            <div>
              <label htmlFor="categoryDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                id="categoryDescription"
                name="description"
                value={newCategory.description}
                onChange={handleCategoryChange}
                rows={2}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of this category"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowAddCategory(false);
                  setNewCategory({
                    id: '',
                    name: '',
                    description: '',
                    terms: []
                  });
                  setEditingCategoryId(null);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                disabled={!newCategory.name}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingCategoryId ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {categories.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md">
          <p className="text-gray-500 dark:text-gray-400">
            No categories added yet. Click "Add Category" to create your first framework category.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden"
            >
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-between items-center">
                <div>
                  <h3 className="text-md font-medium text-gray-900 dark:text-white">{category.name}</h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditCategory(category)}
                    className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-3 flex justify-between items-center">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Terms</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTerm(category.id);
                      setEditingTermId(null);
                      setNewTerm({
                        id: '',
                        name: '',
                        description: ''
                      });
                    }}
                    className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-700 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:hover:bg-blue-800"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add Term
                  </button>
                </div>
                
                {showAddTerm === category.id && (
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md border border-gray-200 dark:border-gray-600 mb-4 animate-fadeIn">
                    <h5 className="text-sm font-medium mb-3">
                      {editingTermId ? 'Edit Term' : 'Add New Term'}
                    </h5>
                    
                    <div className="space-y-3">
                      <div>
                        <label htmlFor={`termName-${category.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                          Term Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id={`termName-${category.id}`}
                          name="name"
                          value={newTerm.name}
                          onChange={handleTermChange}
                          className="mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., Mathematics, Grade 1, Critical Thinking"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`termDescription-${category.id}`} className="block text-xs font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>
                        <textarea
                          id={`termDescription-${category.id}`}
                          name="description"
                          value={newTerm.description}
                          onChange={handleTermChange}
                          rows={2}
                          className="mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Brief description of this term"
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddTerm(null);
                            setEditingTermId(null);
                          }}
                          className="px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => editingTermId ? handleUpdateTerm(category.id) : handleAddTerm(category.id)}
                          disabled={!newTerm.name}
                          className="px-3 py-1 text-xs font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {editingTermId ? 'Update Term' : 'Add Term'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {category.terms.length === 0 ? (
                  <div className="text-center py-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-md">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      No terms added yet. Click "Add Term" to add terms to this category.
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {category.terms.map((term) => (
                      <li key={term.id} className="py-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white">{term.name}</h5>
                            {term.description && (
                              <p className="text-xs text-gray-600 dark:text-gray-400">{term.description}</p>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <button
                              type="button"
                              onClick={() => handleEditTerm(category.id, term)}
                              className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteTerm(category.id, term.id)}
                              className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                
                {category.terms.length > 0 && showAddTerm !== category.id && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddTerm(category.id);
                      setEditingTermId(null);
                      setNewTerm({
                        id: '',
                        name: '',
                        description: ''
                      });
                    }}
                    className="mt-3 inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    <PlusCircle className="mr-1 h-3 w-3" />
                    Add Another Term
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FrameworkCategories;