"use client";

import useNwa from "@/hooks/useNwa";

export default function NavbarWeather() {
  const { data, loading, error } = useNwa();

  if (loading) {
    return (
      <div role="status" className="text-xs text-slate-400">
        Loading Cache Valley forecast...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div role="status" className="text-xs text-slate-400">
        Forecast unavailable
      </div>
    );
  }

  return (
    <div
      className="max-w-xs text-center text-xs sm:text-right"
      title={data.detailedForecast}
    >
      <p className="font-medium text-cyan-300">
        {data.location}
      </p>

      <p className="mt-1 text-slate-300">
        {data.periodName}: {data.temperature}°
        {data.temperatureUnit}
        {" · "}
        {data.shortForecast}
      </p>

      <a
        href="https://www.weather.gov/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block text-slate-400 hover:text-cyan-300"
      >
        NWS forecast
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}