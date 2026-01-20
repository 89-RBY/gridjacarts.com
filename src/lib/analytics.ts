// Google Analytics utility functions
// Wraps gtag calls with type safety and error handling

declare global {
    interface Window {
        gtag?: (
            command: 'event' | 'config' | 'js',
            targetId: string,
            config?: Record<string, any>
        ) => void;
        dataLayer?: any[];
    }
}

export type AnalyticsEventName =
    | 'cta_click'
    | 'dark_mode_toggle'
    | 'scroll_depth'
    | 'floating_button_click'
    | 'package_view'
    | 'page_engagement';

export interface AnalyticsEventParams {
    event_category?: string;
    event_label?: string;
    value?: number;
    page_variant?: 'brutal' | 'original';
    [key: string]: any;
}

/**
 * Send an event to Google Analytics
 */
export const trackEvent = (
    eventName: AnalyticsEventName,
    params?: AnalyticsEventParams
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        try {
            window.gtag('event', eventName, {
                ...params,
                page_variant: 'brutal', // Always mark as brutal variant for A/B testing
                timestamp: new Date().toISOString(),
            });

            // Debug log in development
            if (process.env.NODE_ENV === 'development') {
                console.log('[Analytics]', eventName, params);
            }
        } catch (error) {
            console.error('[Analytics] Error tracking event:', error);
        }
    }
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
    trackEvent('cta_click', {
        event_category: 'engagement',
        event_label: ctaLocation,
        cta_text: ctaText,
    });
};

/**
 * Track dark mode toggle
 */
export const trackDarkModeToggle = (newTheme: 'light' | 'dark') => {
    trackEvent('dark_mode_toggle', {
        event_category: 'ui_interaction',
        event_label: newTheme,
        value: newTheme === 'dark' ? 1 : 0,
    });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percentage: number) => {
    trackEvent('scroll_depth', {
        event_category: 'engagement',
        event_label: `${percentage}%`,
        value: percentage,
    });
};

/**
 * Track floating button clicks
 */
export const trackFloatingButtonClick = (buttonType: 'phone' | 'whatsapp' | 'email') => {
    trackEvent('floating_button_click', {
        event_category: 'conversion',
        event_label: buttonType,
    });
};

/**
 * Track when a package card enters viewport
 */
export const trackPackageView = (packageName: string, packagePrice: string) => {
    trackEvent('package_view', {
        event_category: 'engagement',
        event_label: packageName,
        package_price: packagePrice,
    });
};

/**
 * Track page engagement time (send on unmount)
 */
export const trackPageEngagement = (timeOnPage: number) => {
    trackEvent('page_engagement', {
        event_category: 'engagement',
        event_label: 'time_on_page',
        value: Math.round(timeOnPage / 1000), // Convert to seconds
    });
};
