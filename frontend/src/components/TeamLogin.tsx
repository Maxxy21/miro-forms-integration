import React, {useState} from 'react';

interface TeamLoginProps {
    onLogin: () => void;
}

const TeamLogin: React.FC<TeamLoginProps> = ({onLogin}) => {
    const [teamName, setTeamName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        // Call backend to authenticate team name
        if (!teamName) {
            alert("Please enter a team name.");
            return;
        }

        console.log("Button clicked");
        const response = await fetch('http://localhost:4000/api/teams/login', {
            method: 'POST',
            body: JSON.stringify({teamName}),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.status === 200) {
            console.log("Logged in", response.status);
            const data = await response.json();
            localStorage.setItem('teamId', data.teamId);
            onLogin();
        } else {
            const data = await response.json();
            alert(data.error || "Login failed!");
        }
        setLoading(false);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg w-full max-w-2xl">
                <h2 className="text-xl font-semibold mb-4">Team Onboarding</h2>
                <label className="block mb-6">
                    <span className="text-gray-700 text-sm">Team Name</span>
                    <input value={teamName} onChange={(e) => setTeamName(e.target.value)}
                           className="mt-1 p-2 w-full border rounded-md text-sm" type="text"
                           placeholder="Team Name"/>
                </label>

                {loading ? (
                    <span>Loading...</span>
                ) : (
                    <button type={"button"} onClick={handleLogin}
                            className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
                        Login/Register
                    </button>
                )}
            </div>
        </div>
    );
};

export default TeamLogin;
