import { FC, useState } from 'react';
import Image from 'next/image';
import { MovieDetail } from '../../../types/movie';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { getColorVote } from '../../../utils/getColorVote';
import { nFormatter } from '../../../utils/nFormatter';
import GamovieLogo from '../../../public/assets/images/Gamovie.png';
import { TVDetail } from '../../../types/tv';
import { ChevronLeftIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';

interface BannerProps {
    media: TVDetail | MovieDetail;
}

const Banner: FC<BannerProps> = ({ media }) => {
    const router = useRouter();
    const [imageError, setImageError] = useState(false);
    const votePercentage = Number((media?.vote_average * 10).toFixed(0));

    const srcBannerImage = imageError
        ? GamovieLogo
        : `${process.env.NEXT_PUBLIC_IMAGE_ORIGINAL_URL}${media?.backdrop_path}`;
    return (
        <div className="relative flex h-60 ">
            <Image
                src={srcBannerImage}
                alt={media.id.toString()}
                className="rounded-b-3xl"
                onError={() => setImageError(true)}
                height={400}
                width={1000}
                objectFit="cover"
                priority
            />
            <div className="bg-gradient-to-b from-transparent to-black absolute  top-0 w-full h-full rounded-3xl">
                <div className="w-14 absolute bottom-10 left-10 flex items-center">
                    <CircularProgressbar
                        value={votePercentage}
                        text={`${votePercentage}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: '#131313',
                            textColor: '#fff',
                            textSize: '1.3rem',
                            pathColor: getColorVote(media.vote_average),
                            trailColor: 'transparent',
                        })}
                        className="w-8 font-bold"
                    />
                </div>
                <div className="absolute bottom-12 left-24 ml-2 flex flex-col">
                    <span className="text-gray-200 uppercase font-bold inline-flex">
                        {nFormatter(media.vote_count, 2)} Votes
                    </span>
                    <span className="text-gray-400 uppercase font-bold text-xs ">
                        Popularity: {nFormatter(media.popularity, 1)}
                    </span>
                </div>
                {media?.production_companies[0]?.logo_path && (
                    <div className="bg-gray-200 inline-flex w-20 px-2 py-1 rounded-lg absolute right-10 bottom-10">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${media.production_companies[0].logo_path}`}
                            alt={media.production_companies[0].name}
                            height="100%"
                            width={200}
                            objectFit="contain"
                            priority
                        />
                    </div>
                )}
                <div className="m-5">
                    <button
                        onClick={() => router.back()}
                        className="p-4 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-full"
                    >
                        <ChevronLeftIcon className="text-gray-50 h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;
