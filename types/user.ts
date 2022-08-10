import { MediaData } from "./movie";

export type UserData = {
    avatar: {
        gravatar: {
            hash: string;
        };
        tmdb: {
            avatar_path: string;
        };
    };
    id: number;
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    include_adult: boolean;
    username: string;
};

export type MediaFavorites = {
    results: MediaData[];
};

export type MediaWatchList = {
    results: MediaData[];
};

export type AddFavorite = {
    media_type: string;
    media_id: number;
    favorite: boolean;
};

export type AddWatchlist = {
    media_type: string;
    media_id: number;
    watchlist: boolean;
};
