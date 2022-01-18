import axios from "axios";

export const createRquestToken = async () => {
    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication/token/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
