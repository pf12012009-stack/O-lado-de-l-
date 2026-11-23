import '@testing-library/jest-dom/vitest';

// O jsdom não implementa reprodução de mídia.
Object.defineProperty(HTMLMediaElement.prototype, 'pause', { configurable: true, value() {} });
Object.defineProperty(HTMLMediaElement.prototype, 'play', { configurable: true, value: () => Promise.resolve() });
