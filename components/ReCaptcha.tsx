'use client';

import { useEffect, useRef, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
      }) => number;
      reset: (widgetId: number) => void;
    };
    onRecaptchaLoad?: () => void;
  }
}

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: () => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LcuLFssAAAAAL5wdCa2cL09qKNRTgXqTNMM8saj';

export default function ReCaptcha({ onVerify, onExpire, onError }: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const isRenderedRef = useRef(false);

  const renderRecaptcha = useCallback(() => {
    if (!containerRef.current || isRenderedRef.current) return;

    if (window.grecaptcha && window.grecaptcha.render) {
      try {
        widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
          sitekey: SITE_KEY,
          callback: onVerify,
          'expired-callback': onExpire || (() => {}),
          'error-callback': onError || (() => {}),
        });
        isRenderedRef.current = true;
      } catch (e) {
        // Widget might already be rendered
      }
    }
  }, [onVerify, onExpire, onError]);

  useEffect(() => {
    // Check if script already loaded
    const existingScript = document.querySelector('script[src*="recaptcha"]');

    if (existingScript) {
      // Script exists, try to render
      if (window.grecaptcha) {
        window.grecaptcha.ready(renderRecaptcha);
      }
    } else {
      // Load script
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
      script.async = true;
      script.defer = true;

      window.onRecaptchaLoad = () => {
        window.grecaptcha.ready(renderRecaptcha);
      };

      document.head.appendChild(script);
    }

    return () => {
      isRenderedRef.current = false;
    };
  }, [renderRecaptcha]);

  return <div ref={containerRef} className="recaptcha-container" />;
}

export function resetRecaptcha(widgetId: number) {
  if (window.grecaptcha) {
    window.grecaptcha.reset(widgetId);
  }
}
