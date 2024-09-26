import React from 'react';

interface ProfileProps {
    name: string;
    bio: string;
    location?: string;
    joinDate: string;
}

const ProfileComp: React.FC<ProfileProps> = ({ name, bio, location, joinDate }) => {
    const initials = name.split(' ').map(part => part.charAt(0).toUpperCase()).join('');

    return (
        <div className="w-[90%] mx-auto p-6 mb-6 flex flex-col md:flex-row gap-6">
            <div className="flex items-center justify-center w-full md:w-1/3">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-300 text-gray-800 flex items-center justify-center text-3xl font-bold rounded-xl">
                    {initials}
                </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-4 md:w-2/3">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900">{name}</h1>
                <p className="text-gray-700 leading-relaxed text-base md:text-xl lg:text-2xl">
                    {bio}
                </p>
                <div className="flex flex-col">
                    {location && (
                        <span className="text-base md:text-lg font-semibold">Location: <span className="font-medium">{location}</span></span>
                    )}
                    <span className="text-base md:text-lg font-semibold">Joined: <span className="font-medium">{joinDate}</span></span>
                </div>
            </div>
        </div>
    );
};

export default ProfileComp;
