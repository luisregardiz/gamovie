import { FC } from "react";
import HeroIMG from "../../public/assets/images/gmovieHero.jpg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { MovieInputSearch } from "../../types/movie";
import { useRouter } from "next/dist/client/router";
interface HeroProps {}

const Hero: FC<HeroProps> = () => {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<MovieInputSearch>();
    const handleSearch: SubmitHandler<MovieInputSearch> = (data) => {
        router.push(`/search/${data.name}`);
        reset();
    };
    return (
        <div className="relative rounded-xl flex my-5 md:h-60 h-60 z-10">
            <Image
                src={HeroIMG}
                alt="Hero"
                className="w-full rounded-xl"
                height={1100}
                objectFit="cover"
                priority
            />
            <div className="absolute text-white bg-gray-900 bg-opacity-60 backdrop-filter backdrop-blur-lg top-0 w-full h-full rounded-xl">
                <h1 className="md:text-3xl text-2xl font-bold md:px-20 px-5 py-10">
                    Find your favorite Movies, TV Shows and Actors
                </h1>
            </div>
            <div className="absolute top-1/2 w-full md:px-20 px-5 md:py-5 py-10">
                <form onSubmit={handleSubmit(handleSearch)}>
                    <div className="flex items-center bg-gray-900 hover:bg-gray-700 rounded-xl">
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full rounded-l-xl"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2  text-gray-200 font-bold"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Hero;
