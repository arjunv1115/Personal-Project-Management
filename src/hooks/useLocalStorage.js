import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue
        ? JSON.parse(storedValue)
        : initialValue;
    } catch (error) {
      console.error("LocalStorage error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
    } catch (error) {
      console.error("Unable to save data:", error);
    }
  }, [key, value]);

  return [value, setValue];
}