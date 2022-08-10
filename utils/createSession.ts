import axios from "axios";

export const createSession = async (request_token: string) => {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication/session/new?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
            { request_token }
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};
