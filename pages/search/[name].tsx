import { useRouter } from "next/router";
import { FC } from "react";
import useSWR from "swr";
import MediaList from "../../components/app/list";
import fetcher from "../../utils/fetcher";
import Head from "next/head";

interface SearchProps {}

const Search: FC<SearchProps> = () => {
    const router = useRouter();
    const { name } = router.query;

    const { data: movies, error } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/search/multi?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&query=${name}&page=1&include_adult=false&region=US`,
        fetcher
    );
    return (
        <section className="section">
            <Head>
                <title>Results: {name} - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2 className="text-2xl font-bold text-gray-400">
                Results: {name}
            </h2>
            <div>
                {error && <p>Error: {error.message}</p>}
                <MediaList media={movies!} />
            </div>
        </section>
    );
};

export default Search;
