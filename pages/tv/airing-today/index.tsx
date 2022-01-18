import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";
import MediaList from "../../../components/app/list";
import Pagination from "../../../components/app/pagination";
import ListLoader from "../../../components/loaders/list";
import { MediaData } from "../../../types/movie";
import fetcher from "../../../utils/fetcher";

interface TVAiringTodayProps {}

const TVAiringToday: NextPage<TVAiringTodayProps> = () => {
    const [page, setPage] = useState(1);

    const { data: tv, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/airing_today?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&region=US`,
        fetcher
    );
    if (error) return <p>Error: {error.message}</p>;
    return (
        <section className="section">
            <Head>
                <title>Airing Today TV Shows - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl font-black  text-gray-400">Airing Today</h1>
            <h4 className="text-xl font-semibold text-gray-200 pb-2">
                TV Shows
            </h4>
            {!tv && <ListLoader />}
            <MediaList media={tv!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default TVAiringToday;
