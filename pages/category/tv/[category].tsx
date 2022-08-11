import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';
import fetcher from '../../../utils/fetcher';
import MediaList from '../../../components/app/list';
interface TVShowCategoryProps {}

const TVShowCategory: NextPage<TVShowCategoryProps> = () => {
    const router = useRouter();
    const { category } = router.query;
    const categoryId = typeof category === 'string' && category?.split('-')[1];
    const categoryName =
        typeof category === 'string' && category?.split('-')[0];

    const { data: movies, error } = useSWR(
        `
           ${process.env.NEXT_PUBLIC_API_URL}/discover/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${categoryId}&with_watch_monetization_types=flatrate`,
        fetcher
    );

    return (
        <section className="section">
            <Head>
                <title>Results: {categoryName} - Movies - Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h2 className="text-2xl font-bold text-gray-400 capitalize">
                Results: {categoryName}
            </h2>
            <h4 className="text-lg font-bold text-gray-200 capitalize">
                TV Shows
            </h4>
            <div>
                {error && <p>Error: {error.message}</p>}
                <MediaList media={movies!} />
            </div>
        </section>
    );
};

export default TVShowCategory;
