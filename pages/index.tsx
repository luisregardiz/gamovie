import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Hero from "../components/hero";
import { useSessionId } from "../store/user";
import { createSession } from "../utils/createSession";

const Home: NextPage = () => {
    const addSessionId = useSessionId((state) => state.addSessionId);
    const sessionId = useSessionId((state) => state.sessionId);
    useEffect(() => {
        const userSession = () => {
            const url: string = window.location.href;
            if (url.includes("denied")) {
                toast.error("You are not authorized to add a session");
                return;
            }
            if (!url.includes("request_token")) return;
            const token = url.split("=")[1].split("&")[0];
            createSession(token)
                .then((res) => {
                    if (!res?.data.success) return null;
                    addSessionId(res.data.session_id);

                    toast.success("Session added successfully");
                })
                .catch((err) => console.log(err));
        };
        userSession();
    }, [addSessionId, sessionId]);

    return (
        <div>
            <Head>
                <title>Gamovie</title>
                <meta name="Gamovie" content="Movie app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section className="section">
                <Hero />
            </section>
        </div>
    );
};

export default Home;
