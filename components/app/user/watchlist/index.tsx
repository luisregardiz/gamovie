import { FC, useState } from 'react';
import useSWR, { SWRConfig } from 'swr';
import { useSessionId, useUserData } from '../../../../store/user';
import { MediaWatchList } from '../../../../types/user';
import fetcherMovie from '../../../../utils/fetcherMovie';
import WatchListMovies from './movie';
import WatchListTV from './tv';

interface WatchListProps {}

const WatchList: FC<WatchListProps> = () => {
    const [isMovie, setMovie] = useState(false);
    const sessionId = useSessionId((state) => state.sessionId);

    const userId = useUserData((state) => state.userId);
    const {
        data: watchListMovies,
        error: errorWatchListMovies,
        mutate: mutateMovies,
    } = useSWR<MediaWatchList>(
        `
    ${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`,
        fetcherMovie
    );

    const {
        data: watchListTv,
        error: errorWatchListTv,
        mutate: mutateTv,
    } = useSWR<MediaWatchList>(
        `
    ${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/watchlist/tv?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`,
        fetcherMovie
    );

    return (
        <>
            <h4 className=" text-gray-400 text-2xl font-black my-5">
                Watch List
            </h4>
            <div className="inline-flex bg-dark-200 items-center justify-center space-x-4 md:w-1/4 w-1/2 mx-auto py-3 rounded-3xl shadow-lg text-gray-400 mb-5">
                <button
                    onClick={() => setMovie(false)}
                    className={`font-bold text-sm ${
                        !isMovie &&
                        'bg-dark-300 text-gray-200 px-3 py-1 rounded-2xl text-sm'
                    }`}
                >
                    Movies
                </button>
                <button
                    onClick={() => setMovie(true)}
                    className={`font-bold text-sm ${
                        isMovie &&
                        'bg-dark-300 text-gray-200 px-2 py-1 rounded-2xl text-sm'
                    }`}
                >
                    TV Shows
                </button>
            </div>
            <SWRConfig>
                {!isMovie ? (
                    <WatchListMovies
                        watchListMovies={watchListMovies!}
                        errorWatchListMovies={errorWatchListMovies}
                        mutateMovies={mutateMovies}
                    />
                ) : (
                    <WatchListTV
                        watchListTv={watchListTv!}
                        errorWatchListTv={errorWatchListTv}
                        mutateTv={mutateTv}
                    />
                )}
            </SWRConfig>
        </>
    );
};

export default WatchList;
