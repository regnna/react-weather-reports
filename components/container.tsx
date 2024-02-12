/** @format */
import { cn } from "@/lib/utils";
import React from "react";

export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "w-lvw mr-100vw bg-accent border rounded-xl flex py-4 shadow-sm ",
        props.className
      )}
    />
  );
}