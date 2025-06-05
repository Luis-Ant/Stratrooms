import React from "react";
import UserAvatar from "../common/UserAvatar";

export function HeroBanner({ imageUrl, title, teacher, user, actionButton }) {
  return (
    <div
      className="relative h-40 md:h-50 lg:h-65 w-full rounded-2xl bg-cover bg-center flex items-end pb-8 px-4 sm:px-6 lg:px-12"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imageUrl}')`,
      }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end w-full">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6 -mt-16 md:-mt-24 lg:-mt-32">
          <UserAvatar user={user} size="xxl" />
        </div>
        <div className="flex-grow text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-1">
            {title}
          </h1>
          <p className="text-lg md:text-xl font-medium opacity-90">{teacher}</p>
        </div>
      </div>
    </div>
  );
}
