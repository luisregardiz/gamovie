import { useEffect, useState } from "react";

export const useListSkeleton = () => {
    const [skeletonList, setSkeletonList] = useState<number[]>([]);
    useEffect(() => {
        for (let i = 0; i < 20; i++) {
            setSkeletonList((prev) => [...prev, i]);
        }
    }, []);

    return { skeletonList };
};
