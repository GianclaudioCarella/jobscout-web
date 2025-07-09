import React from 'react';
import { Button } from "./Button";
import { MapPin, Building2, Clock, ExternalLink } from "lucide-react";

export interface JobCardProps {
  title: string;
  company: string;
  location?: string;
  description?: string;
  salary?: string;
  workType?: string;
  postedDate?: string;
  url?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ 
  title, 
  company, 
  location, 
  description, 
  salary, 
  workType, 
  postedDate, 
  url 
}) => {
  const handleApplyClick = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100 transition-all duration-300 hover:shadow-lg hover:border-primary-200 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-1">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-white font-semibold text-lg mr-4 shrink-0">
            {company?.charAt(0) || 'J'}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
              {title}
            </h3>
            <p className="text-gray-600 font-medium">{company}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {location && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </span>
        )}
        {workType && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            <Building2 className="w-4 h-4 mr-1" />
            {workType}
          </span>
        )}
        {salary && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
            {salary}
          </span>
        )}
      </div>

      {description && (
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>
      )}

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {postedDate || "Just posted"}
        </div>
        <Button 
          variant="default"
          onClick={handleApplyClick}
          className="apply-button px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;