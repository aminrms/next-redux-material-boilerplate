"use client";

import React, { useEffect } from "react";

interface ErrorInterface {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorInterface) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <main>
      <section>Error</section>
      <button onClick={reset}>Reset page</button>
    </main>
  );
};

export default Error;
