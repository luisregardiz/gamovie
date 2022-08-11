import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { MovieDetail } from '../../types/movie';
import fetcherMovie from '../../utils/fetcherMovie';
import 'react-circular-progressbar/dist/styles.css';
import Banner from '../../components/app/detail/banner';
import MovieInfo from '../../components/app/detail/movie-info';
import Head from 'next/head';
import AditionalInfo from '../../components/app/detail/aditional-info-movie';
import Cast from '../../components/app/detail/cast';
import YoutubeEmbed from '../../components/app/detail/youtube-embed';
import React from 'react';
import Recommendations from '../../components/app/detail/recomendations';
import SimilarContent from '../../components/app/detail/similars';
import DetailLoader from '../../components/loaders/detail';
import { url } from 'inspector';
interface MovieProps {}

const Movie: NextPage<MovieProps> = () => {
    const router = useRouter();
    const { slug } = router.query;
    const newSlug = slug?.toString();

    const getId = newSlug?.split('-')[0];

    const { data: movie, error } = useSWR<MovieDetail>(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${getId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        fetcherMovie
    );

    if (!movie) return <DetailLoader />;
    if (error) return <p>Error: {error.message}</p>;

    const srcBannerImage = `${process.env.NEXT_PUBLIC_IMAGE_ORIGINAL_URL}${movie?.backdrop_path}`;
    console.log(srcBannerImage);

    return (
        <div
            style={{
                backgroundImage: ` url(${srcBannerImage})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className="min-h-screen "
        >
            <div
                style={{ backdropFilter: 'blur(16px)' }}
                className="bg-dark-100 bg-opacity-90 "
            >
                <Head>
                    <title>{movie.title} - Gamovie</title>
                    <meta name="Gamovie" content="Movie app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <Banner media={movie!} />
                <MovieInfo movie={movie!} id={getId!} />
                <div className="flex md:flex-row flex-col items-center justify-between bg-dark-200 p-5 rounded-lg shadow-lg gap-5 md:w-3/4 w-4/5 mx-auto ">
                    <Cast id={getId!} media_type="movie" />
                    <AditionalInfo movie={movie!} />
                </div>

                <YoutubeEmbed id={getId!} media_type="movie" />
                <SimilarContent id={getId!} media_type="movie" />
                <Recommendations id={getId!} media_type="movie" />
            </div>
        </div>
    );
};

export default Movie;
