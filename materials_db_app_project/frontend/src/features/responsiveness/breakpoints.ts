import { useEffect, useState } from "react";

class Breakpoint {
    label: string;
    floorWidth: number;
    ceilingWidth: number | undefined;

    constructor(label: string, floorWidth?: number, ceilingWidth?: number) {
        this.label = label;
        this.floorWidth = floorWidth || 0;
        this.ceilingWidth = ceilingWidth;
    }

    equal() {
        return (
            window.innerWidth >= this.floorWidth &&
            (this.ceilingWidth === undefined ||
                window.innerWidth <= this.ceilingWidth)
        );
    }

    gequal() {
        return window.innerWidth >= this.floorWidth;
    }

    lequal() {
        if (this.ceilingWidth === undefined) return true;
        return window.innerWidth <= this.ceilingWidth;
    }
}

export const breakpoints = {
    mobile: new Breakpoint("mobile", 0, 480),
    landscape: new Breakpoint("landscape", 481, 768),
    tablet: new Breakpoint("tablet", 769, 992),
    desktop: new Breakpoint("desktop", 993, 1440),
    large_desktop: new Breakpoint("large_desktop", 1441),
};

export const useBreakpoint = () => {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(
        new Breakpoint("", 0, undefined)
    );

    useEffect(() => {
        const calculateBreakpoint = () => {
            for (const value of Object.values(breakpoints)) {
                if (
                    value.ceilingWidth === undefined ||
                    window.innerWidth <= value.ceilingWidth
                ) {
                    setBreakpoint(value);
                    return;
                }
            }
            setBreakpoint(breakpoints.desktop);
        };
        calculateBreakpoint();
        window.addEventListener("resize", calculateBreakpoint);
        return () => window.removeEventListener("resize", calculateBreakpoint);
    }, []);

    return [breakpoint];
};
