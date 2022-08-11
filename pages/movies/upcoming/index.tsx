import type { NextPage } from 'next';
import { useState } from 'react';
import useSWR from 'swr';
import Head from 'next/head';
import MediaList from '../../../components/app/list';
import Pagination from '../../../components/app/pagination';
import { MediaData } from '../../../types/movie';
import fetcher from '../../../utils/fetcher';
import ListLoader from '../../../components/loaders/list';

interface UpcomingMoviesProps {}

const UpcomingMovies: NextPage<UpcomingMoviesProps> = () => {
    const [page, setPage] = useState(1);

    const { data: movies, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&page=${page}&region=US`,
        fetcher
    );
    if (error) return <p>Error: {error.message}</p>;
    return (
        <section className="section">
            <Head>
                <title>Upcoming Movies - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="lg:text-4xl text-2xl font-black  text-gray-400">
                Upcoming
            </h1>
            <h4 className="lg:text-xl text-lg font-semibold text-gray-200 pb-2">
                Movies
            </h4>
            {!movies && <ListLoader />}
            <MediaList media={movies!} />
            <Pagination page={page} setPage={setPage} />
        </section>
    );
};

export default UpcomingMovies;
