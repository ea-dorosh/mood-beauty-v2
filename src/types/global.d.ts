// Global type declarations

interface GtagEventParams {
  [key: string]: string | number | boolean | object | undefined;
}

interface Window {
  gtag: (command: string, ...args: (string | GtagEventParams)[]) => void;
  dataLayer: unknown[];
}
