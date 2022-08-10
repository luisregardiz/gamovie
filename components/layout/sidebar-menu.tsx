import {
    ChevronRightIcon,
    DesktopComputerIcon,
    FireIcon,
    FlagIcon,
    HomeIcon,
    LogoutIcon,
    PlayIcon,
    StarIcon,
    TrendingUpIcon,
    UserIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';
import { UserGroupIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { createRquestToken } from '../../utils/createRequestToken';
import { useSessionId } from '../../store/user';
import useSWR from 'swr';
import { fetcherUser } from '../../utils/fetcherUser';
import { UserData } from '../../types/user';
import { deleteSession } from '../../utils/deleteSession';

interface SideMenuProps {}

const SideMenu: FC<SideMenuProps> = () => {
    const router = useRouter();
    const sessionId = useSessionId((state) => state.sessionId);
    const addSessionId = useSessionId((state) => state.addSessionId);
    const { data: userData, error } = useSWR<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL}/account?api_key=${process.env.NEXT_PUBLIC_API_KEY}&session_id=${sessionId}`,
        fetcherUser
    );
    const handleLogin = () => {
        createRquestToken()
            .then((res) => {
                if (res && res.status === 200) {
                    const { request_token } = res.data;
                    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${process.env.NEXT_PUBLIC_URL_APP}
                    `;
                }
            })
            .catch((err) => console.log(err));
    };

    const handleLogout = () => {
        deleteSession(sessionId).then((res) => {
            if (res?.data.success) {
                addSessionId('');
                router.push('/');
            }
        });
    };
    return (
        <div className="h-screen bg-dark-100 w-full sticky top-0 lg:flex hidden py-10 pl-8 flex-col">
            <div className="mb-5">
                <h2 className="text-2xl font-extrabold text-gray-200">
                    Gamovie
                </h2>
            </div>
            <div className="space-y-5">
                <div className="space-y-5">
                    <h4 className="text-sm font-extrabold text-gray-500 uppercase">
                        Menu
                    </h4>
                    <ul className="font-bold cursor-pointer space-y-5">
                        <li>
                            <Link href="/">
                                <a className="menu-items">
                                    <HomeIcon className="w-6 mr-2" />
                                    Home
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/trending">
                                <a className="menu-items">
                                    <TrendingUpIcon className="w-6 mr-2" />
                                    Trending
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-5">
                    <h4 className="text-sm font-extrabold text-gray-500 uppercase">
                        Movies
                    </h4>
                    <ul className="font-bold cursor-pointer space-y-5">
                        <li>
                            <Link href="/movies">
                                <a className="menu-items">
                                    <FireIcon className="w-6 mr-2" />
                                    Popular
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/movies/now-playing">
                                <a className="menu-items">
                                    <PlayIcon className="w-6 mr-2" />
                                    Now Playing
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/movies/upcoming">
                                <a className="menu-items">
                                    <FlagIcon className="w-6 mr-2" />
                                    Upcoming
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/movies/top-rated">
                                <a className="menu-items">
                                    <StarIcon className="w-6 mr-2" />
                                    Top Rated
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-gray-500 uppercase">
                        TV Shows
                    </h4>
                    <ul className="font-bold cursor-pointer space-y-5">
                        <li>
                            <Link href="/tv">
                                <a className="menu-items">
                                    <FireIcon className="w-6 mr-2" />
                                    Popular
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tv/airing-today">
                                <a className="menu-items">
                                    <VideoCameraIcon className="w-6 mr-2" />
                                    Airing Today
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tv/on-tv">
                                <a className="menu-items">
                                    <DesktopComputerIcon className="w-6 mr-2" />
                                    On Air
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/tv/top-rated">
                                <a className="menu-items">
                                    <StarIcon className="w-6 mr-2" />
                                    Top Rated
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {sessionId && userData ? (
                <>
                    <div
                        onClick={() => router.push('/profile')}
                        className="btn-user"
                    >
                        <div className="h-8 w-8 rounded-full border-2 border-gray-400 bg-gray-900 shadow  flex items-center justify-center uppercase text-gray-200 font-bold">
                            {userData.username.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-400">
                            {userData?.username}
                        </span>
                        <ChevronRightIcon className="w-5 text-gray-400" />
                    </div>
                    <div>
                        <button
                            className="flex items-center py-2 px-4 my-5 bg-gray-900 text-gray-200 rounded-lg font-bold text-sm hover:bg-gray-700 shadow-lg"
                            onClick={handleLogout}
                        >
                            Logout <LogoutIcon className="w-5 ml-2" />
                        </button>
                    </div>
                </>
            ) : (
                <div onClick={handleLogin} className="btn-login">
                    <div className="h-8 w-8 rounded-full border-2 border-gray-50  flex items-center justify-center">
                        <UserGroupIcon className="w-4 " />
                    </div>
                    <span className="font-bold">Join</span>
                    <ChevronRightIcon className="w-5" />
                </div>
            )}
        </div>
    );
};

export default SideMenu;
