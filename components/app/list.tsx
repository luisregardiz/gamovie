import { FC } from 'react';
import { MediaData } from '../../types/movie';
import MediaCard from './card';

interface MediaListProps {
    media: MediaData[];
}

const MediaList: FC<MediaListProps> = ({ media }) => {
    return (
        <>
            {media?.length > 0 ? (
                <div className="flex flex-wrap w-full gap-10 my-5 mx-auto justify-center ">
                    {media?.map((media) => (
                        <MediaCard key={media.id} media={media} />
                    ))}
                </div>
            ) : (
                <div className="my-5">
                    <h2 className="text-gray-200 font-medium text-lg">
                        No results found.{' '}
                    </h2>
                </div>
            )}
        </>
    );
};

export default MediaList;
