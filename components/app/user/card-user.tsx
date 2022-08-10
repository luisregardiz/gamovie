import { XIcon } from '@heroicons/react/outline';
import { FC, useState } from 'react';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { MediaData } from '../../../types/movie';
import { getColorVote } from '../../../utils/getColorVote';
import GamovieLogo from '../../../public/assets/images/Gamovie.png';
import 'react-circular-progressbar/dist/styles.css';
import Image from 'next/image';
import moment from 'moment';
import { addFavorite } from '../../../utils/addFavorite';
import { useSessionId, useUserData } from '../../../store/user';
import toast from 'react-hot-toast';
import { KeyedMutator } from 'swr';
import { MediaFavorites } from '../../../types/user';
import Link from 'next/link';
interface CardMediaUserProps {
    media: MediaData;
    mutate: KeyedMutator<MediaFavorites>;
    media_type: string;
}

const CardMediaUser: FC<CardMediaUserProps> = ({
    media,
    mutate,
    media_type,
}) => {
    const [imageError, setImageError] = useState(false);
    const userId = useUserData((state) => state.userId);
    const sessionId = useSessionId((state) => state.sessionId);
    const titleFormated = media.title?.replace(/[/\s+/]/g, '-');
    const nameFormated = media.name?.replace(/[/\s+/]/g, '-');
    const slug = `${media.id}-${titleFormated || nameFormated}`;

    const mediaType = media.name ? 'tv' : 'movies';

    const handleFavorite = () => {
        const favoriteMovie = {
            media_type: media_type,
            media_id: Number(media.id),
            favorite: false,
        };
        addFavorite(
            `${process.env.NEXT_PUBLIC_API_URL}/account/${userId}/favorite?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
            favoriteMovie
        ).then((res) => {
            if (res?.data.status_code === 13) {
                toast('Removed to favorites', {
                    icon: '🗑',
                    style: {
                        borderRadius: '10px',
                        backgroundColor: '#6366f1',
                        color: 'white',
                        fontWeight: 'bold',
                    },
                });
                mutate();
            }
        });
    };

    const votePercentage = media.vote_average * 10;
    const dateFormated = media.name
        ? moment(media.first_air_date).format('YYYY')
        : moment(media.release_date).format('YYYY');
    return (
        <div
            key={media.id}
            className="flex relative shadow-lg  rounded-lg p-4 w-full bg-dark-200 text-gray-200"
        >
            <Image
                src={
                    imageError
                        ? GamovieLogo
                        : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${media.poster_path}`
                }
                alt={media.title || media.name}
                onError={() => setImageError(true)}
                className="rounded-xl "
                objectFit="cover"
                width={120}
                height={150}
                priority
            />
            <div className="flex flex-1   mx-4">
                <div className="my-2 space-y-2">
                    <Link href={`/${mediaType}/${slug.toLowerCase()}`}>
                        <a className="hover:text-gray-200 text-gray-400 transition-all ease-in-out duration-150">
                            <h4 className="font-bold text-lg">
                                {media.title || media.name}
                                <span className="text-sm italic ml-2">
                                    ({dateFormated})
                                </span>
                            </h4>
                        </a>
                    </Link>

                    <div>
                        <p className="">
                            {media.overview.slice(0, 150) + '...'}
                        </p>
                    </div>
                </div>

                <div className="w-8 absolute top-6 left-6">
                    <CircularProgressbar
                        value={votePercentage}
                        text={`${votePercentage.toFixed(0)}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: '#131313',
                            textColor: '#fff',
                            textSize: '1.7rem',
                            pathColor: getColorVote(media.vote_average),
                            trailColor: 'transparent',
                        })}
                        className="w-8"
                    />
                </div>
            </div>
            {/* <div className=" ">
                <div className="flex flex-col items-center  space-y-2 my-2">
                    <div>
                        <button
                            onClick={handleFavorite}
                            className="text-gray-400 border-2 border-gray-700 rounded-full h-8 w-8 flex items-center justify-center hover:bg-dark-300 hover:text-gray-200 "
                        >
                            <XIcon className="w-5" />
                        </button>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default CardMediaUser;
