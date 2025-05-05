import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, Eye, X, ArrowLeft } from 'lucide-react';
import { useFramework } from '../contexts/FrameworkContext';
import { useNotification } from '../contexts/NotificationContext';
import { Framework } from '../types/framework';
import FrameworkBasicInfo from '../components/Framework/FrameworkBasicInfo';
import FrameworkCategories from '../components/Framework/FrameworkCategories';
import FrameworkPreview from '../components/Framework/FrameworkPreview';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const EditFramework: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { frameworks, loading, saveFramework } = useFramework();
  const { addNotification } = useNotification();
  
  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<Framework | null>(null);

  useEffect(() => {
    if (frameworks.length > 0 && id) {
      const framework = frameworks.find(f => f.id === id);
      if (framework) {
        setFormData(framework);
      } else {
        addNotification('error', 'Framework not found');
        navigate('/');
      }
    }
  }, [frameworks, id, navigate, addNotification]);

  const handleNext = () => {
    if (step === 1) {
      // Validate basic info
      if (!formData?.name || !formData.code || !formData.type) {
        addNotification('error', 'Please fill in all required fields');
        return;
      }
    }
    
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCategoriesChange = (updatedCategories: any[]) => {
    if (!formData) return;
    setFormData({ ...formData, categories: updatedCategories });
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleSubmit = async () => {
    if (!formData) return;
    
    // Final validation
    if (!formData.name || !formData.code || !formData.type) {
      addNotification('error', 'Please fill in all required fields');
      setStep(1); // Go back to first step
      return;
    }
    
    if (formData.categories.length === 0) {
      addNotification('error', 'Please add at least one category');
      setStep(2); // Go to categories step
      return;
    }
    
    const success = await saveFramework(formData);
    
    if (success) {
      addNotification('success', 'Framework updated successfully');
      navigate('/');
    } else {
      addNotification('error', 'Failed to update framework');
    }
  };

  if (loading && !formData) {
    return <LoadingSpinner />;
  }

  if (!formData) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Framework not found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <button
            onClick={() => navigate('/')}
            className="mb-2 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Edit Framework</h1>
        </div>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button
            type="button"
            onClick={togglePreview}
            className="flex items-center px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {showPreview ? <X className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showPreview ? 'Close Preview' : 'Preview'}
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="w-full">
        <div className="flex mb-4">
          <div className="w-1/2">
            <div className={`h-1 ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'} rounded-l-full`}></div>
          </div>
          <div className="w-1/2">
            <div className={`h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'} rounded-r-full`}></div>
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <div className={`${step >= 1 ? 'text-blue-600 font-medium' : ''}`}>Basic Info</div>
          <div className={`${step >= 2 ? 'text-blue-600 font-medium' : ''}`}>Categories</div>
        </div>
      </div>

      {showPreview ? (
        <FrameworkPreview framework={formData} onClose={togglePreview} />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {step === 1 && (
              <FrameworkBasicInfo formData={formData} onChange={handleChange} />
            )}
            
            {step === 2 && (
              <FrameworkCategories 
                categories={formData.categories} 
                onChange={handleCategoriesChange}
              />
            )}
            
            <div className="mt-8 flex justify-between">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {step < 2 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner size="small" message="" />
                      <span className="ml-2">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Framework
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFramework;