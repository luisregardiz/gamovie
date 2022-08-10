import axios from "axios";

export const deleteSession = async (session_id: string) => {
    try {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/authentication/session?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
            { data: { session_id } }
        );

        return res;
    } catch (error) {
        console.log(error);
    }
};
