import React, { useState, useEffect } from "react";
import axios from "axios";
import jobsData from "../jobsData.json";

const JobList = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [appliedJobs, setAppliedJobs] = useState([]);

    const handleClick = (job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJob(null);
        setBio("");
        setResume(null);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bio", bio);
        formData.append("resume", resume);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/upload`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            setAppliedJobs([...appliedJobs, selectedJob.id]);
            handleCloseModal();
        } catch (error) {
            console.error(
                "Error updating profile:",
                error.response?.data,
                error.response?.status,
                error.response?.headers
            );
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Available Jobs</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobsData.map((job) => (
                    <li
                        key={job.id}
                        className={`border p-6 rounded-lg cursor-pointer shadow-md hover:shadow-lg transition duration-300 ${
                            appliedJobs.includes(job.id) ? 'bg-green-50 border-green-500' : 'bg-white'
                        }`}
                        onClick={() => !appliedJobs.includes(job.id) && handleClick(job)}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-700">{job.title}</h3>
                                <p className="text-gray-600">{job.company}</p>
                                <p className="text-gray-500 text-sm">{job.location}</p>
                                <p className="text-gray-600 mt-2">{job.description}</p>
                            </div>
                            {appliedJobs.includes(job.id) && (
                                <div className="flex items-center text-green-600">
                                    <span className="mr-2">Applied</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {isModalOpen && selectedJob && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                            Apply for {selectedJob.title}
                        </h3>
                        <div className="mb-4">
                            <h4 className="text-lg font-semibold text-gray-700">Requirements:</h4>
                            <ul className="list-disc pl-5 text-gray-600">
                                {selectedJob.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Your Bio
                                </label>
                                <textarea
                                    id="bio"
                                    value={bio}
                                    onChange={handleBioChange}
                                    className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2 w-full rounded-md"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="resume"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Upload Resume
                                </label>
                                <input
                                    type="file"
                                    id="resume"
                                    onChange={handleResumeChange}
                                    className="border border-gray-300 focus:ring-blue-500 focus:border-blue-500 p-2 w-full rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobList;
