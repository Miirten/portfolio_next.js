"use client";

import { useEffect, useState } from "react";
import type {
  WeatherApiResponse,
  WeatherHookState,
} from "@/lib/types";

export default function useNwa(): WeatherHookState {
  const [state, setState] = useState<WeatherHookState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    async function loadForecast() {
      try {
        const response = await fetch("/api/nwa", {
          signal: controller.signal,
          cache: "no-store",
        });

        const result: WeatherApiResponse = await response.json();

        if (!result.success) {
          throw new Error(result.error);
        }

        if (!response.ok) {
          throw new Error("Unable to load the weather forecast.");
        }

        if (active) {
          setState({
            data: result.data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!active || controller.signal.aborted) {
          return;
        }

        setState({
          data: null,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "Unable to load the weather forecast.",
        });
      }
    }

    void loadForecast();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  return state;
}