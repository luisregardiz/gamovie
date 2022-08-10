import { useState } from "react";
import useSWR from "swr";
import MediaList from "../../components/app/list";
import { MediaData } from "../../types/movie";
import fetcher from "../../utils/fetcher";
import Head from "next/head";
import { NextPage } from "next";
import Pagination from "../../components/app/pagination";
import ListLoader from "../../components/loaders/list";

interface TrendingProps {}

const Trending: NextPage<TrendingProps> = () => {
    const [page, setPage] = useState(1);
    const { data: movies, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
        fetcher
    );

    return (
        <section className="section">
            <Head>
                <title>Trending - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl font-black pb-4 text-gray-400">Trending</h1>

            {error && <p>Error: {error.message}</p>}
            {!movies && <ListLoader />}
            <MediaList media={movies!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default Trending;
