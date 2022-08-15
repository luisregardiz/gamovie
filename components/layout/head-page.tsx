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
                content="googlef39040b68b993f87.html"
            />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
};

export default HeadPage;
