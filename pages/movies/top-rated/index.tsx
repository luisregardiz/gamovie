import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import { Filter, MediaData } from '../../../types/movie';
import fetcher from '../../../utils/fetcher';
import Head from 'next/head';
import MediaList from '../../../components/app/list';
import Pagination from '../../../components/app/pagination';
import FilterMedia from '../../../components/app/filter';
import { discoverUrl } from '../../../utils/discoverUrl';
import ListLoader from '../../../components/loaders/list';
interface TopRatedMoviesProps {}

const TopRatedMovies: NextPage<TopRatedMoviesProps> = () => {
    const initialState: Filter = {
        genres: [],
        providers: [],
        rate: 10,
    };
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState(initialState);

    const providers = filter.providers.join(', ');
    const genres = filter.genres.join(', ');

    const { data: movies, error } = useSWR<MediaData[]>(
        discoverUrl(
            'movie',
            'top_rated',
            page,
            0,
            filter.rate,
            genres,
            providers
        ),
        fetcher
    );

    return (
        <section className="section">
            <Head>
                <title>Popular Movies - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="lg:text-4xl text-2xl font-black pb-4 text-gray-400">
                Top Rated Movies
            </h1>
            <div className="flex items-center justify-between">
                <FilterMedia setFilter={setFilter} media_type="movie" />
            </div>
            {error && <p>Error: {error.message}</p>}
            {!movies && <ListLoader />}
            <MediaList media={movies!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default TopRatedMovies;
