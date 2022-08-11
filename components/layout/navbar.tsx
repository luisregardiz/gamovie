import { FC, useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react';
import { LogoutIcon, SearchIcon, UserIcon } from '@heroicons/react/outline';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MovieInputSearch } from '../../types/movie';
import { useRouter } from 'next/router';
import Link from 'next/link';
import SidebarResponsive from './sidebar-responsive';
import { useSessionId } from '../../store/user';
import useSWR from 'swr';
import { UserData } from '../../types/user';
import { fetcherUser } from '../../utils/fetcherUser';
import { createRquestToken } from '../../utils/createRequestToken';
import { deleteSession } from '../../utils/deleteSession';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
    const router = useRouter();
    const [isOpen, setOpen] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);
    const { register, handleSubmit, reset } = useForm<MovieInputSearch>();
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

    const handleSearch: SubmitHandler<MovieInputSearch> = (data) => {
        console.log(data);

        router.push(`/search/${data.name}`);
        setOpenSearch(false);
        reset();
    };
    return (
        <>
            <div>
                <header className="lg:hidden flex items-center justify-between py-2 px-4 bg-dark-100">
                    <div className="z-40">
                        <Hamburger
                            toggled={openSidebar}
                            toggle={setOpenSidebar}
                            size={20}
                            color="#e5e7eb"
                        />
                    </div>
                    <div>
                        <Link href="/">
                            <a className="text-2xl font-black text-gray-200">
                                Gamovie
                            </a>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-5">
                        <button onClick={() => setOpenSearch((prev) => !prev)}>
                            <SearchIcon className="h-6 w-6 text-gray-200" />
                        </button>
                        {sessionId && userData ? (
                            <div className="flex items-center space-x-5">
                                <Link href="/profile">
                                    <a>
                                        <UserIcon className="h-6 w-6 text-gray-200" />
                                    </a>
                                </Link>
                                <button className="bg-dark-400 p-2 rounded-lg">
                                    <LogoutIcon className="h-6 w-6 text-gray-200" />
                                </button>
                            </div>
                        ) : (
                            <button onClick={handleLogin}>
                                <UserIcon className="h-6 w-6 text-gray-200" />
                            </button>
                        )}
                    </div>
                </header>
                {openSearch && (
                    <div className="fixed w-full z-20 shadow-lg">
                        <form onSubmit={handleSubmit(handleSearch)}>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                className="bg-dark-200 w-full p-3 text-gray-100 outline-none focus:ring-0 border-0"
                            />
                        </form>
                    </div>
                )}
            </div>
            {openSidebar && (
                <SidebarResponsive setOpenSidebar={setOpenSidebar} />
            )}
        </>
    );
};

export default Navbar;
