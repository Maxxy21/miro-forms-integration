"use client"

import React, {useEffect, useState} from "react";
import Questionnaire from "@/components/Questionnaire";
import TeamLogin from "@/components/TeamLogin";

const Forms = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const verifyUser = async () => {
            const teamId = localStorage.getItem('teamId');
            if (teamId) {
                const response = await fetch('http://localhost:4000/api/verifyUser', {
                    method: 'POST',
                    body: JSON.stringify({teamId}),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await response.json();
                if (data.notRegistered) {
                    // Handle the not registered scenario
                    // Perhaps show a message or redirect the user
                } else {
                    setLoggedIn(true);
                }
            }
        };
        verifyUser().catch(error => {
            console.error("Error verifying user:", error);

        });
        return () => {
            // Clean up any pending state updates if the component is unmounted
        };
    }, []);

    return loggedIn ? <Questionnaire/> : <TeamLogin onLogin={() => setLoggedIn(true)}/>;
};


export default Forms