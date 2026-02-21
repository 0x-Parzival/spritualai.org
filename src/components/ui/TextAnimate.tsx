"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TextAnimateProps {
    children: string;
    variants?: Variants;
    by?: "character" | "word" | "line";
    className?: string;
    segmentClassName?: string;
    once?: boolean;
}

export const TextAnimate = ({
    children,
    variants,
    by = "character",
    className,
    segmentClassName,
    once = true,
}: TextAnimateProps) => {
    const elements = by === "character"
        ? children.split("")
        : by === "word"
            ? children.split(" ")
            : [children];

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="show"
            viewport={{ once }}
            style={{ display: "inline-block" }}
        >
            {elements.map((element, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={variants}
                    className={segmentClassName}
                    style={{
                        display: "inline-block",
                        whiteSpace: element === " " ? "pre" : "normal"
                    }}
                >
                    {element}
                    {by === "word" && i < elements.length - 1 && " "}
                </motion.span>
            ))}
        </motion.div>
    );
};
