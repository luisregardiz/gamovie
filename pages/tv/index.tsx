import type { NextPage } from "next";
import { useState } from "react";
import useSWR from "swr";
import FilterMedia from "../../components/app/filter";
import MediaList from "../../components/app/list";
import Pagination from "../../components/app/pagination";
import { Filter, MediaData } from "../../types/movie";
import { discoverUrl } from "../../utils/discoverUrl";
import Head from "next/head";
import fetcher from "../../utils/fetcher";
import ListLoader from "../../components/loaders/list";

interface PopularTVProps {}

const PopularTV: NextPage<PopularTVProps> = () => {
    const initialState: Filter = {
        genres: [],
        providers: [],
        rate: 10,
    };
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(initialState);

    const providers = filter.providers.join(", ");
    const genres = filter.genres.join(", ");

    const { data: tv, error } = useSWR<MediaData[]>(
        discoverUrl("tv", "popular", page, 0, filter.rate, genres, providers),
        fetcher
    );

    return (
        <section className="section">
            <Head>
                <title>Popular TV Shows - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="text-4xl font-black pb-4 text-gray-400">
                Popular TV Shows
            </h1>
            <div className="flex items-center justify-between">
                <FilterMedia setFilter={setFilter} media_type="tv" />
            </div>
            {error && <p>Error: {error.message}</p>}
            {!tv && <ListLoader />}
            <MediaList media={tv!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default PopularTV;
