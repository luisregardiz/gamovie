import { FC } from 'react';
import { MovieDetail } from '../../../types/movie';

interface AditionalInfoProps {
    movie: MovieDetail;
}

const AditionalInfo: FC<AditionalInfoProps> = ({ movie }) => {
    const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    return (
        <div className=" space-y-4 text-right bg-dark-300 p-5 rounded-lg shadow-lg">
            <div>
                <h4 className="text-gray-300 font-bold text-right">Status</h4>
                <span className="text-gray-100 font-semibold text-sm">
                    {movie.status}
                </span>
            </div>
            <div>
                <h4 className="text-gray-300 font-bold">Original Language</h4>
                <span className="uppercase text-gray-100 font-semibold text-sm">
                    {movie.original_language}
                </span>
            </div>
            <div>
                <h4 className="text-gray-300  font-bold">Budget</h4>
                <span className="text-gray-100 font-semibold text-sm">
                    US{moneyFormatter.format(movie.budget)}
                </span>
            </div>
            <div>
                <h4 className="text-gray-300 font-bold">Revenue</h4>
                <span className="text-gray-100 font-semibold text-sm">
                    US{moneyFormatter.format(movie.revenue)}
                </span>
            </div>
        </div>
    );
};

export default AditionalInfo;
