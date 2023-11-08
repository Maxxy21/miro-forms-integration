import React, {useState, useEffect} from 'react';

type ResponseType = {
    questionId: number;
    teamId: string;
    answer: string;
};

const Visualization = () => {
    const [responses, setResponses] = useState<ResponseType[]>([]);

    useEffect(() => {
        // Fetch responses from your API
        async function fetchResponses() {
            const response = await fetch('http://localhost:4000/api/responses'); // Adjust this endpoint
            const data = await response.json();
            setResponses(data);
        }

        fetchResponses().then(result => {
            // handle the result
        })
            .catch(error => {
                console.error("Error fetching responses:", error);
            });
    }, []);

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + responses.map(response => `${response.questionId},${response.teamId},${response.answer}`).join("\n");

        const blob = new Blob([csvContent], {type: "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.setAttribute("download", "responses.csv");
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg w-full max-w-3xl">
                <h2 className="text-xl font-semibold mb-4">Responses Visualization</h2>

                <button onClick={downloadCSV}
                        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-md">
                    Download CSV
                </button>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 rounded-md">
                        <thead>
                        <tr>
                            <th className="p-4 text-sm text-gray-700">Question ID</th>
                            <th className="p-4 text-sm text-gray-700">Team ID</th>
                            <th className="p-4 text-sm text-gray-700">Answer</th>
                        </tr>
                        </thead>
                        <tbody>
                        {responses.map((response, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-4">{response.questionId}</td>
                                <td className="p-4">{response.teamId}</td>
                                <td className="p-4">{response.answer}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Visualization;
