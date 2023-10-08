import createCache from "@emotion/cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

const useMuiConfig = () => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({
      key: "mui",
    });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInsert = inserted;
      inserted = [];
      return prevInsert;
    };
    return { cache, flush };
  });
  return { cache, flush };
};

export default useMuiConfig;
