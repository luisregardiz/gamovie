import { FC } from "react";
import useSWR from "swr";
import { MediaIdProvider } from "../../../types/movie";
import fetcher from "../../../utils/fetcher";
import Image from "next/image";
import {
    ChevronRightIcon,
    ClipboardListIcon,
    HeartIcon,
} from "@heroicons/react/outline";
interface WatchProviderProps {
    provider: MediaIdProvider;
    errorProvider: {
        message: string;
    };
}

const WatchProvider: FC<WatchProviderProps> = ({ provider, errorProvider }) => {
    if (errorProvider) return <p>Error: {errorProvider.message}</p>;

    const { logo_path, provider_name } = provider?.US?.flatrate[0];
    const { link } = provider?.US;

    return (
        <>
            {logo_path && (
                <div>
                    <a
                        href={link}
                        rel="noreferrer"
                        target="_blank"
                        className="btn-provider"
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${logo_path}`}
                            alt={provider_name}
                            className="rounded-lg shadow-lg"
                            height={35}
                            width={35}
                        />
                        <span className="text-gray-50 font-bold ml-3">
                            Watch now
                        </span>
                        <ChevronRightIcon className="w-5 text-gray-50" />
                    </a>
                </div>
            )}
        </>
    );
};

export default WatchProvider;
