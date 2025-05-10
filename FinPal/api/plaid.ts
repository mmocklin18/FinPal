import api from "../utils/api";
import {LinkTokenResponse} from "../types/linktoken"
import { Transaction } from "@/types/transactions";

export const fetchLinkToken = async () => {
        const res = await api.get<LinkTokenResponse>('/plaid/create-link-token');
        return res.data.link_token;
};

export const fetchTransactions = async () => {
        const res = await api.get('/plaid/get-transactions');
        return res;
}