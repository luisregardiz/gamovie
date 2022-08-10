import { FC } from 'react';
import { TVDetail } from '../../../types/tv';
import Image from 'next/image';
interface AditionalInfoTVProps {
    tv: TVDetail;
}

const AditionalInfoTV: FC<AditionalInfoTVProps> = ({ tv }) => {
    return (
        <div className="space-y-4 text-right bg-dark-300 p-5 rounded-lg shadow-lg">
            <div className="px-4">
                <h4 className="text-gray-300 font-bold">Status</h4>
                <span className="text-gray-100 font-semibold text-sm">
                    {tv.status}
                </span>
            </div>
            <div className="px-4">
                <h4 className="text-gray-300 font-bold">Original Language</h4>
                <span className="uppercase text-gray-100 font-semibold text-sm">
                    {tv.original_language}
                </span>
            </div>
            <div className="px-4">
                <h4 className="text-gray-300 font-bold">Type</h4>
                <span className="text-gray-100 font-semibold text-sm">
                    {tv.type}
                </span>
            </div>
            <div className="px-4">
                <h4 className="text-gray-300 font-bold">Networks</h4>
                <ul>
                    {tv.networks.map((network) => (
                        <li
                            className="text-gray-100 font-semibold text-sm"
                            key={network.id}
                        >
                            {network.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AditionalInfoTV;
