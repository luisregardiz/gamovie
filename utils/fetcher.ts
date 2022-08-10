import axios from "axios";

const fetcher = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data.results;
    } catch (error) {
        console.log(error);
    }
};

export default fetcher;
