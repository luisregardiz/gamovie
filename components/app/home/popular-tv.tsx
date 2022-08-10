import { FC } from 'react';
import useSWR from 'swr';
import { MediaData } from '../../../types/movie';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import MediaCard from '../card';
import fetcher from '../../../utils/fetcher';

SwiperCore.use([Pagination, Navigation]);
interface HomePopularTVShowsProps {}

const HomePopularTVShows: FC<HomePopularTVShowsProps> = () => {
    const { data: media, error } = useSWR<MediaData[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/tv/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        fetcher
    );
    if (!media) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <>
            {media.length > 0 && (
                <div className="py-5">
                    <h4 className=" text-2xl font-bold text-gray-400 ">
                        Popular TV Shows
                    </h4>
                    <Swiper
                        spaceBetween={30}
                        slidesPerView={2}
                        loop={true}
                        navigation={true}
                        breakpoints={{
                            '640': {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            '768': {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            '1024': {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                        }}
                        className=" mt-4 mySwiper "
                    >
                        {media.map((content) => (
                            <SwiperSlide key={content.id}>
                                <MediaCard media={content} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
};

export default HomePopularTVShows;
