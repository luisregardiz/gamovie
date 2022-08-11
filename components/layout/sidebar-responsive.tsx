import {
    DesktopComputerIcon,
    FireIcon,
    FlagIcon,
    HomeIcon,
    PlayIcon,
    StarIcon,
    TrendingUpIcon,
    VideoCameraIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { Dispatch, FC, SetStateAction } from 'react';

interface SidebarResponsiveProps {
    setOpenSidebar: Dispatch<SetStateAction<boolean>>;
}

const SidebarResponsive: FC<SidebarResponsiveProps> = ({ setOpenSidebar }) => {
    return (
        <div
            onClick={() => setOpenSidebar(false)}
            style={{ backdropFilter: 'blur(16px)' }}
            className="bg-dark-100 bg-opacity-90 w-full h-full top-0 left-0 fixed z-30"
        >
            <div className=" bg-dark-100 w-56 h-full top-0 left-0 z-30   py-16 pl-8 flex-col">
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
            </div>
        </div>
    );
};

export default SidebarResponsive;
