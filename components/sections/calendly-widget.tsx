'use client';

import { useEffect } from 'react';

export default function CalendlyWidget() {
    useEffect(() => {
        // Load Calendly script
        const script = document.createElement('script');
        script.src = 'https://assets.calendly.com/assets/external/widget.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            // Cleanup
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/matiasoliva/guia-laboral-it-en-nueva-zelanda?hide_landing_page_details=1&hide_gdpr_banner=1" 
                style={{ minWidth: '320px', height: '800px' }} 
            />
        </>
    );
} 