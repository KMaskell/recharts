'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceArea,
    ResponsiveContainer,
} from 'recharts';
import { data } from './mockData';

// Custom tick for X axis
const CustomTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0}
            y={0}
            dy={12}
            textAnchor="middle"
            fill="#7D8FAB"
            fontSize={14}
        >
            {payload.value}
        </text>
        <text
            x={0}
            y={18}
            dy={12}
            textAnchor="middle"
            fill="#C0C7D1"
            fontSize={12}
        >
            2024
        </text>
    </g>
);

// Custom bar with divider
const BarWithDivider = (props: any) => {
    const {
        fill,
        x,
        y,
        width,
        height,
        dividerValue,
        yAxis,
        opacity,
        stroke,
        strokeDasharray,
    } = props;

    // Only round the top corners: use path.
    const topRight = 6; // radius
    const topLeft = 6; // radius

    // Path for only top corners rounded
    const path = `
      M${x},${y + height}
      L${x},${y + topLeft}
      Q${x},${y} ${x + topLeft},${y}
      L${x + width - topRight},${y}
      Q${x + width},${y} ${x + width},${y + topRight}
      L${x + width},${y + height}
      Z
    `;

    // Divider position
    const dividerY = yAxis && yAxis.scale ? yAxis.scale(dividerValue) : y;

    return (
        <g>
            <path
                d={path}
                fill={fill}
                opacity={opacity}
                stroke={stroke}
                strokeWidth={1.5}
                strokeDasharray={strokeDasharray}
            />
            {/* Divider with white underlay and black line */}
            <rect
                x={x}
                y={dividerY - 3}
                width={width}
                height={6}
                fill="#fff"
                rx={3}
                ry={3}
            />
            <rect
                x={x + 2}
                y={dividerY - 1}
                width={width - 4}
                height={2}
                fill="#232B38"
                rx={1}
                ry={1}
            />
        </g>
    );
};

const CustomBarLineChart = () => {
    // Find where to start dashed/future
    const futureIndex = data.findIndex((d) => d.future);
    const refAreaStart = futureIndex > -1 ? data[futureIndex].month : undefined;
    const refAreaEnd = data[data.length - 1].month;

    return (
        <div
            style={{ width: '100%', height: 400 }}
            className="bg-white p-4 rounded-xl shadow"
        >
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 36, right: 38, left: 5, bottom: 28 }}
                >
                    {/* Subtle grid */}
                    <CartesianGrid
                        stroke="#E5EAF2"
                        strokeDasharray="2 4"
                        vertical={false}
                    />
                    {/* Shaded area for future months */}
                    {futureIndex > -1 && (
                        <ReferenceArea
                            x1={refAreaStart}
                            x2={refAreaEnd}
                            y1="auto"
                            y2="auto"
                            fill="#E5F0FA"
                            fillOpacity={0.8}
                        />
                    )}
                    <XAxis
                        dataKey="month"
                        tick={CustomTick}
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 20, right: 20 }}
                        fontSize={14}
                    />
                    <YAxis
                        yAxisId="left"
                        domain={[0, 350000]}
                        tick={{ fontSize: 13, fill: '#B0B8C1' }}
                        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 350000]}
                        tick={{ fontSize: 13, fill: '#B0B8C1' }}
                        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        formatter={(value: any) =>
                            `${Math.round(value / 1000)}k`
                        }
                        contentStyle={{
                            backgroundColor: '#fff',
                            borderRadius: 8,
                            fontSize: 14,
                            border: 'none',
                            boxShadow: '0 2px 12px 0 #0002',
                        }}
                        labelStyle={{ color: '#1D915C', fontWeight: 600 }}
                    />
                    <Legend
                        verticalAlign="top"
                        iconType="circle"
                        align="center"
                        wrapperStyle={{
                            fontSize: 14,
                            color: '#7D8FAB',
                            marginBottom: 8,
                        }}
                    />
                    {/* Blue Bars */}
                    <Bar
                        yAxisId="left"
                        dataKey="blue"
                        name="Blue"
                        fill="#5B8DEF"
                        barSize={22}
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                        shape={(props) => (
                            <BarWithDivider
                                {...props}
                                dividerValue={props.payload.blueDiv}
                                yAxis={props.yAxis}
                                opacity={props.payload.future ? 0.22 : 0.95}
                                stroke="#5B8DEF"
                                strokeDasharray={
                                    props.payload.future ? '4 2' : undefined
                                }
                            />
                        )}
                    />
                    {/* Red Bars */}
                    <Bar
                        yAxisId="left"
                        dataKey="red"
                        name="Red"
                        fill="#F78D7D"
                        barSize={22}
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                        shape={(props) => (
                            <BarWithDivider
                                {...props}
                                dividerValue={props.payload.redDiv}
                                yAxis={props.yAxis}
                                opacity={props.payload.future ? 0.22 : 0.95}
                                stroke="#F78D7D"
                                strokeDasharray={
                                    props.payload.future ? '4 2' : undefined
                                }
                            />
                        )}
                    />
                    {/* @ts-ignore */}
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth"
                        stroke="#1D915C"
                        strokeWidth={2}
                        strokeDasharray="7 7"
                        dot={{
                            r: 3,
                            fill: '#1D915C',
                            stroke: '#1D915C',
                            strokeWidth: 0,
                        }}
                        activeDot={{
                            r: 5,
                            fill: '#1D915C',
                            stroke: '#1D915C',
                            strokeWidth: 0,
                        }}
                        isAnimationActive={false}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarLineChart;
