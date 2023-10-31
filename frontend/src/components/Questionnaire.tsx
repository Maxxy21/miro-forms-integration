"use client"

import React, {useState} from 'react';

const Questionnaire = () => {
    const [formData, setFormData] = useState({
        founderName: '',
        startupName: '',
        fundingStage: '',
        productType: '',
        feedback: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Startup Questionnaire</h2>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Founders Name</span>
                        <input name="founderName" onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md text-sm" type="text" placeholder="John Doe" />
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Startup Name</span>
                        <input name="startupName" onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md text-sm" type="text" placeholder="Innovate Tech" />
                    </label>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <span className="text-gray-700 text-sm block mb-2">Funding Stage</span>
                    <select name="fundingStage" onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md text-sm">
                        <option value="seed">Seed</option>
                        <option value="seriesA">Series A</option>
                        <option value="seriesB">Series B</option>
                    </select>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <span className="text-gray-700 text-sm block mb-2">Product Type</span>
                    <select name="productType" onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md text-sm">
                        <option value="software">Software</option>
                        <option value="hardware">Hardware</option>
                        <option value="service">Service</option>
                    </select>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <label className="block">
                        <span className="text-gray-700 text-sm">Feedback or Comments</span>
                        <textarea name="feedback" onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md text-sm h-24"></textarea>
                    </label>
                </div>

                <div className="flex justify-end">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questionnaire;
