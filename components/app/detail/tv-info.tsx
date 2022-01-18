import moment from "moment";
import { FC, useState } from "react";
import useSWR from "swr";
import { MediaIdProvider } from "../../../types/movie";
import { TVDetail } from "../../../types/tv";
import fetcher from "../../../utils/fetcher";
import Image from "next/image";
import GamovieLogo from "../../../public/assets/images/Gamovie.png";
import { CalendarIcon, ExternalLinkIcon } from "@heroicons/react/outline";
import WatchProvider from "./watch";
import AddFavorite from "./add-favorite";
import AddWatchList from "./add-watchlist";
import Link from "next/link";
interface TVInfoProps {
    tv: TVDetail;
    id: string;
}

const TVInfo: FC<TVInfoProps> = ({ tv, id }) => {
    const { data: provider, error: errorProvider } = useSWR<MediaIdProvider>(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        fetcher
    );
    const [imageError, setImageError] = useState(false);
    const yearMovie = moment(tv?.first_air_date).format("YYYY");

    return (
        <div className="my-5 flex md:flex-row flex-col">
            <div className="md:w-1/3 max-w-max mx-auto px-5 flex flex-col my-5 space-y-2">
                <Image
                    src={
                        imageError
                            ? GamovieLogo
                            : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${tv.poster_path}`
                    }
                    alt={tv.name}
                    className="rounded-xl shadow-xl object-contain md:object-cover"
                    onError={() => setImageError(true)}
                    height={300}
                    width={200}
                />
                <div className="flex flex-col">
                    <span className="flex items-center font-bold text-gray-400">
                        <CalendarIcon className="w-5 mr-2" />
                        {yearMovie}
                    </span>
                    <span className="flex items-center font-bold text-gray-400">
                        EPISODES {tv.number_of_episodes}
                    </span>
                </div>
            </div>
            <div className="md:w-3/4 w-full px-5">
                <h4 className=" text-gray-400 text-3xl font-bold flex items-center">
                    {tv.name}
                </h4>
                {tv.tagline && (
                    <span className="text-lg italic text-gray-500">
                        {tv.tagline}
                    </span>
                )}

                <div className="flex flex-wrap gap-3 my-2">
                    {tv.genres.map((genre) => (
                        <Link
                            href={`/category/tv/${genre.name.toLowerCase()}-${
                                genre.id
                            }`}
                            key={genre.id}
                        >
                            <a className="category-tag">{genre.name}</a>
                        </Link>
                    ))}
                </div>
                <div className="flex items-center space-x-4 mt-5">
                    {provider?.US?.flatrate && (
                        <WatchProvider
                            provider={provider!}
                            errorProvider={errorProvider}
                        />
                    )}
                    <AddFavorite id={id} media_type="tv" />
                    <AddWatchList id={id} media_type="tv" />
                </div>

                <div className="my-5">
                    <h4 className="text-lg font-bold text-gray-200 mb-2">
                        Overview
                    </h4>
                    <p className="text-gray-400">{tv.overview}</p>
                </div>
                <div>
                    {tv.homepage && (
                        <a
                            href={tv.homepage}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-oficial-page"
                        >
                            Official page
                            <ExternalLinkIcon className="w-4 ml-2" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TVInfo;
