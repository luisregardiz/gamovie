import { FC } from "react";
import { KeyedMutator } from "swr";
import { MediaFavorites } from "../../../../types/user";
import CardMediaUser from "../card-user";
interface WatchListMoviesProps {
    watchListMovies: MediaFavorites;
    errorWatchListMovies: any;
    mutateMovies: KeyedMutator<MediaFavorites>;
}

const WatchListMovies: FC<WatchListMoviesProps> = ({
    watchListMovies,
    errorWatchListMovies,
    mutateMovies,
}) => {
    if (!watchListMovies) return <div>Loading...</div>;
    if (errorWatchListMovies)
        return <div>Error: {errorWatchListMovies.message}</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 my-5 ">
                {watchListMovies.results.length > 0 ? (
                    watchListMovies.results.map((movie) => (
                        <CardMediaUser
                            key={movie.id}
                            media={movie!}
                            mutate={mutateMovies}
                            media_type="movie"
                        />
                    ))
                ) : (
                    <div>No watchlist movies</div>
                )}
            </div>
        </div>
    );
};

export default WatchListMovies;
