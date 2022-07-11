import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

interface PaginationProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<PaginationProps> = ({ page, setPage }) => {
    useEffect(() => {
        if (page > 0) {
            window.scrollTo(0, 0);
        }
    }, [page]);
    return (
        <div className="self-center my-5 space-x-4 flex items-center">
            <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page <= 1 ? true : false}
                className={`${
                    page <= 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'cursor-pointer'
                }`}
            >
                <ChevronLeftIcon className="w-5 text-gray-500" />
            </button>
            <span className="bg-gray-900 px-3 py-1 rounded-lg shadow-lg inline-flex text-gray-200">
                {page}
            </span>
            <button onClick={() => setPage((prev) => prev + 1)}>
                <ChevronRightIcon className="w-5 text-gray-500" />
            </button>
        </div>
    );
};

export default Pagination;
