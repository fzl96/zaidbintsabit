"use client";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

const chartConfig = {
  masjid: {
    label: "Masjid",
    color: "#36454f",
  },
  jumat: {
    label: "Jumat",
    color: "#ed5958",
  },
  ramadhan: {
    label: "Ramadhan",
    color: "#863893",
  },
  yatim: {
    label: "Yatim",
    color: "#0d324d",
  },
} satisfies ChartConfig;

interface ChartProps {
  data: any;
}

export function Chart({ data }: ChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="min-h-[200px] max-h-[450px] w-full"
    >
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Line
          dataKey="masjid"
          stroke="var(--color-masjid)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-masjid)",
          }}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          dataKey="jumat"
          stroke="var(--color-jumat)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-jumat)",
          }}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          dataKey="ramadhan"
          stroke="var(--color-ramadhan)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-ramadhan)",
          }}
          activeDot={{
            r: 6,
          }}
        />
        <Line
          dataKey="yatim"
          stroke="var(--color-yatim)"
          strokeWidth={2}
          dot={{
            fill: "var(--color-yatim)",
          }}
          activeDot={{
            r: 6,
          }}
        />
      </LineChart>
    </ChartContainer>
  );
}
