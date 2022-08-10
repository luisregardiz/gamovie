import { FC } from 'react';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/outline';
import fetcherMovie from '../../../utils/fetcherMovie';
import useSWR from 'swr';
import { MovieCast } from '../../../types/movie';

interface CastProps {
    id: string;
    media_type: string;
}

const Cast: FC<CastProps> = ({ id, media_type }) => {
    const { data: cast, error: errorCast } = useSWR<MovieCast>(
        `${process.env.NEXT_PUBLIC_API_URL}/${media_type}/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        fetcherMovie
    );
    const limitCast = cast?.cast?.slice(0, 5);
    const findDirector = cast?.crew.find((person) => person.job === 'Director');
    if (!cast) return <p>Loading...</p>;
    if (errorCast) return <p>Error: {errorCast.message}</p>;

    return (
        <div>
            <h4 className=" font-bold text-gray-400 mb-2">Cast</h4>
            <div className="flex flex-col space-y-5 divide-y-2 divide-gray-800 ">
                {limitCast?.map((actors) => (
                    <div
                        key={actors.id}
                        className="flex items-center min-w-max pt-4 space-x-4"
                    >
                        {actors.profile_path ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${actors.profile_path}`}
                                alt={actors.name}
                                className="rounded-2xl shadow-lg"
                                height={50}
                                width={50}
                                objectFit="cover"
                                priority
                            />
                        ) : (
                            <div className="bg-gray-700 h-12 w-12 rounded-2xl flex items-center justify-center">
                                <UserIcon className="w-6 text-gray-50" />
                            </div>
                        )}

                        <div className="flex flex-col">
                            <span className="font-bold text-gray-400">
                                {actors.name}
                            </span>
                            <span className="text-sm text-gray-200 font-semibold">
                                {actors.character}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {findDirector && (
                <div className="mt-5">
                    <h4 className="font-bold text-gray-400 mb-2">Director</h4>
                    <div className="flex items-center  space-x-4 py-4">
                        {findDirector?.profile_path ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${findDirector?.profile_path}`}
                                alt={findDirector?.name}
                                className="rounded-2xl shadow-lg"
                                height={50}
                                width={50}
                                objectFit="cover"
                            />
                        ) : (
                            <div className="bg-gray-700 h-12 w-12 rounded-2xl flex items-center justify-center">
                                <UserIcon className="w-6 text-gray-50" />
                            </div>
                        )}

                        <div className="flex flex-col">
                            <span className="font-bold text-gray-400">
                                {findDirector?.name}
                            </span>
                            <span className="text-sm text-gray-200 font-semibold">
                                {findDirector?.job}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cast;
