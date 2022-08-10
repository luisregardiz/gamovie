export const discoverUrl = (
    media_type: string,
    list: string,
    page: number,
    vote_average_min: number,
    vote_average_max: number,
    genres: string,
    provider: string
) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/${media_type}/${list}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&region=US&include_adult=false&include_video=false&page=${page}&vote_average.gte=${vote_average_min}&vote_average.lte=${vote_average_max}&with_genres=${genres}&with_watch_providers=${provider}&watch_region=US&with_watch_monetization_types=flatrate`;

    return URL;
};
