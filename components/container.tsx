/** @format */
import { cn } from "@/lib/utils";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-full bg-accent border rounded-xl flex py-4 shadow-sm sm:mx-3 md:mx-6 lg:mx-6",
        props.className
      )}
    />
  );
}