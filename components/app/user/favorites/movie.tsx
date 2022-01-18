import { FC } from "react";
import { KeyedMutator } from "swr";
import { MediaWatchList } from "../../../../types/user";
import CardMediaUser from "../card-user";
interface FavoriteMoviesProps {
    moviesFavorites: MediaWatchList;
    errorMoviesFavorites: any;
    mutateMovies: KeyedMutator<MediaWatchList>;
}

const FavoriteMovies: FC<FavoriteMoviesProps> = ({
    moviesFavorites,
    errorMoviesFavorites,
    mutateMovies,
}) => {
    if (!moviesFavorites) return <div>Loading...</div>;
    if (errorMoviesFavorites)
        return <div>Error: {errorMoviesFavorites.message}</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 my-5 ">
                {moviesFavorites.results.length > 0 ? (
                    moviesFavorites.results.map((movie) => (
                        <CardMediaUser
                            key={movie.id}
                            media={movie!}
                            mutate={mutateMovies}
                            media_type="movie"
                        />
                    ))
                ) : (
                    <div>No favorites movies</div>
                )}
            </div>
        </div>
    );
};

export default FavoriteMovies;
