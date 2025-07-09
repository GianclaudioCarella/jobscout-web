import React from 'react';
import { JobCard, type JobCardProps } from './JobCard';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';

interface JobsListProps {
  jobs: JobCardProps[];
  isLoading: boolean;
  hasSearched: boolean;
}

export const JobsList: React.FC<JobsListProps> = ({ 
  jobs, 
  isLoading, 
  hasSearched 
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (!hasSearched) {
    return (
      <EmptyState
        title="Ready to find your dream job?"
        message="Enter your search criteria above and click search to get started."
      />
    );
  }

  if (jobs.length === 0) {
    return (
      <EmptyState
        title="No jobs found"
        message="Try adjusting your search criteria or check back later for new opportunities."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {jobs.map((job, index) => (
        <JobCard key={`${job.title}-${index}`} {...job} />
      ))}
    </div>
  );
};

export default JobsList;