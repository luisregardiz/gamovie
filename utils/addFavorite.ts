import axios from "axios";
import { AddFavorite } from "../types/user";

export const addFavorite = async (url: string, media: AddFavorite) => {
    try {
        const res = await axios.post(url, media);
        return res;
    } catch (error) {
        console.log(error);
    }
};
