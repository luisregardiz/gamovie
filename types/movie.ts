export type MovieInputSearch = {
    name: string;
};
export type Filter = {
    genres: number[];
    providers: number[];
    rate: number;
};

export type MediaData = {
    id: number;
    media_type: string;
    first_air_date: string;
    budget: number;
    original_language: string;
    original_title: string;
    original_name: string;
    overview: string;
    genre_ids: number[];
    poster_path: string;
    title: string;
    name: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    revenue: number;
};

export type GenresMovie = {
    id: number;
    name: string;
};

export type Genres = {
    genres: GenresMovie[];
};

export type Providers = {
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
};

export type MovieDetail = {
    backdrop_path: string;
    budget: number;
    genres: GenresMovie[];
    homepage: string;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [
        {
            id: number;
            logo_path: string;
            name: string;
            origin_country: string;
        }
    ];
    production_countries: [
        {
            iso_3166_1: string;
            name: string;
        }
    ];
    release_date: string;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
};

export type MediaIdProvider = {
    US: {
        link: string;
        flatrate: [
            {
                display_priority: number;
                logo_path: string;
                provider_id: number;
                provider_name: string;
            }
        ];
        buy: [
            {
                display_priority: number;
                logo_path: string;
                provider_id: number;
                provider_name: string;
            }
        ];
    };
};

export type MovieCast = {
    cast: [
        {
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            cast_id: number;
            character: string;
            credit_id: string;
            order: number;
        }
    ];
    crew: [
        {
            adult: boolean;
            gender: number;
            id: number;
            known_for_department: string;
            name: string;
            original_name: string;
            popularity: number;
            profile_path: string;
            credit_id: string;
            department: string;
            job: string;
        }
    ];
};

export type MovieVideo = {
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
};
