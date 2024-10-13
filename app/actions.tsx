"use server";

import { google } from "@ai-sdk/google";
import { streamUI } from "ai/rsc";
import { z } from "zod";
import WeatherComponent from "./components/WeatherComponent";
import CurrencyConvertion from "./components/CurrencyConvertion";

const LoadingComponent = () => (
  <div className="animate-pulse p-4">getting weather...</div>
);

const getWeather = async (location: string) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const value = Math.floor(Math.random() * 100);
  const emoji = value > 50 ? "🔥" : "😎";
  return `${value} °F️ ${emoji}`;
};

const getConvertedAmount = async (amount: number) => {
  const value = Math.ceil(Math.random() * 100);
  const finalValue = amount * value;
  return value;
};

export async function streamComponent(prompt: string) {
  const result = await streamUI({
    model: google("gemini-1.5-flash"),
    prompt,
    text: ({ content }) => <div>{content}</div>,
    tools: {
      getWeather: {
        description: "Get the weather for a location",
        parameters: z.object({
          location: z.string(),
        }),
        generate: async function* ({ location }) {
          yield <LoadingComponent />;
          const weather = await getWeather(location);
          return <WeatherComponent weather={weather} location={location} />;
        },
      },
      getCurrencyConversion: {
        description:
          "Get the currency convertion for a location of some amount",
        parameters: z.object({
          location: z.string(),
          amount: z.number(),
        }),
        generate: async function* ({ location, amount }) {
          yield <LoadingComponent />;
          const amnt = await getConvertedAmount(amount);
          return <CurrencyConvertion amount={amnt} location={location} />;
        },
      },
    },
  });

  return result.value;
}
