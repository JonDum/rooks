import { useState, useEffect, MutableRefObject, useCallback } from "react";
import { useMutationObserver } from "shared/useMutationObserver";
import { useDidMount } from "shared/useDidMount";

const EMPTY_RECT = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
}

/**
 * useBoundingclientRect hook
 *
 * @param ref The React ref whose ClientRect is needed
 * @return ClientRect
 */

function getBoundingClientRect(
  element: HTMLElement
): ClientRect | DOMRect | null {
  return element ? element.getBoundingClientRect() : EMPTY_RECT;
}

function useBoundingclientrect(ref: MutableRefObject<HTMLElement | null>) {
  const [value, setValue] = useState<ClientRect | DOMRect | null>(EMPTY_RECT);

  const update = useCallback(() => {
    setValue(getBoundingClientRect(ref.current));
  }, []);

  useDidMount(() => {
    update();
  });

  useMutationObserver(ref, update);

  return value;
}

export { useBoundingclientrect };
