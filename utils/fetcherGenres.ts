import axios from "axios";

const fetcherGenres = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        return data.genres;
    } catch (error) {
        console.log(error);
    }
};

export default fetcherGenres;
