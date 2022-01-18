import { FC } from "react";
import { UserData } from "../../../../types/user";

interface InfoUserProps {
    userData: UserData;
}

const InfoUser: FC<InfoUserProps> = ({ userData }) => {
    return (
        <div>
            <div className="relative flex h-auto w-full  mb-4">
                <div className="flex items-center  p-4 space-x-4  ">
                    <span className="bg-gray-900 h-12 w-12 flex items-center justify-center  rounded-2xl shadow-lg uppercase text-gray-200 font-bold text-xl">
                        {userData.username.charAt(0)}
                    </span>
                    <div>
                        <span className="font-bold text-gray-400">
                            {userData.username}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoUser;
