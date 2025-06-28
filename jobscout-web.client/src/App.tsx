import { useEffect, useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { ScaleLoader } from "react-spinners";

interface JobscoutResult {
    title: string;
    url: string;
}

function App() {
    const [jobscoutResults, setJobscoutResults] = useState<JobscoutResult[]>();
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');
    const [companies, setCompanies] = useState('');
    const [workType, setWorkType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        populateJobscoutData();
    }, []);

    function handleButtonClick() {
        setIsLoading(true);
        populateJobscoutData();
    }

    const contents = 
        isLoading 
        ? <p className='loader'><ScaleLoader /></p>
        : jobscoutResults === undefined
            ? <p><em></em></p>
            : <>
            <Table className="table" aria-label="Recent Invoices">
                <TableCaption>Jobscout 2025</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Title</TableHead>
                        <TableHead>Link</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobscoutResults.map(result => (
                            <TableRow key={result.title}>
                                <TableCell className="font-medium">{result.title}</TableCell>
                                <TableCell>
                                    <a href={result.url} target="_blank" rel="noopener noreferrer">
                                        {result.url}
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
            ;

    return (
        <div>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Welcome to Jobscout
            </h1>
            <p>Tool to help you to find your next job.</p>
            <div className="input-group mb-3">
                <Input
                    type="text"
                    placeholder="Title"
                    value={jobTitle}
                    onChange={e => setJobTitle(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                />
                <Input  
                    type="text"
                    placeholder="Companies"
                    value={companies}
                    onChange={e => setCompanies(e.target.value)}
                />
                <Input  
                    type="text"
                    placeholder="Type of work (e.g. remote, hybrid, on-site)"
                    value={workType}
                    onChange={e => setWorkType(e.target.value)}
                />
            </div>
            <div>
                <Button onClick={handleButtonClick}>Search</Button>
                {contents}
            </div>
        </div>
    );

    async function populateJobscoutData() {
        const params = new URLSearchParams({
            jobTitle,
            location,
            companies,
            workType
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