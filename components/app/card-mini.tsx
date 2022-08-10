import moment from 'moment';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { MediaData } from '../../types/movie';
import Image from 'next/image';
import GamovieLogo from '../../public/assets/images/Gamovie.png';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getColorVote } from '../../utils/getColorVote';
interface CardMiniProps {
    media: MediaData;
}

const CardMini: FC<CardMiniProps> = ({ media }) => {
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

    const releaseYearFormat = moment(release_date).format('YYYY');
    const firstAirYearFormat = moment(first_air_date).format('YYYY');
    const votePercentage = vote_average * 10;
    const titleFormated = title?.replace(/[/\s+/]/g, '-');
    const nameFormated = name?.replace(/[/\s+/]/g, '-');
    const slug = `${id}-${titleFormated || nameFormated}`;

    const mediaType = name ? 'tv' : 'movies';

    return (
        <div
            onClick={() => router.push(`/${mediaType}/${slug.toLowerCase()}`)}
            className=" rounded-xl flex cursor-pointer relative bg-dark-200"
        >
            <Image
                src={
                    imageError
                        ? GamovieLogo
                        : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${poster_path}`
                }
                alt={title}
                onError={() => setImageError(true)}
                className="rounded-lg"
                objectFit="cover"
                width={140}
                height={200}
                priority
            />
            <div className="p-4 flex flex-col w-52 ">
                <span className="font-semibold text-sm text-gray-200 mb-2">
                    {title && title}
                    {name && name}
                </span>
                <span className="text-sm italic text-gray-400 ">
                    {releaseYearFormat || firstAirYearFormat}
                </span>
            </div>
            <div className="w-10 absolute bottom-4 right-4">
                <CircularProgressbar
                    value={votePercentage}
                    text={`${votePercentage.toFixed(0)}%`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: '#131313',
                        textColor: '#fff',
                        textSize: '1.5rem',
                        pathColor: getColorVote(vote_average),
                        trailColor: 'transparent',
                    })}
                    className="w-8"
                />
            </div>
        </div>
    );
};

export default CardMini;
