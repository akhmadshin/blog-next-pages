interface Window {
  pageMounted?: () => void;
  pageMountedPromise?: Promise<void>;
}
