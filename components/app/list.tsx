import { FC } from "react";
import { MediaData } from "../../types/movie";
import MediaCard from "./card";

interface MediaListProps {
    media: MediaData[];
}

const MediaList: FC<MediaListProps> = ({ media }) => {
    return (
        <>
            <div className="flex flex-wrap w-full gap-10 my-5 mx-auto justify-center ">
                {media?.map((media) => (
                    <MediaCard key={media.id} media={media} />
                ))}
            </div>
        </>
    );
};

export default MediaList;
