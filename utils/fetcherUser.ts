import axios from "axios";

export const fetcherUser = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
};
