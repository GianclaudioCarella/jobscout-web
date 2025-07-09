import { useState, useCallback } from 'react';
import { type JobCardProps } from '@/components/JobCard';
import { type SearchFormData } from '@/components/SearchForm';

export const useJobSearch = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchJobs = useCallback(async (searchData: SearchFormData) => {
    // Additional validation before API call
    const hasJobTitle = searchData.jobTitle.trim().length > 0;
    const hasLocation = searchData.location.trim().length > 0;

    if (!hasJobTitle && !hasLocation) {
      setError('Please provide at least a job title or location');
      return;
    }

    setIsLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      
      // Only add non-empty parameters
      if (searchData.jobTitle.trim()) {
        params.append('jobTitle', searchData.jobTitle.trim());
      }
      if (searchData.location.trim()) {
        params.append('location', searchData.location.trim());
      }
      if (searchData.companies.trim()) {
        params.append('companies', searchData.companies.trim());
      }
      if (searchData.workType.trim()) {
        params.append('workType', searchData.workType.trim());
      }

      const response = await fetch(`jobs?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        
        if (data.length === 0) {
          setError('No jobs found. Try adjusting your search criteria.');
        }
      } else {
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetSearch = useCallback(() => {
    setJobs([]);
    setError(null);
    setHasSearched(false);
  }, []);

  return {
    jobs,
    isLoading,
    hasSearched,
    error,
    searchJobs,
    clearError,
    resetSearch
  };
};