import { FC, useState } from "react";
import Image from "next/image";
import GamovieLogo from "../../../public/assets/images/Gamovie.png";
import {
    CalendarIcon,
    ClockIcon,
    ExternalLinkIcon,
} from "@heroicons/react/outline";
import WatchProvider from "./watch";
import moment from "moment";
import { MovieDetail, MediaIdProvider } from "../../../types/movie";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import AddFavorite from "./add-favorite";
import AddWatchList from "./add-watchlist";
import Link from "next/link";
interface MovieInfoProps {
    movie: MovieDetail;

    id: string;
}

const MovieInfo: FC<MovieInfoProps> = ({ movie, id }) => {
    const { data: provider, error: errorProvider } = useSWR<MediaIdProvider>(
        `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}/watch/providers?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
        fetcher
    );
    const [imageError, setImageError] = useState(false);
    const yearMovie = moment(movie?.release_date).format("YYYY");
    const runtimeHours = moment
        .utc()
        .startOf("day")
        .add(movie.runtime, "minutes")
        .format("h");
    const runtimeMinutes = moment
        .utc()
        .startOf("day")
        .add(movie.runtime, "minutes")
        .format("mm");

    return (
        <div className="my-5 flex md:flex-row flex-col">
            <div className="md:w-1/3 max-w-max mx-auto px-5 flex flex-col my-5 space-y-2">
                <Image
                    src={
                        imageError
                            ? GamovieLogo
                            : `${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${movie.poster_path}`
                    }
                    alt={movie.title}
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
                        <ClockIcon className="w-5 mr-2" />
                        {runtimeHours}H {runtimeMinutes}MIN
                    </span>
                </div>
            </div>
            <div className="md:w-3/4 w-full px-5">
                <h4 className=" text-gray-200 text-3xl font-bold flex items-center mb-2">
                    {movie.title}
                </h4>
                {movie.tagline && (
                    <span className="text-lg italic text-gray-500">
                        {movie.tagline}
                    </span>
                )}

                <div className="flex gap-3 flex-wrap my-2">
                    {movie.genres.map((genre) => (
                        <Link
                            href={`/category/movies/${genre.name.toLowerCase()}-${
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
                    <AddFavorite id={id} media_type="movie" />
                    <AddWatchList id={id} media_type="movie" />
                </div>

                <div className="my-5">
                    <h4 className="text-lg font-bold text-gray-200 mb-2">
                        Overview
                    </h4>
                    <p className="text-gray-400">{movie.overview}</p>
                </div>
                <div>
                    {movie.homepage && (
                        <a
                            href={movie.homepage}
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

export default MovieInfo;
