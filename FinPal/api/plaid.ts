import api from "../utils/api";
import {LinkTokenResponse} from "../types/linktoken"

export const fetchLinkToken = async () => {
        const res = await api.get<LinkTokenResponse>('/plaid/create-link-token');
        return res.data.link_token;
};
