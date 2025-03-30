import { useState } from "react";

export function usePlaid() {
    const[linkToken, setLinkToken] = useState<string | null>(null);

    const fetchLinkToken = async () => {
        try {
            const response = await fetch("http://localhost:5001/plaid/create_link_token", {
                method: "POST",
            });
            const data = await response.json();
            setLinkToken(data.link_token);
        } catch(error) {
            console.error("Error fetching link token:", error);
        }
    };

    return {linkToken, fetchLinkToken};
}


    




