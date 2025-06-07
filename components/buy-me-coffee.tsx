'use client';

import { useEffect } from 'react';

export default function BuyMeCoffee() {
    useEffect(() => {
        // Small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            const script = document.createElement('script');
            script.setAttribute('data-name', 'BMC-Widget');
            script.setAttribute('data-cfasync', 'false');
            script.src = 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js';
            script.setAttribute('data-id', 'matiasoliva');
            script.setAttribute('data-description', 'Support me on Buy me a coffee!');
            script.setAttribute('data-message', '');
            script.setAttribute('data-color', '#5F7FFF');
            script.setAttribute('data-position', 'Right');
            script.setAttribute('data-x_margin', '18');
            script.setAttribute('data-y_margin', '18');
            document.body.appendChild(script);
        }, 1000);

        return () => {
            clearTimeout(timer);
            const existingScript = document.querySelector('script[data-name="BMC-Widget"]');
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    return null;
} 