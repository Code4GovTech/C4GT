import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, PlusCircle, Filter, ArrowUpDown, Edit, Trash2, Eye,
  AlertCircle, CheckCircle, XCircle 
} from 'lucide-react';
import { useFramework } from '../contexts/FrameworkContext';
import { useNotification } from '../contexts/NotificationContext';
import { Framework, FrameworkFilters } from '../types/framework';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import DeleteConfirmModal from '../components/Modals/DeleteConfirmModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { frameworks, loading, error, removeFramework, refreshFrameworks } = useFramework();
  const { addNotification } = useNotification();
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [frameworkToDelete, setFrameworkToDelete] = useState<string | null>(null);
  const [filteredFrameworks, setFilteredFrameworks] = useState<Framework[]>([]);
  const [filters, setFilters] = useState<FrameworkFilters>({
    search: '',
    status: '',
    type: ''
  });
  const [sortConfig, setSortConfig] = useState<{key: keyof Framework, direction: 'asc' | 'desc'}>({ 
    key: 'name', 
    direction: 'asc' 
  });

  useEffect(() => {
    applyFilters();
  }, [frameworks, filters, sortConfig]);

  const applyFilters = () => {
    let result = [...frameworks];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        framework => 
          framework.name.toLowerCase().includes(searchLower) || 
          framework.description.toLowerCase().includes(searchLower) ||
          framework.code.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filters.status) {
      result = result.filter(framework => framework.status === filters.status);
    }
    
    // Apply type filter
    if (filters.type) {
      result = result.filter(framework => framework.type === filters.type);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredFrameworks(result);
  };

  const handleSort = (key: keyof Framework) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const confirmDelete = (id: string) => {
    setFrameworkToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!frameworkToDelete) return;
    
    const success = await removeFramework(frameworkToDelete);
    
    if (success) {
      addNotification('success', 'Framework deleted successfully');
    } else {
      addNotification('error', 'Failed to delete framework');
    }
    
    setShowDeleteModal(false);
    setFrameworkToDelete(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Draft':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'Retired':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getUniqueTypes = () => {
    const types = frameworks.map(f => f.type);
    return ['', ...new Set(types)];
  };

  if (loading && frameworks.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Framework Dashboard</h1>
        <button
          onClick={() => navigate('/create')}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 shadow-sm"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Create Framework
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="search"
                placeholder="Search frameworks..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.search}
                onChange={handleFilterChange}
              />
            </div>
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="status"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Retired">Retired</option>
                </select>
              </div>
            </div>
            <div className="md:w-48">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="type"
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">All Types</option>
                  {getUniqueTypes().filter(t => t !== '').map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredFrameworks.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('code')}
                  >
                    <div className="flex items-center">
                      Code
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="flex items-center">
                      Type
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Status
                      <ArrowUpDown className="h-4 w-4 ml-1" />
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Categories
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredFrameworks.map((framework) => (
                  <tr key={framework.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{framework.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{framework.code}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{framework.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(framework.status)}
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">{framework.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-gray-300">{framework.categories.length}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                          onClick={() => navigate(`/view/${framework.id}`)}
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => navigate(`/edit/${framework.id}`)}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => confirmDelete(framework.id!)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <div className="flex flex-col items-center">
                  <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">No frameworks found</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {filters.search || filters.status || filters.type
                      ? "Try adjusting your filters"
                      : "Create your first framework to get started"}
                  </p>
                  {!filters.search && !filters.status && !filters.type && (
                    <button
                      onClick={() => navigate('/create')}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Create Framework
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Framework"
        message="Are you sure you want to delete this framework? This action cannot be undone."
      />
    </div>
  );
};

export default Dashboard;