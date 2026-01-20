'use client';

import { useEffect, useRef, useCallback } from 'react';
import { trackScrollDepth, trackPageEngagement } from '@/lib/analytics';

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 */
export function useScrollDepth() {
    const milestonesReached = useRef(new Set<number>());

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const scrollPercentage = Math.round(
                ((scrollTop + windowHeight) / documentHeight) * 100
            );

            // Track milestones: 25%, 50%, 75%, 100%
            const milestones = [25, 50, 75, 100];

            milestones.forEach((milestone) => {
                if (
                    scrollPercentage >= milestone &&
                    !milestonesReached.current.has(milestone)
                ) {
                    milestonesReached.current.add(milestone);
                    trackScrollDepth(milestone);
                }
            });
        };

        // Throttle scroll events
        let timeoutId: NodeJS.Timeout;
        const throttledScroll = () => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(handleScroll, 100);
        };

        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, []);
}

/**
 * Hook to track time spent on page
 */
export function usePageEngagement() {
    const startTime = useRef(Date.now());

    useEffect(() => {
        const handleBeforeUnload = () => {
            const timeOnPage = Date.now() - startTime.current;
            trackPageEngagement(timeOnPage);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            // Also track on component unmount
            const timeOnPage = Date.now() - startTime.current;
            trackPageEngagement(timeOnPage);
        };
    }, []);
}

/**
 * Hook to track package card visibility (viewport intersection)
 */
export function usePackageViewTracking(
    packageName: string,
    packagePrice: string,
    enabled = true
) {
    const hasTracked = useRef(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled || hasTracked.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasTracked.current) {
                    hasTracked.current = true;
                    // Import trackPackageView dynamically to avoid circular deps
                    import('@/lib/analytics').then(({ trackPackageView }) => {
                        trackPackageView(packageName, packagePrice);
                    });
                }
            },
            { threshold: 0.5 } // Track when 50% visible
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
    }, [packageName, packagePrice, enabled]);

    return ref;
}
