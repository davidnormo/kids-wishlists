declare global {
  namespace preact.JSX {
    interface HTMLAttributes {
      css?: {
        [key: string]: unknown;
      };
    }
  }
}

// This empty export is important! It tells TS to treat this as a module
export {};
