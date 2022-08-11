import { FC, ReactElement } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './footer';
import Navbar from './navbar';
import SideInfo from './sidebar-info';
import SideMenu from './sidebar-menu';

interface LayoutProps {
    children: ReactElement;
}

const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <div className="lg:grid lg:grid-flow-col lg:grid-cols-5 ">
            <SideMenu />
            <main className="min-h-screen col-span-3 overflow-y-auto">
                <Toaster position="top-center" reverseOrder={false} />
                <Navbar />
                {children}
                <Footer />
            </main>
            <SideInfo />
        </div>
    );
};

export default Layout;
