"use client";

import { useEffect, useState } from "react";

export function useSimulatedLoading(ms = 700) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
  }, [ms]);

  return loading;
}
