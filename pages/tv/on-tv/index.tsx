import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import MediaList from "../../../components/app/list";
import Pagination from "../../../components/app/pagination";
import ListLoader from "../../../components/loaders/list";
import { MediaData } from "../../../types/movie";
import fetcher from "../../../utils/fetcher";

interface TVOnAirProps {}

const TVOnAir: NextPage<TVOnAirProps> = () => {
    const [page, setPage] = useState(1);

    const { data: tv, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/on_the_air?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&region=US`,
        fetcher
    );
    if (error) return <p>Error: {error.message}</p>;
    return (
        <section className="section">
            <Head>
                <title>On Air TV Shows - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl font-black  text-gray-400">On Air</h1>
            <h4 className="text-xl font-semibold text-gray-200 pb-2">
                TV Shows
            </h4>
            {!tv && <ListLoader />}
            <MediaList media={tv!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default TVOnAir;
