import { FC } from 'react';

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const actualYear = new Date().getFullYear();

    return (
        <footer className="p-5 text-lg font-bold bg-dark-200 text-gray-200 rounded-lg">
            <span>&copy; {actualYear}, Gamovie All rights reserved.</span>
        </footer>
    );
};

export default Footer;
