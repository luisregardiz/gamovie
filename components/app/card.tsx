import { FC, useState } from 'react';
import { MediaData } from '../../types/movie';
import Image from 'next/image';
import moment from 'moment';
import { useRouter } from 'next/router';
import { getColorVote } from '../../utils/getColorVote';
import GamovieLogo from '../../public/assets/images/Gamovie.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import Link from 'next/link';
interface MovieCardProps {
    media: MediaData;
}

const MediaCard: FC<MovieCardProps> = ({ media }) => {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);
    const {
        id,
        title,
        poster_path,
        vote_average,
        release_date,
        name,
        first_air_date,
    } = media;

    const releaseDateFormat = moment(release_date).format('LL');
    const firstAirDateFormat = moment(first_air_date).format('LL');
    const votePercentage = vote_average * 10;
    const titleFormated = title?.replace(/[/\s+/]/g, '-');
    const nameFormated = name?.replace(/[/\s+/]/g, '-');
    const slug = `${id}-${titleFormated || nameFormated}`;

    const mediaType = name ? 'tv' : 'movies';

    return (
        <Link href={`/${mediaType}/${slug.toLowerCase()}`}>
            <a className="flex flex-col   cursor-pointer relative min-w-max">
                <Image
                    src={
                        imageError
                            ? GamovieLogo
                            : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${poster_path}`
                    }
                    alt={title || name}
                    onError={() => setImageError(true)}
                    className="rounded-xl"
                    objectFit="cover"
                    width={200}
                    height={300}
                    priority
                />
                <div className="p-4 flex flex-col w-full absolute bottom-0 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-b-xl  ">
                    <span className="font-semibold text-gray-300 text-sm mb-1">
                        {title && title}
                        {name && name}
                    </span>
                    <span className="text-xs italic text-gray-400 ">
                        {title && releaseDateFormat}
                        {name && firstAirDateFormat}
                    </span>
                </div>

                <div className="w-10 absolute top-4 right-4">
                    <CircularProgressbar
                        value={votePercentage}
                        text={`${votePercentage.toFixed(0)}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: '#131313',
                            textColor: '#fff',
                            textSize: '1.7rem',
                            pathColor: getColorVote(vote_average),
                            trailColor: 'transparent',
                        })}
                        className="w-8"
                    />
                </div>
            </a>
        </Link>
    );
};

export default MediaCard;
