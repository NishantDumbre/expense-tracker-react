import React from 'react'
import { ResponsiveRadar } from "@nivo/radar";
import { GraphProps } from '../utils/interfaces/PremiumInterface';

const Graph:React.FC<GraphProps> = ({data, showIncomeGraph}) => {
    console.log(data, showIncomeGraph)
  return (
    <div className="h-96 w-96 shadow-lg rounded-lg p-5 bg-formBg">
          {data && showIncomeGraph && (
            <ResponsiveRadar
              data={data.incomeChartData}
              keys={["syrah"]}
              indexBy="income"
              valueFormat=">-.2f"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={{ scheme: "nivo" }}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          )}
          {data && !showIncomeGraph && (
            <ResponsiveRadar
              data={data.expenseChartData}
              keys={["chardonay"]}
              indexBy="expense"
              valueFormat=">-.2f"
              margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
              borderColor={{ from: "color" }}
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: "background" }}
              dotBorderWidth={2}
              colors={{ scheme: "nivo" }}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: "top-left",
                  direction: "column",
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: "#999",
                  symbolSize: 12,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
  )
}

export default Graph