import React, { useState } from 'react';

const dummyJobs = [
    { id: 1, title: "Software Engineer", company: "Tech Corp" },
    { id: 2, title: "Product Manager", company: "Biz Solutions" },
    { id: 3, title: "UX Designer", company: "Design Studio" }
];

const JobList = () => {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleClick = (job) => {
        setSelectedJob(job);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
            <ul className="space-y-4">
                {dummyJobs.map((job) => (
                    <li
                        key={job.id}
                        className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                        onClick={() => handleClick(job)}
                    >
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        <p>{job.company}</p>
                    </li>
                ))}
            </ul>
            {selectedJob && (
                <div className="mt-8 p-4 border rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Apply for {selectedJob.title}</h3>
                    <input
                        type="text"
                        placeholder="Your Bio"
                        className="border p-2 w-full mb-4 rounded"
                    />
                    <input
                        type="file"
                        placeholder="Upload Resume"
                        className="border p-2 w-full mb-4 rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default JobList;
