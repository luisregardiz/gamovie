import { FC, useState } from 'react';
import { TVDetail } from '../../../../types/tv';
import Image from 'next/image';
import GamovieLogo from '../../../../public/assets/images/Gamovie.png';
interface SeasonListProps {
    tv: TVDetail;
}

const SeasonList: FC<SeasonListProps> = ({ tv }) => {
    const [imageError, setImageError] = useState(false);
    return (
        <div className="flex flex-col items-start my-5">
            <h4 className="text-xl font-bold text-gray-400 ">Seasons</h4>
            <div className="flex flex-wrap gap-4 justify-center pt-5">
                {tv.seasons.map((season) => {
                    if (season.air_date)
                        return (
                            <div
                                key={season.id}
                                className="flex flex-col p-4 bg-dark-200 shadow-lg rounded-lg"
                            >
                                <Image
                                    src={
                                        imageError
                                            ? GamovieLogo
                                            : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${season.poster_path}`
                                    }
                                    alt={season.name}
                                    className="rounded-lg"
                                    height={200}
                                    width={150}
                                    onError={() => setImageError(true)}
                                    objectFit="cover"
                                />
                                <div className="flex flex-col">
                                    <h4 className=" text-gray-400 font-bold text-lg py-2">
                                        {season.name}
                                    </h4>
                                    <span className="text-sm font-semibold text-gray-200">
                                        Episodes: {season.episode_count}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-200">
                                        Air: {season.air_date}
                                    </span>
                                </div>
                            </div>
                        );
                })}
            </div>
        </div>
    );
};

export default SeasonList;
