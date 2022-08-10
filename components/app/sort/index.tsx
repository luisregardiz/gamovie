import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

interface SortMoviesProps {
    setMovieSort: Dispatch<SetStateAction<string>>;
}

type SortValues = {
    name: string;
    value: string;
};

type SelectEvent = ChangeEvent<HTMLSelectElement>;
const SortMovies: FC<SortMoviesProps> = ({ setMovieSort }) => {
    const sortValues: SortValues[] = [
        { name: "Popularity", value: "popularity" },
        { name: "Release Date", value: "release_date" },
        { name: "Best Rate", value: "vote_average" },
        { name: "Most Voted", value: "vote_count" },
    ];

    const handleChangeSort = (ev: SelectEvent) => {
        const { value } = ev.target;
        setMovieSort(value);
    };

    return (
        <div>
            <h4 className=" text-gray-400 font-bold uppercase mb-2">
                Sort by:
            </h4>
            <form>
                <select
                    name="sort_movies"
                    id="sort_movies"
                    onChange={(ev) => handleChangeSort(ev)}
                    className="rounded-lg text-sm bg-gray-50 border-indigo-500"
                >
                    <option defaultValue="" disabled>
                        Select
                    </option>
                    {sortValues.map((values) => (
                        <option
                            key={values.value}
                            value={values.value}
                            className="bg-gray-50"
                        >
                            {values.name}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    );
};

export default SortMovies;
