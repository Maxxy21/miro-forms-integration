"use client"

import React, {useState} from 'react';

type OnboardingProps = {
    setTeamRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

const TeamLoginRegister: React.FC<OnboardingProps> = ({setTeamRegistered}) => {
    const [teamName, setTeamName] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/onboard-team', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({teamName})
            });

            if (response.ok) {
                setTeamRegistered(true);
            } else {
                // Handle errors
            }
        } catch (error) {
            console.error("Error onboarding team:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Team Onboarding</h2>
                <label className="block mb-6">
                    <span className="text-gray-700 text-sm">Team Name</span>
                    <input value={teamName} onChange={(e) => setTeamName(e.target.value)}
                           className="mt-1 p-2 w-full border rounded-md text-sm" type="text"
                           placeholder="Innovators Squad"/>
                </label>
                <button onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
                    Register Team
                </button>
            </div>
        </div>
    );
};

export default TeamLoginRegister;
