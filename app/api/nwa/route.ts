import { NextResponse } from "next/server";
import { z } from "zod";
import type {
  WeatherApiResponse,
  WeatherForecast,
} from "@/lib/types";

const pointsSchema = z.object({
  properties: z.object({
    forecast: z.string().url(),
  }),
});

const forecastSchema = z.object({
  properties: z.object({
    periods: z.array(
      z.object({
        name: z.string(),
        temperature: z.number(),
        temperatureUnit: z.string(),
        shortForecast: z.string(),
        detailedForecast: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      })
    ),
  }),
});

export async function GET() {
  try {
    const headers = {
      Accept: "application/geo+json",
      "User-Agent":
        process.env.NWS_USER_AGENT ?? "MathewPortfolio",
    };

    const pointsResponse = await fetch(
      "https://api.weather.gov/points/41.7639,-111.8725",
      {
        headers,
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!pointsResponse.ok) {
      throw new Error(
        `NWS location lookup failed: ${pointsResponse.status}`
      );
    }

    const points = pointsSchema.parse(
      await pointsResponse.json()
    );

    const forecastUrl = new URL(points.properties.forecast);

    if (
      forecastUrl.protocol !== "https:" ||
      forecastUrl.hostname !== "api.weather.gov"
    ) {
      throw new Error("Unexpected forecast URL.");
    }

    const forecastResponse = await fetch(forecastUrl, {
      headers,
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(10000),
    });

    if (!forecastResponse.ok) {
      throw new Error(
        `NWS forecast request failed: ${forecastResponse.status}`
      );
    }

    const forecast = forecastSchema.parse(
      await forecastResponse.json()
    );

    const now = Date.now();

    const period = forecast.properties.periods.find(
      (item) => Date.parse(item.endTime) > now
    );

    if (!period) {
      throw new Error("No upcoming forecast period was returned.");
    }

    const data: WeatherForecast = {
      location: "Cache Valley, UT",
      periodName: period.name,
      temperature: period.temperature,
      temperatureUnit: period.temperatureUnit,
      shortForecast: period.shortForecast,
      detailedForecast: period.detailedForecast,
      startTime: period.startTime,
      endTime: period.endTime,
    };

    return NextResponse.json<WeatherApiResponse>({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Weather request failed:", error);

    return NextResponse.json<WeatherApiResponse>(
      {
        success: false,
        error: "Weather forecast is temporarily unavailable.",
      },
      {
        status: 502,
      }
    );
  }
}