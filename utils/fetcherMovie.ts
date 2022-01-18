import axios from "axios";

const fetcherMovie = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export default fetcherMovie;
