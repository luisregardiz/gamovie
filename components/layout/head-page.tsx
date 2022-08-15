import Head from 'next/head';
import { FC } from 'react';

interface HeadPageProps {
    title?: string;
}

const HeadPage: FC<HeadPageProps> = ({ title }) => {
    return (
        <Head>
            <title>{title} | Gamovie</title>
            <meta name="Gamovie" content="Movie app" />
            <meta
                name="google-site-verification"
                content="dums6P0g3MMMf-QQus8JeFq_dywVMjjK5UO9DD17--M"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HeadPage;
