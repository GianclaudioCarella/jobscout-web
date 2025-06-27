import { useEffect, useState } from 'react';
import './App.css';

interface JobscoutResult {
    title: string;
    url: string;
}

function App() {
    const [jobscoutResults, setJobscoutResults] = useState<JobscoutResult[]>();

    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [companies, setCompanies] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        populateJobscoutData();
    }, []);

    function handleButtonClick() {
        setIsLoading(true);
        populateJobscoutData();
    }

    const contents = 
        isLoading
        ? <p><em>Loading...</em></p>
        : jobscoutResults === undefined
            ? <p><em></em></p>
            : <table className="table table-striped full-width-table" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                    </tr>
                </thead>
                <tbody>
                    {jobscoutResults.map(result =>
                        <tr key={result.title}>
                            <td>{result.title}</td>
                            <td>
                                <a href={result.url} target="_blank" rel="noopener noreferrer">
                                    {result.url}
                                </a>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>;

    return (
        <div>
            <h1 id="tableLabel">Welcome to Jobscout</h1>
            <p>Tool to help you to find your next job.</p>
            <div className="input-group mb-3">
                <input
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <input  
                    type="text"
                    placeholder="Companies"
                    value={companies}
                    onChange={e => setCompanies(e.target.value)}
                />
            </div>
            <button onClick={handleButtonClick}>Search</button>
            {contents}
        </div>
    );

    async function populateJobscoutData() {
        const params = new URLSearchParams({
            jobTitle,
            location,
            companies
        });

        try {
            const response = await fetch(`jobs?${params.toString()}`);
            if (response.ok) {
                const data = await response.json();
                setJobscoutResults(data);
            } else {
                console.error('Failed to fetch jobscout results:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching jobscout results:', error);
        } finally {
            setIsLoading(false);
        }
    }
}

export default App;