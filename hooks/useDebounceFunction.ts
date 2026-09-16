export const useDebounceFunction = (
  callback: (...args: any[]) => void,
  delay = 500,
) => {
  let timeoutId: number | null = null;
  return (...args: any[]) => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, delay);
  };
};
