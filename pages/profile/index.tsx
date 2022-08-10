import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Favorites from "../../components/app/user/favorites";

import InfoUser from "../../components/app/user/info";
import WatchList from "../../components/app/user/watchlist";

import { useSessionId, useUserData } from "../../store/user";
import { UserData } from "../../types/user";
import { fetcherUser } from "../../utils/fetcherUser";
interface ProfileProps {}

const Profile: NextPage<ProfileProps> = () => {
    const router = useRouter();
    const sessionId = useSessionId((state) => state.sessionId);
    const addUserId = useUserData((state) => state.addUserId);

    useEffect(() => {
        if (!sessionId) {
            router.push("/");
        }
    }, [router, sessionId]);

    const { data: userData, error } = useSWR<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL}/account?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
        fetcherUser
    );

    addUserId(userData?.id.toString()!);
    if (!userData) return <p>Loading...⌛</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <section className="section">
            <InfoUser userData={userData!} />
            <WatchList />
            <Favorites />
        </section>
    );
};

export default Profile;
