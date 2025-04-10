import * as React from "react";

export default function useLazyRef<T>(callback: () => T) {
  const lazyRef = React.useRef<T | undefined>(null);

  if (lazyRef.current === undefined) {
    lazyRef.current = callback();
  }

  return lazyRef as React.MutableRefObject<T>;
}
