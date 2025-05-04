import { useState } from "react";
import axios from "axios";

export function usePlaid() {
    const[linkToken, setLinkToken] = useState<string | null>(null);
    
    //request the link token 
    const fetchLinkToken = async () => {
        try {
            const response = await axios.post("http://localhost:5001/plaid/create_link_token");
            setLinkToken(response.data.link_token);
        } catch(error) {
            console.error("Error fetching link token:", error);
        }
    };

    return {linkToken, fetchLinkToken};
}


    




