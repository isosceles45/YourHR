import React, { useState } from "react";
import axios from "axios";

const dummyJobs = [
    { id: 1, title: "Software Engineer", company: "Tech Corp" },
    { id: 2, title: "Product Manager", company: "Biz Solutions" },
    { id: 3, title: "UX Designer", company: "Design Studio" },
    { id: 4, title: "Data Scientist", company: "Analytics Hub" },
    { id: 5, title: "DevOps Engineer", company: "Cloud Ops" },
    { id: 6, title: "Backend Developer", company: "Code Works" },
];

const JobList = () => {
    const [selectedJob, setSelectedJob] = useState(null);
    const [bio, setBio] = useState("");
    const [resume, setResume] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">
                            Apply for {selectedJob.title}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="bio"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Your Bio
                                </label>
                                <input
                                    type="text"
                                    id="bio"
                                    value={bio}
                                    onChange={handleBioChange}
                                    className="border p-2 w-full rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="resume"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Upload Resume
                                </label>
                                <input
                                    type="file"
                                    id="resume"
                                    onChange={handleResumeChange}
                                    className="border p-2 w-full rounded"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
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
