export function createDebounce() {
  let timeout: number | undefined;
  return function (cb: () => void, delay = 1500) {
    clearTimeout(timeout);
    timeout = setTimeout(cb, delay);
  };
}
