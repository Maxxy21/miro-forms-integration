"use client"

import React, {useState} from 'react';

const Questionnaire = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        teamId: localStorage.getItem('teamId'), // fetch teamId from local storage or from wherever you've stored it
        founderName: '',
        startupName: '',
        fundingStage: '',
        productType: '',
        feedback: '',
        problems: '',
        solutions: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const response = await fetch('http://localhost:4000/api/questionnaire/submit', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.status === 200) {
            console.log("Data submitted successfully");
        } else {
            console.log("Error submitting data");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Startup Questionnaire</h2>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Founders Name</span>
                        <input name="founderName" onChange={handleInputChange}
                               className="mt-1 p-2 w-full border rounded-md text-sm" type="text"
                               placeholder="John Doe"/>
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Startup Name</span>
                        <input name="startupName" onChange={handleInputChange}
                               className="mt-1 p-2 w-full border rounded-md text-sm" type="text"
                               placeholder="Innovate Tech"/>
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <span className="text-gray-700 text-sm block mb-2">Funding Stage</span>
                    <select name="fundingStage" onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md text-sm">
                        <option value="seed">Seed</option>
                        <option value="seriesA">Series A</option>
                        <option value="seriesB">Series B</option>
                    </select>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <span className="text-gray-700 text-sm block mb-2">Product Type</span>
                    <select name="productType" onChange={handleInputChange}
                            className="mt-1 p-2 w-full border rounded-md text-sm">
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="service">Service</option>
                    </select>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Feedback or Comments</span>
                        <textarea name="feedback" onChange={handleInputChange}
                                  className="mt-1 p-2 w-full border rounded-md text-sm h-24"></textarea>
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Top 3 Problems to Solve</span>
                        <input name="problems" onChange={handleInputChange}
                               className="mt-1 p-2 w-full border rounded-md text-sm" type="text"/>
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Possible Solutions</span>
                        <input name="solutions" onChange={handleInputChange}
                               className="mt-1 p-2 w-full border rounded-md text-sm" type="text"/>
                    </label>
                </div>

                <div className="flex justify-end">
                    {loading ? (
                        <span>Submitting...</span>
                    ) : (
                        <button onClick={handleSubmit}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
