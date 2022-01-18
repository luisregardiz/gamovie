import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { useSessionId, useUserData } from "../../../store/user";
import { MediaFavorites } from "../../../types/user";
import { addFavorite } from "../../../utils/addFavorite";
import fetcherMovie from "../../../utils/fetcherMovie";

interface AddFavoriteProps {
    id: string;
    media_type: string;
}

const AddFavorite: FC<AddFavoriteProps> = ({ id, media_type }) => {
    const [favorite, setFavorite] = useState(false);
    const userId = useUserData((state) => state.userId);
    const sessionId = useSessionId((state) => state.sessionId);
    const movies = media_type === "movie" && "movies";
    const { data, error } = useSWR<MediaFavorites>(
        `
  ${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/favorite/${
            movies || media_type
        }?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
        }&session_id=${sessionId}&language=en-US&sort_by=created_at.asc&page=1`,
        fetcherMovie
    );

    useEffect(() => {
        if (data) {
            const isFavorite = data.results.find(
                (item) => item.id === Number(id)
            );

            setFavorite(!!isFavorite);
        }
    }, [data, id]);

    const handleFavorite = () => {
        const favoriteMovie = {
            media_type: media_type,
            media_id: Number(id),
            favorite: !favorite,
        };
        addFavorite(
            `${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
            favoriteMovie
        ).then((res) => {
            if (res?.data.status_code === 1) {
                toast("Added to favorites", {
                    icon: "❤",
                    style: {
                        borderRadius: "10px",
                        backgroundColor: "#0f172a",
                        color: "white",
                        fontWeight: "bold",
                    },
                });
            }

            setFavorite((prev) => !prev);
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
                            {favorite ? (
                                <HeartSolid className="h-6 w-6" />
                            ) : (
                                <HeartIcon className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AddFavorite;
