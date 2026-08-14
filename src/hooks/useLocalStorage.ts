import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [valorStored, setValorStored] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(valorStored));
    } catch {
      // ignorar falhas de localStorage
    }
  }, [key, valorStored]);

  return [valorStored, setValorStored];
}
