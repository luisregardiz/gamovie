import { FC } from "react";
import { KeyedMutator } from "swr";
import { MediaFavorites } from "../../../../types/user";
import CardMediaUser from "../card-user";
interface FavoriteTVShowsProps {
    tvFavorites: MediaFavorites;
    errorTvFavorites: any;
    mutateTv: KeyedMutator<MediaFavorites>;
}

const FavoriteTVShows: FC<FavoriteTVShowsProps> = ({
    tvFavorites,
    errorTvFavorites,
    mutateTv,
}) => {
    if (!tvFavorites) return <div>Loading...</div>;
    if (errorTvFavorites) return <div>Error: {errorTvFavorites.message}</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 my-5 ">
                {tvFavorites.results.length > 0 ? (
                    tvFavorites.results.map((tv) => (
                        <CardMediaUser
                            key={tv.id}
                            media={tv!}
                            mutate={mutateTv}
                            media_type="tv"
                        />
                    ))
                ) : (
                    <div>No favorites TV Shows</div>
                )}
            </div>
        </div>
    );
};

export default FavoriteTVShows;
