import { FC } from "react";
import useSWR from "swr";
import { MovieVideo } from "../../../types/movie";
import fetcher from "../../../utils/fetcher";

interface YoutubeEmbedProps {
    id: string;
    media_type: string;
}

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ id, media_type }) => {
    const { data: video, error } = useSWR<MovieVideo[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/${media_type}/${id}/videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`,
        fetcher
    );
    const findTrailer = video?.find(
        (trailer) =>
            trailer.type === "Trailer" &&
            trailer.official === true &&
            trailer.site === "YouTube"
    );

    if (!video) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            {findTrailer && (
                <div className="my-5">
                    <h4 className=" text-xl font-bold text-gray-400">
                        Trailer
                    </h4>
                    <div className="container-video my-5">
                        <iframe
                            src={`https://www.youtube.com/embed/${findTrailer?.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            className="video rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default YoutubeEmbed;
