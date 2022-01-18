import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
    const actualYear = new Date().getFullYear();

    return (
        <footer className="p-5 text-lg font-bold bg-gray-900 text-gray-200">
            <span>&copy; {actualYear}, Gamovie All rights reserved.</span>
        </footer>
    );
};

export default Footer;
