import ContentLoader from 'react-content-loader';

const DetailLoader = () => (
    <ContentLoader
        speed={2}
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        backgroundColor="#0f172a"
        foregroundColor="#262626"
    >
        <rect x="0" y="4" rx="0" ry="0" width="800" height="200" />
        <rect x="20" y="300" rx="0" ry="0" width="200" height="300" />
        <rect x="295" y="300" rx="0" ry="0" width="259" height="42" />
        <rect x="295" y="300" rx="0" ry="0" width="400" height="114" />
        <rect x="295" y="450" rx="0" ry="0" width="400" height="200" />
        <rect x="50" y="700" rx="0" ry="0" width="700" height="100" />
    </ContentLoader>
);

export default DetailLoader;
