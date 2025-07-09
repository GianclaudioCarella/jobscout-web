import React, { useState } from 'react';
import { Button } from "./Button";
import { Input } from "./Input";
import { Label } from "./Label";
import { Search, AlertCircle } from "lucide-react";

export interface SearchFormData {
  jobTitle: string;
  location: string;
  companies: string;
  workType: string;
}

interface SearchFormProps {
  onSearch: (data: SearchFormData) => void;
  isLoading?: boolean;
  title?: string;
}

interface FormErrors {
  jobTitle?: string;
  location?: string;
  general?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  isLoading = false,
  title = "Find Your Dream Job"
}) => {
  const [formData, setFormData] = useState<SearchFormData>({
    jobTitle: '',
    location: '',
    companies: '',
    workType: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleInputChange = (field: keyof SearchFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
        general: undefined
      }));
    }
  };

  const handleInputBlur = (field: keyof SearchFormData) => () => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
    validateField(field);
  };

  const validateField = (field: keyof SearchFormData) => {
    const value = formData[field].trim();
    const newErrors = { ...errors };

    switch (field) {
      case 'jobTitle':
        if (!value) {
          newErrors.jobTitle = 'Job title is required';
        } else if (value.length < 2) {
          newErrors.jobTitle = 'Job title must be at least 2 characters';
        } else {
          delete newErrors.jobTitle;
        }
        break;
      case 'location':
        if (!value) {
          newErrors.location = 'Location is required';
        } else if (value.length < 2) {
          newErrors.location = 'Location must be at least 2 characters';
        } else {
          delete newErrors.location;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Check if at least job title OR location is provided
    const hasJobTitle = formData.jobTitle.trim().length > 0;
    const hasLocation = formData.location.trim().length > 0;

    if (!hasJobTitle && !hasLocation) {
      newErrors.general = 'Please provide at least a job title or location to search';
      setErrors(newErrors);
      return false;
    }

    // Validate individual required fields
    if (hasJobTitle && formData.jobTitle.trim().length < 2) {
      newErrors.jobTitle = 'Job title must be at least 2 characters';
    }

    if (hasLocation && formData.location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      jobTitle: true,
      location: true,
      companies: true,
      workType: true
    });

    if (validateForm()) {
      // Trim all values before sending
      const cleanedData = {
        jobTitle: formData.jobTitle.trim(),
        location: formData.location.trim(),
        companies: formData.companies.trim(),
        workType: formData.workType.trim()
      };

      onSearch(cleanedData);
    }
  };

  const hasMinimumData = formData.jobTitle.trim().length > 0 || formData.location.trim().length > 0;

  return (
    <div className="bg-white rounded-2xl shadow-card p-8 mb-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {title}
      </h2>
      
      {errors.general && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">{errors.general}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label 
              htmlFor="jobTitle" 
              className="text-sm font-medium text-gray-700"
              required
            >
              Job Title
            </Label>
            <Input
              id="jobTitle"
              type="text"
              placeholder="e.g. Software Engineer, Product Manager"
              value={formData.jobTitle}
              onChange={handleInputChange('jobTitle')}
              onBlur={handleInputBlur('jobTitle')}
              error={touched.jobTitle && !!errors.jobTitle}
              helperText={touched.jobTitle ? errors.jobTitle : undefined}
              className="h-12 px-4 rounded-lg border-gray-300 focus:border-primary focus:ring-primary/20 text-gray-900 bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="location" 
              className="text-sm font-medium text-gray-700"
              required
            >
              Location
            </Label>
            <Input
              id="location"
              type="text"
              placeholder="e.g. San Francisco, Remote"
              value={formData.location}
              onChange={handleInputChange('location')}
              onBlur={handleInputBlur('location')}
              error={touched.location && !!errors.location}
              helperText={touched.location ? errors.location : undefined}
              className="h-12 px-4 rounded-lg border-gray-300 focus:border-primary focus:ring-primary/20 text-gray-900 bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="companies" className="text-sm font-medium text-gray-700">
              Companies <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="companies"
              type="text"
              placeholder="e.g. Google, Microsoft, Amazon"
              value={formData.companies}
              onChange={handleInputChange('companies')}
              className="h-12 px-4 rounded-lg border-gray-300 focus:border-primary focus:ring-primary/20 text-gray-900 bg-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="workType" className="text-sm font-medium text-gray-700">
              Work Type <span className="text-gray-400">(Optional)</span>
            </Label>
            <Input
              id="workType"
              type="text"
              placeholder="e.g. Remote, Hybrid, On-site"
              value={formData.workType}
              onChange={handleInputChange('workType')}
              className="h-12 px-4 rounded-lg border-gray-300 focus:border-primary focus:ring-primary/20 text-gray-900 bg-white"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            type="submit"
            disabled={isLoading || !hasMinimumData}
            className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 h-14 ${
              hasMinimumData 
                ? 'bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white hover:shadow-lg transform hover:-translate-y-0.5' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Search className="w-5 h-5 mr-2" />
            {isLoading ? 'Searching...' : 'Search Jobs'}
          </Button>
          
          <p className="text-sm text-gray-500 text-center">
            Tip: Provide at least a job title or location for better results
          </p>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;