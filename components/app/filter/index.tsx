import { ArrowCircleRightIcon, FilterIcon } from '@heroicons/react/outline';
import {
    ChangeEvent,
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useState,
} from 'react';
import useSWR from 'swr';
import { Filter, GenresMovie, Providers } from '../../../types/movie';
import fetcher from '../../../utils/fetcher';
import fetcherGenres from '../../../utils/fetcherGenres';
import GenresFilter from './genres';
import ProvidersFilter from './providers';
interface FilterMediaProps {
    setFilter: Dispatch<SetStateAction<Filter>>;
    media_type: string;
}

type SubmitEvent = FormEvent<HTMLFormElement>;
type InputEvent = ChangeEvent<HTMLInputElement>;

const FilterMedia: FC<FilterMediaProps> = ({ setFilter, media_type }) => {
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
    const [selectRate, setSelectRate] = useState(10);
    const [showFilters, setShowFilters] = useState(false);

    //Genres List
    const { data: genres, error: errorGenres } = useSWR<GenresMovie[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/genre/${media_type}/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        fetcherGenres
    );

    const handleChangeGenre = (id: number) => {
        //Verified checked values
        const currentIndex = selectedGenres.indexOf(id);
        const newChecked = [...selectedGenres];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedGenres(newChecked);
    };

    //Watch Provider
    const { data: providers, error: errorProvider } = useSWR<Providers[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/watch/providers/${media_type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&watch_region=US`,
        fetcher
    );

    const popularProviders = providers
        ?.filter((provider) => provider.display_priority <= 11)
        .filter((provider) => provider.provider_id !== 119);

    const handleChangeProvider = (id: number) => {
        const currentIndex = selectedProviders.indexOf(id);
        const newChecked = [...selectedProviders];

        if (currentIndex === -1) {
            newChecked.push(id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedProviders(newChecked);
    };

    //Rate user
    const handleRateUser = (ev: InputEvent) => {
        const { value } = ev.target;
        setSelectRate(parseInt(value));
    };

    const handleSubmitFilter = (ev: SubmitEvent) => {
        ev.preventDefault();
        setShowFilters(false);
        setFilter((prev) => ({
            ...prev,
            genres: selectedGenres,
            providers: selectedProviders,
            rate: selectRate,
        }));
    };

    return (
        <div>
            <div>
                <h4 className=" text-gray-400 font-bold uppercase mb-2">
                    Filter
                </h4>
                <div className="space-y-5">
                    <button
                        onClick={() => setShowFilters((prev) => !prev)}
                        className="px-4 py-2 text-sm rounded-xl shadow-lg bg-dark-200 text-gray-200 font-semibold flex items-center"
                    >
                        Filter movies
                        <ArrowCircleRightIcon className="w-5 ml-1" />
                    </button>
                    {showFilters && (
                        <form
                            onSubmit={(ev) => handleSubmitFilter(ev)}
                            className="bg-dark-200 bg-opacity-90 backdrop-filter backdrop-blur-md flex flex-col p-5 absolute z-20 rounded-xl shadow-xl md:w-1/2 w-3/4 space-y-5 "
                        >
                            <h4 className=" text-gray-400 font-bold uppercase">
                                Genres
                            </h4>
                            <GenresFilter
                                genres={genres!}
                                errorGenres={errorGenres}
                                handleChangeGenre={handleChangeGenre}
                                selectedGenres={selectedGenres}
                            />

                            <h4 className=" text-gray-400 font-bold uppercase">
                                Watch provider
                            </h4>
                            <ProvidersFilter
                                providers={providers!}
                                popularProviders={popularProviders!}
                                errorProvider={errorProvider}
                                handleChangeProvider={handleChangeProvider}
                                selectedProviders={selectedProviders}
                            />

                            <h4 className=" text-gray-400 font-bold uppercase">
                                Rate user
                            </h4>
                            <div className="flex flex-col mx-10">
                                <span className="text-gray-500 font-bold text-center text-lg">
                                    {selectRate * 10}%
                                </span>
                                <input
                                    type="range"
                                    name="rate_user"
                                    id="rate_user"
                                    min="0"
                                    max="10"
                                    value={selectRate}
                                    onChange={(ev) => handleRateUser(ev)}
                                    className="text-gray-900"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded-lg flex items-center justify-center bg-dark-100 font-semibold text-gray-200"
                            >
                                Filter
                                <FilterIcon className="w-4 ml-2" />
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterMedia;
