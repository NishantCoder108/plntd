/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import {
  CandlestickSeries,
  createChart,
  createTextWatermark,
  HistogramSeries,
  ISeriesApi,
  LineData,
} from "lightweight-charts";
// import { useDarkTheme } from "@/contexts/DarkTheme";
// import { fetchColor } from "@/helpers/helperFunctions";
// import { AccentColor } from "@/helpers/types";
// import { API_URL } from "@/config";
import axios from "axios";
// import Loader from "../Loader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

enum AccentColor {
  GREEN = "#2C6D48",
  RED = "#e76e50",
  GRAY = "#e6e6e6",
  PINK = "#E91E63",
  BLUE = "#316ACD",
}
const fetchColor = <T extends Record<string, string>>(colorMap: T): T => {
  const computedColors = {} as T;
  // Loop through the colorMap and compute the actual colors
  for (const key in colorMap) {
    if (colorMap.hasOwnProperty(key)) {
      const element = document.createElement("div");
      element.style.color = colorMap[key];
      document.body.appendChild(element);
      computedColors[key as keyof T] = getComputedStyle(element)
        .color as T[keyof T];
      document.body.removeChild(element);
    }
  }

  return computedColors;
};
const TradingViewLightweight = ({ symbol, timeframe }: any) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [graphData, setGraphData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  //   const { darkTheme } = useDarkTheme();
  //   useEffect(() => {
  //     setLoading(true);
  //     setTimeout(() => setLoading(false), 200);
  //   }, []);

  useEffect(() => {
    setLoadingData(true);
    if (symbol && timeframe) {
      const url = new URL("get_ticker_data", API_URL);
      url.searchParams.append("ticker", symbol);
      url.searchParams.append("timestamp", timeframe);
      axios
        .get(url.toString(), {})
        .then((data: any) => {
          if (data?.statusText == "OK") {
            console.log("data?.data", data?.data);

            const d: any = [];
            const volume_arr: any = [];
            data?.data?.data?.time?.forEach(
              (timestamp: number, idx: number) => {
                d.push({
                  time: timestamp,
                  open: Number(data?.data?.data?.olhc?.open?.[idx]),
                  high: Number(data?.data?.data?.olhc?.high?.[idx]),
                  low: Number(data?.data?.data?.olhc?.low?.[idx]),
                  close: Number(data?.data?.data?.olhc?.close?.[idx]),
                });
                volume_arr.push({
                  time: timestamp,
                  value: Number(data?.data?.data?.olhc?.volume?.[idx]),
                  color:
                    Number(data?.data?.data?.olhc?.close?.[idx]) >
                    Number(data?.data?.data?.olhc?.open?.[idx])
                      ? AccentColor.GREEN
                      : AccentColor.RED,
                });
              }
            );
            setLoadingData(false);
            setGraphData(d);
            console.log({ d });
            setVolumeData(volume_arr);
          } else {
            console.log("err", data);
          }
        })
        .finally(() => setLoadingData(false));
    }
  }, [symbol, timeframe]);
  useEffect(() => {
    if (!chartContainerRef?.current || graphData.length == 0) return;
    const colorMap = fetchColor({
      // background: "hsl(var(--background))",
      // foreground: "hsl(var(--foreground))",
      // muted: "hsl(var(--muted))",
      // mutedForeground: "hsl(var(--muted-foreground))",
      // transparent: "#ffffffff",

      background: "#282828",
      foreground: "#f5f5f5",
      muted: "#CC3502",
      mutedForeground: "#f5f5f5",
      transparent: "#ffffffff",
    });
    // 0d7477
    // const chart = createChart(chartContainerRef.current, {
    //   // width: 800,
    //   // height: 400,
    //   autoSize: true,
    //   crosshair: {
    //     mode: 1,
    //   },
    //   layout: {
    //     background: { color: colorMap.background },
    //     textColor: colorMap.foreground,
    //   },
    //   grid: {
    //     // vertLines: { color: colorMap.muted },
    //     // horzLines: { color: colorMap.muted },
    //     vertLines: { visible: false },
    //     horzLines: { visible: false },
    //   },

    //   timeScale: {
    //     timeVisible: true, // Ensure time is shown
    //     secondsVisible: true, // Ensure seconds are shown
    //   },
    // });

    const chart = createChart(chartContainerRef.current);
    // const lineSeries = chart.addCandlestickSeries({
    //   wickUpColor: AccentColor.GREEN,
    //   // upColor: 'rgb(54, 116, 217)',
    //   upColor: AccentColor.GREEN,
    //   wickDownColor: AccentColor.RED,
    //   downColor: AccentColor.RED,
    //   borderVisible: false,
    //   // lineColor: "#2962FF",
    //   // topColor: "#2962FF",
    //   // bottomColor: "rgba(41, 98, 255, 0.28)",
    // });
    createTextWatermark(chart.panes()[0], {
      horzAlign: "center",
      vertAlign: "center",
      lines: [
        {
          text: "PLNTD , 60m",
          color: colorMap.mutedForeground,
          fontSize: 35,
        },
      ],

      visible: true,
    });

    const lineSeries = chart.addSeries(CandlestickSeries, {
      baseLineColor: "#A3DE83",
    });

    lineSeries.applyOptions({
      upColor: AccentColor.GREEN,
      downColor: AccentColor.RED,
      borderVisible: false,
      wickVisible: false,
    });
    // let graphDataNew = graphData;
    // ?.sort(
    //   (a: any, b: any) =>
    //     new Date(a.time).getTime() - new Date(b.time).getTime()
    // );

    lineSeries.setData([...graphData]);
    // const volumeSeries = chart.addSeries(HistogramSeries);

    // volumeSeries.applyOptions({
    //   color: "#26a69a",
    //   priceFormat: {
    //     type: "volume",
    //   },
    //   priceScaleId: "", // set as an overlay by setting a blank priceScaleId
    // });
    // volumeSeries.priceScale().applyOptions({
    //   scaleMargins: {
    //     top: 0.7, // highest point of the series will be 70% away from the top
    //     bottom: 0,
    //   },
    // });
    // volumeSeries.setData([...volumeData]);

    // let graphDataNew = graphData;
    // ?.sort(
    //   (a: any, b: any) =>
    //     new Date(a.time).getTime() - new Date(b.time).getTime()
    // );

    // let markedData: any = [];

    // logsData.map((each: any) => {
    //   let obj = {
    //     time: Number(each?.trade_taken_at),
    //     text: each.decision == "Sell" ? "O" : "O",
    //     position: each.decision === "Sell" ? "aboveBar" : "belowBar",
    //     color: each.decision === "Sell" ? AccentColor.GREEN : AccentColor.GREEN,
    //     shape: each.decision === "Sell" ? "arrowDown" : "arrowUp",
    //   };

    //   markedData.push(obj);
    //   if (each.order_status == "closed") {
    //     let objForClosed = {
    //       time: Number(each?.trade_closed_at),
    //       text: "C",
    //       position: "aboveBar",
    //       color: "#E4C200",
    //       shape: "circle",
    //     };
    //     markedData.push(objForClosed);
    //   }
    // });

    // markedData = markedData.sort(
    //   (a: any, b: any) =>
    //     new Date(a.time).getTime() - new Date(b.time).getTime()
    // );

    // if (markedData.length) {
    //   lineSeries.setMarkers([...markedData]);
    // }
    chart.applyOptions({
      //   watermark: {
      //     visible: true,
      //     fontSize: 30,
      //     horzAlign: "center",
      //     vertAlign: "center",
      //     color: colorMap.mutedForeground,
      //     text: symbol + ", " + timeframe,
      //   },

      //   height: 400,
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
        timeVisible: true,
        secondsVisible: true,
      },
      //   width: 800,
      layout: {
        textColor: colorMap.foreground,
        // fontSize: 30,
        background: {
          color: colorMap.background,
        },
      },
    });

    const visibleDataPoints = 100;
    if (graphData.length > visibleDataPoints) {
      const firstPoint: any = graphData[graphData.length - visibleDataPoints];
      const lastPoint: any = graphData[graphData.length - 1];
      chart.timeScale().setVisibleRange({
        from: firstPoint.time,
        to: lastPoint.time,
      });
    }
    // chart.timeScale().fitContent();

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect) {
        const { width, height } = entries[0].contentRect;
        chart.resize(width, height);
      }
    });
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [chartContainerRef, loading, loadingData, graphData, symbol, timeframe]);

  return loading || loadingData ? (
    <div className="f-full h-full flex items-center text-white justify-center">
      Loading...
    </div>
  ) : (
    <div
      ref={chartContainerRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "30rem",
      }}
    />
  );
};
export default TradingViewLightweight;
