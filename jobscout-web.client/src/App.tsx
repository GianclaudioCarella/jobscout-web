import { useEffect, useState } from 'react';
import './App.css';
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
                    </TableHeader>
                    <TableBody>
                        {jobscoutResults.map(result => (
                            <TableRow key={result.title}>
                                <TableCell>
                                    <a className="text-base" href={result.url} target="_blank" rel="noopener noreferrer">
                                        {result.title}
                                        <div className="text-xs">{result.url}</div>
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </>
            ;

    return (
        <div className="">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
                Welcome to Jobscout
            </h1>
            <p>Tool to help you to find your next job.</p>
            <div className="input-group mb-3 flex flex-col items-center gap-3">
                <div className="grid w-full max-w-big items-center gap-3">
                    <Label htmlFor="email">Title</Label>
                    <Input
                        type="text"
                        placeholder="Jobtitle (e.g. Software Engineer, Data Scientist...)"
                        value={jobTitle}
                        onChange={e => setJobTitle(e.target.value)}
                    />
                </div>
                <div className="grid w-full max-w-big items-center gap-3">
                    <Label htmlFor="email">Location</Label>
                    <Input
                        type="text"
                        placeholder="Location (e.g. New York, Brasilia...)"
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                    />
                </div>

                <div className="grid w-full max-w-big items-center gap-3">
                    <Label htmlFor="email">Companies</Label>
                    <Input  
                        type="text"
                        placeholder="Companies (e.g. Google, Microsoft, Amazon...)"
                        value={companies}
                        onChange={e => setCompanies(e.target.value)}
                    />
                </div>

                <div className="grid w-full max-w-big items-center gap-3">
                    <Label htmlFor="email">Type</Label>
                    <Input  
                        type="text"
                        placeholder="Type of work (e.g. remote, hybrid, on-site)"
                        value={workType}
                        onChange={e => setWorkType(e.target.value)}
                    />
                </div>
            </div>
            <div className="">
                <Button onClick={handleButtonClick}>Search</Button>
                <div className="text-center">
                    {contents}
                </div>
                
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