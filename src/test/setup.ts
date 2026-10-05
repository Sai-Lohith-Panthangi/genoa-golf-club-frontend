import '@testing-library/jest-dom/vitest';

// jsdom lacks these.
window.scrollTo = () => undefined;
Element.prototype.scrollIntoView = () => undefined;
