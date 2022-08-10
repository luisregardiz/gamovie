import { FC } from "react";
import { KeyedMutator } from "swr";
import { MediaWatchList } from "../../../../types/user";
import CardMediaUser from "../card-user";
interface WatchListTVProps {
    watchListTv: MediaWatchList;
    errorWatchListTv: any;
    mutateTv: KeyedMutator<MediaWatchList>;
}

const WatchListTV: FC<WatchListTVProps> = ({
    watchListTv,
    errorWatchListTv,
    mutateTv,
}) => {
    if (!watchListTv) return <div>Loading...</div>;
    if (errorWatchListTv) return <div>Error: {errorWatchListTv.message}</div>;

    return (
        <div>
            <div className="flex flex-wrap gap-4 my-5 ">
                {watchListTv.results.length > 0 ? (
                    watchListTv.results.map((tv) => (
                        <CardMediaUser
                            key={tv.id}
                            media={tv!}
                            mutate={mutateTv}
                            media_type="tv"
                        />
                    ))
                ) : (
                    <div>No watchlist TV Shows</div>
                )}
            </div>
        </div>
    );
};

export default WatchListTV;
