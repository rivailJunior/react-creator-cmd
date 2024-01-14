"use client";
import React from "react";
import { usePathname } from "next/navigation";

/**
 * Renders a heading component that displays a welcome message with the current pathname.
 *
 * @return {JSX.Element} The rendered heading component.
 */
export function WelcomeMessage() {
  const pathname = usePathname();

  return (
    <h1 className="text-3xl font-bold">
      Welcome to the <span className="text-blue-500">{pathname}</span> page
    </h1>
  );
}
