export const GA_TRACKING_ID = 'G-Y0CMB4G0D9';

// Log pageview
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: url,
        });
    }
};

// Log specific events (optional)
interface GtagEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
}

export const event = ({ action, category, label, value }: GtagEvent) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};
