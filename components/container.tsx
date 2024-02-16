/** @format */
import { cn } from "@/lib/utils";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm bg-accent border rounded-xl flex py-4 shadow-sm ",
        props.className
      )}
    />
  );
}