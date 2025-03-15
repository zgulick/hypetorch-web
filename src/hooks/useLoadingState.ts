"use client";

import { useState, useCallback } from "react";

type LoadingState = {
  isLoading: boolean;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  startLoading: () => void;
  finishLoading: () => void;
};

export function useLoadingState(): LoadingState {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
    if (loading) setError(null);
  }, []);

  const startLoading = useCallback(() => setLoading(true), [setLoading]);
  const finishLoading = useCallback(() => setLoading(false), [setLoading]);

  return {
    isLoading,
    error,
    setLoading,
    setError,
    startLoading,
    finishLoading,
  };
}