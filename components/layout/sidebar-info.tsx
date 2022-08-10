import { SearchIcon, TrendingUpIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import useSWR from 'swr';
import { MediaData, MovieInputSearch } from '../../types/movie';
import fetcher from '../../utils/fetcher';
import CardMini from '../app/card-mini';
import Link from 'next/link';

interface SideInfoProps {}

const SideInfo: FC<SideInfoProps> = () => {
    const router = useRouter();

    const { register, handleSubmit, reset } = useForm<MovieInputSearch>();
    const handleSearch: SubmitHandler<MovieInputSearch> = (data) => {
        router.push(`/search/${data.name}`);
        reset();
    };
    const { data: movies, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/trending/movie/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=1`,
        fetcher
    );
    const limitMovies = movies?.slice(0, 3);

    return (
        <div className=" h-screen bg-dark-100 w-full sticky top-0 hidden lg:flex lg:flex-col py-10 px-8 ">
            <form onSubmit={handleSubmit(handleSearch)} className="my-5">
                <div className=" flex items-center px-4 rounded-xl mx-2 ">
                    <div className="bg-dark-200 h-10 flex items-center justify-center px-3 rounded-l-lg">
                        <SearchIcon className="w-5 text-gray-200 " />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        {...register('name', { required: true })}
                        className="border-0 bg-dark-300 text-gray-200 w-36 focus:ring-0 h-10 rounded-r-lg"
                    />
                </div>
            </form>
            <div className="flex items-center justify-between text-gray-400 mb-5">
                <h4 className="font-bold  text-xl">Trending</h4>
                <TrendingUpIcon className="w-5" />
            </div>
            {error && <p>Error: {error.message}</p>}
            <div className="space-y-5 mt-5 mb-10">
                {limitMovies &&
                    limitMovies.map((movies) => (
                        <CardMini key={movies.id} media={movies!} />
                    ))}
            </div>
            <Link href="/trending">
                <a className="px-4 py-2 bg-dark-200 hover:bg-dark-300 shadow-lg rounded-lg text-gray-200 font-bold text-center mx-4 hover:scale-105 transition-all ease-in-out duration-150 transform-gpu">
                    See more
                </a>
            </Link>
        </div>
    );
};

export default SideInfo;
