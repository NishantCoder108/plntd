"use client";
import React, { useEffect, useRef } from "react";
import { api } from "@/trpc/react";
import {
  ColorType,
  createChart,
  createTextWatermark,
  LineData,
  LineSeries,
} from "lightweight-charts";

const TradeChart = () => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading, error } = api.trading.readLatestTrading.useQuery(
    {
      state: "ALL",
    },
    {
      staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (
      !chartContainerRef.current ||
      !data ||
      !data.buyTxns ||
      !data.sellTxns ||
      data.buyTxns.length === 0 ||
      data.sellTxns.length === 0
    )
      return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        textColor: "#f5f5f5",
        background: {
          type: ColorType.Solid,
          color: "#282828",
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 500,
    });
    createTextWatermark(chart.panes()[0], {
      horzAlign: "center",
      vertAlign: "center",
      lines: [
        {
          text: "PLANTD / SOL",
          color: "#6d6d6d",
          fontSize: 30,
        },
      ],

      visible: true,
    });
    chart.applyOptions({
      autoSize: true,
      crosshair: {
        mode: 1,
      },
      grid: {
        horzLines: {
          visible: false,
        },
        vertLines: {
          visible: false,
        },
      },

      timeScale: {
        // borderColor: "rgba(197, 203, 206, 0.8)",
        timeVisible: true,
        secondsVisible: false,
        rightBarStaysOnScroll: false,
        // tickMarkFormatter: (time) => {
        //   const date = new Date(time * 1000);
        //   return date.toLocaleString();
        // },
        // allowBoldLabels: true,
        // tickMarkWidth: 1,
        // tickMarkColor: "#f5f5f5",
        // tickMarkStyle: 1,
        // tickMarkVisible: true,
      },

      layout: {
        textColor: "#f5f5f5",
        // fontSize: 30,
        background: {
          color: "#282828",
        },
      },
    });
    const lineSeries = chart.addSeries(LineSeries, { color: "#A3DE83" });

    chart.timeScale().fitContent();

    lineSeries.setData(data.buyTxns as LineData[]);

    const lineSeries2 = chart.addSeries(LineSeries, { color: "#e76e50" });
    lineSeries2.setData(data.sellTxns as LineData[]);

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    const toolTip = document.createElement("div");
    toolTip.style.width = "max-content";
    toolTip.style.height = "80px";
    toolTip.style.position = "absolute";
    toolTip.style.display = "none";
    toolTip.style.padding = "12px";
    toolTip.style.boxSizing = "border-box";
    toolTip.style.fontSize = "x-small";
    toolTip.style.textAlign = "left";
    toolTip.style.zIndex = "1000";
    toolTip.style.top = "12px";
    toolTip.style.left = "12px";
    toolTip.style.pointerEvents = "none";
    toolTip.style.border = "none";
    toolTip.style.borderRadius = "16px";
    toolTip.style.boxShadow = "0px 10px 15px -3px rgba(0,0,0,0.1)";
    toolTip.style.fontFamily = "Roboto, Ubuntu, sans-serif";

    toolTip.style.background = "white";
    toolTip.style.color = "black";
    toolTip.style.borderColor = "#2962FF";

    chartContainerRef.current?.appendChild(toolTip);

    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > (chartContainerRef.current?.clientWidth ?? 0) ||
        param.point.y < 0 ||
        param.point.y > (chartContainerRef.current?.clientHeight ?? 0)
      ) {
        toolTip.style.display = "none";
      } else {
        const dateStr = new Date((param.time as number) * 1000)
          .toLocaleString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(",", "");

        const data = param.seriesData.get(lineSeries) as
          | { value: number }
          | undefined;
        const data2 = param.seriesData.get(lineSeries2) as
          | { value: number }
          | undefined;
        console.log(data, data2);

        const price =
          data !== undefined && data.value !== undefined ? data.value : 0;
        const price2 =
          data2 !== undefined && data2.value !== undefined ? data2.value : 0;
        toolTip.innerHTML = `
          <div style="font-weight: bold; font-size: 12px;"> ${dateStr}</div>
          <div style="margin-top: 5px;">
              <span style="font-weight: bold;">BUY:</span> 
              <span style="color: green;">$${price.toFixed(2)}</span>
          </div>
          <div>
              <span style="font-weight: bold;">SELL:</span> 
              <span style="color: red;">$${price2.toFixed(2)}</span>
          </div>
      `;
        toolTip.style.display = "block";

        const y = param.point.y;

        let left = param.point.x + toolTipMargin;
        if (
          left >
          (chartContainerRef.current?.clientWidth ?? 0) - toolTipWidth
        ) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (
          top >
          (chartContainerRef.current?.clientHeight ?? 0) - toolTipHeight
        ) {
          top = y - toolTipHeight - toolTipMargin;
        }

        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect) {
        const { width, height } = entries[0].contentRect;
        chart.resize(width, height);
      }
    });
    resizeObserver.observe(chartContainerRef.current);
    chart.timeScale().fitContent();
    return () => {
      if (chart) {
        resizeObserver.disconnect();
        chart.remove();
      }
    };
  }, [data]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-[500px] w-full text-white">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-[500px] w-full text-white">
        <p>{error.message}</p>
      </div>
    );

  return (
    <div className="w-[100%] h-full overflow-hidden">
      <div ref={chartContainerRef} style={{ width: "100%", height: "500px" }} />
    </div>
  );
};

export default TradeChart;
