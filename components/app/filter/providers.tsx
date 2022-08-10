import { FC } from 'react';
import { Providers } from '../../../types/movie';
import Image from 'next/image';
interface ProvidersFilterProps {
    providers: Providers[];
    errorProvider: {
        message: string;
    };
    popularProviders: Providers[];
    handleChangeProvider: (id: number) => void;
    selectedProviders: number[];
}

const ProvidersFilter: FC<ProvidersFilterProps> = ({
    errorProvider,
    providers,
    popularProviders,
    handleChangeProvider,
    selectedProviders,
}) => {
    return (
        <div className="flex flex-wrap gap-4">
            {errorProvider && <p>Error: {errorProvider.message}</p>}
            {!providers && <p>Loading...</p>}
            {popularProviders?.map((provider: Providers) => (
                <div
                    key={provider.provider_id}
                    className="space-x-2 flex flex-row-reverse items-center text-sm rounded-lg  font-semibold"
                >
                    <label
                        htmlFor={provider.provider_name}
                        className="cursor-pointer ml-2 "
                    >
                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_MEDIUM_URL}${provider.logo_path}`}
                            alt={provider.provider_name}
                            className="rounded-lg"
                            width={40}
                            height={40}
                            priority
                        />
                    </label>
                    <input
                        type="checkbox"
                        id={provider.provider_name}
                        name={provider.provider_name}
                        value={provider.provider_id}
                        onChange={() =>
                            handleChangeProvider(provider.provider_id)
                        }
                        checked={
                            selectedProviders.indexOf(provider.provider_id) ===
                            -1
                                ? false
                                : true
                        }
                        className="rounded focus:text-dark-200 bg-dark-300 focus:ring-0 border-0 "
                    />
                </div>
            ))}
        </div>
    );
};

export default ProvidersFilter;
