import { FC } from 'react';
import { GenresMovie } from '../../../types/movie';

interface GenresFilterProps {
    genres: GenresMovie[];
    errorGenres: {
        message: string;
    };
    handleChangeGenre: (id: number) => void;
    selectedGenres: number[];
}

const GenresFilter: FC<GenresFilterProps> = ({
    genres,
    errorGenres,
    handleChangeGenre,
    selectedGenres,
}) => {
    return (
        <div className="flex flex-wrap gap-4">
            {errorGenres && <p>Error: {errorGenres.message}</p>}
            {!genres && <p>Loading...</p>}
            {genres?.map((genre) => (
                <div
                    key={genre.id}
                    className="space-x-2 bg-dark-100 text-gray-200 px-3 py-1 flex items-center text-sm rounded-lg  font-semibold"
                >
                    <input
                        type="checkbox"
                        id={genre.name}
                        name={genre.name}
                        value={genre.id}
                        onChange={() => handleChangeGenre(genre.id)}
                        checked={
                            selectedGenres.indexOf(genre.id) === -1
                                ? false
                                : true
                        }
                        className="rounded focus:text-gray-900 bg-gray-800 focus:ring-0 border-0 "
                    />
                    <label htmlFor={genre.name} className="cursor-pointer ">
                        {genre.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default GenresFilter;
