import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { TVDetail } from '../../types/tv';
import fetcherMovie from '../../utils/fetcherMovie';
import Head from 'next/head';
import Banner from '../../components/app/detail/banner';
import TVInfo from '../../components/app/detail/tv-info';
import AditionalInfoTV from '../../components/app/detail/aditional-info-tv';
import Cast from '../../components/app/detail/cast';
import YoutubeEmbed from '../../components/app/detail/youtube-embed';
import SeasonList from '../../components/app/detail/seasons/list';
import SimilarContent from '../../components/app/detail/similars';
import Recommendations from '../../components/app/detail/recomendations';
import DetailLoader from '../../components/loaders/detail';

interface TVShowProps {}

const TVShow: NextPage<TVShowProps> = () => {
    const router = useRouter();
    const { slug } = router.query;
    const newSlug = slug?.toString();

    const getId = newSlug?.split('-')[0];
    const { data: tv, error } = useSWR<TVDetail>(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/${getId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        fetcherMovie
    );
    if (!tv) return <DetailLoader />;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="min-h-screen bg-dark-100 px-2">
            <Head>
                <title>{tv.name} - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Banner media={tv!} />
            <TVInfo id={getId!} tv={tv!} />
            <div className="flex md:flex-row flex-col items-center justify-between bg-dark-200 p-5 rounded-lg shadow-lg gap-5 md:w-3/4 w-4/5 mx-auto  ">
                <Cast id={getId!} media_type="tv" />
                <AditionalInfoTV tv={tv!} />
            </div>
            <SeasonList tv={tv!} />
            <YoutubeEmbed id={getId!} media_type="tv" />
            <SimilarContent id={getId!} media_type="tv" />
            <Recommendations id={getId!} media_type="tv" />
        </section>
    );
};

export default TVShow;
