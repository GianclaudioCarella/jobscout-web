import './App.css';
import { Layout } from '@/components/Layout';
import { Header } from '@/components/Header';
import { SearchForm } from '@/components/SearchForm';
import { JobsList } from '@/components/JobsList';
import { useJobSearch } from '@/hooks/useJobSearch';
import { X } from 'lucide-react';

function App() {
  const { jobs, isLoading, hasSearched, error, searchJobs, clearError } = useJobSearch();

  return (
    <Layout>
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchForm onSearch={searchJobs} isLoading={isLoading} />
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <p className="text-red-700">{error}</p>
            <button 
              onClick={clearError}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Clear error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        
        <JobsList 
          jobs={jobs} 
          isLoading={isLoading} 
          hasSearched={hasSearched} 
        />
      </main>
    </Layout>
  );
}

export default App;