import React from "react";
import { useLayoutEffect, useState, useEffect } from "react";
const useWindowSize = () => {
    const [size, setSize] = useState(null);

    if (typeof window !== "undefined") {
        useLayoutEffect(() => {
            const updateSize = () => {
                setSize(window.innerWidth);
            };
            updateSize();
            window.addEventListener("resize", updateSize);
            return () => window.removeEventListener("resize", updateSize);
        }, []);
    } else {
        useEffect(() => {
            const updateSize = () => {
                setSize(window.innerWidth);
            };
            updateSize();
            window.addEventListener("resize", updateSize);
            return () => window.removeEventListener("resize", updateSize);
        }, []);
    }
    return size;
};
const Switch = ({ children }) => {
    const size = useWindowSize();
    let desktop, mobile;
    React.Children.forEach(children, (child, idx) => {
        if (React.isValidElement(child)) {
            if (idx === 0) {
                desktop = child;
            } else if (idx === 1) {
                mobile = child;
            }
        }
    });
    return size ? (size >= 1040 ? desktop : mobile) : null;
};

export default Switch;