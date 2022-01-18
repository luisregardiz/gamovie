export type TVDetail = {
    backdrop_path: string;
    first_air_date: string;
    genres: [
        {
            id: number;
            name: string;
        }
    ];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: [string];
    last_air_date: string;
    name: string;
    networks: [
        {
            name: string;
            id: number;
            logo_path: string;
        }
    ];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: [string];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
        }
    ];
    seasons: [
        {
            air_date: string;
            episode_count: number;
            id: number;
            name: string;
            overview: string;
            poster_path: string;
            season_number: number;
        }
    ];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
};
