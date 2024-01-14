import React from "react";

export function Heading() {
  return (
    <div className="flex h-10 flex-col justify-around p-24">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Hey, let’s build something together?
      </h1>
      <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
        We are here to help you configure easily your react.js project
      </p>
    </div>
  );
}
