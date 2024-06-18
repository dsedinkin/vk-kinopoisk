import { useState, useEffect } from "react";

const useLocalStorageState = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      }
      return defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return;
    localStorage.setItem(key, JSON?.stringify(value || "") || "");
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorageState;