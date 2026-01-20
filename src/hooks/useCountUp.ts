'use client';

import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
    end: number;
    duration?: number;
    start?: number;
}

export function useCountUp({ end, duration = 2000, start = 0 }: UseCountUpOptions) {
    const [count, setCount] = useState(start);
    const [isActive, setIsActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isActive) {
                    setIsActive(true);
                }
            },
            { threshold: 0.1 }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isActive]);

    useEffect(() => {
        if (!isActive) return;

        const startTime = Date.now();
        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function (ease-out)
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (end - start) * eased;

            setCount(Math.floor(current));

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(updateCount);
    }, [isActive, end, start, duration]);

    return { ref, count };
}
