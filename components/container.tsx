/** @format */
import { cn } from "@/lib/utils";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        " max-w-screen-sm mr-5 pr-6 lg:w-full md:max-w-screen-md  bg-accent border rounded-xl flex py-4 shadow-sm ",
        props.className
      )}
    />
  );
}