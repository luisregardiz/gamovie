import { ClipboardListIcon } from "@heroicons/react/outline";
import { ClipboardListIcon as ClipboardListIconSolid } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { useSessionId, useUserData } from "../../../store/user";
import { MediaFavorites, MediaWatchList } from "../../../types/user";
import { addWatchlist } from "../../../utils/addWatchlist";
import fetcherMovie from "../../../utils/fetcherMovie";

interface AddWatchListProps {
    id: string;
    media_type: string;
}

const AddWatchList: FC<AddWatchListProps> = ({ id, media_type }) => {
    const [watchList, setwatchList] = useState(false);
    const userId = useUserData((state) => state.userId);
    const sessionId = useSessionId((state) => state.sessionId);
    const movies = media_type === "movie" && "movies";
    const { data, error } = useSWR<MediaWatchList>(
        `
  ${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/watchlist/${movies}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`,
        fetcherMovie
    );

    useEffect(() => {
        if (data) {
            const isWatchList = data.results.find(
                (item) => item.id === Number(id)
            );

            setwatchList(!!isWatchList);
        }
    }, [data, id]);

    const handleFavorite = () => {
        const mediaWatchList = {
            media_type: media_type,
            media_id: Number(id),
            watchlist: !watchList,
        };
        addWatchlist(
            `${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/watchlist?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
            mediaWatchList
        ).then((res) => {
            if (res?.data.status_code === 1) {
                toast("Added to watchlist", {
                    icon: "❤",
                    style: {
                        borderRadius: "10px",
                        backgroundColor: "#0f172a",
                        color: "white",
                        fontWeight: "bold",
                    },
                });
            }

            setwatchList((prev) => !prev);
        });
    };
    return (
        <div className="flex items-center space-x-4">
            {sessionId && (
                <>
                    <div>
                        <button
                            onClick={handleFavorite}
                            className="text-gray-400 border border-gray-400 rounded-full h-10 w-10 flex items-center justify-center "
                        >
                            {watchList ? (
                                <ClipboardListIconSolid className="h-6 w-6" />
                            ) : (
                                <ClipboardListIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddWatchList;
