import { FC } from 'react';
import ContentLoader from 'react-content-loader';
import { useListSkeleton } from '../../hooks/useListSkeleton';

interface ListLoaderProps {}

const ListLoader: FC<ListLoaderProps> = () => {
    const { skeletonList } = useListSkeleton();

    return (
        <div className="flex flex-wrap">
            {skeletonList.map((skeleton) => (
                <ContentLoader
                    speed={2}
                    width={300}
                    height={500}
                    viewBox="0 0 400 500"
                    backgroundColor="#0f172a"
                    foregroundColor="#262626"
                    key={skeleton}
                >
                    <rect
                        x="11"
                        y="13"
                        rx="16"
                        ry="16"
                        width="280"
                        height="360"
                    />
                </ContentLoader>
            ))}
        </div>
    );
};

export default ListLoader;
