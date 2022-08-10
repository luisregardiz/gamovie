import axios from "axios";
import { AddWatchlist } from "../types/user";

export const addWatchlist = async (url: string, media: AddWatchlist) => {
    try {
        const res = await axios.post(url, media);
        return res;
    } catch (error) {
        console.log(error);
    }
};
