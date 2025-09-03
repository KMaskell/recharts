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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTick = ({ x, y, payload }: any) => (
    <g transform={`translate(${x},${y})`}>
        <text
            x={0}
            y={0}
            dy={12}
            textAnchor="middle"
            fontSize={11}
            fontWeight={600}
        >
            {payload.value}
        </text>
        <text
            x={0}
            y={18}
            dy={12}
            textAnchor="middle"
            fill="#C0C7D1"
            fontSize={11}
        >
            2024
        </text>
    </g>
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarWithDivider = (props: any) => {
    const {
        fill,
        x,
        y,
        width,
        height,
        value,
        dividerValue,
        opacity,
        stroke,
        strokeDasharray,
    } = props;

    // Divider math as before
    const dividerWidthPad = 3;
    const pct = value ? 1 - dividerValue / value : 0;
    const dividerY = y + height * pct;
    const cornerRadius = 6;
    const dividerX = x - dividerWidthPad;
    const dividerW = width + dividerWidthPad * 2;
    const highlightH = 6;
    const lineH = 3;

    return (
        <>
            {/* Main bar */}
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={fill}
                opacity={opacity}
                stroke={stroke}
                strokeWidth={1.5}
                strokeDasharray={strokeDasharray}
                rx={cornerRadius}
            />
            {/* Divider highlight */}
            <rect
                x={dividerX}
                y={dividerY - highlightH / 2}
                width={dividerW}
                height={highlightH}
                fill="#fff"
                stroke="none"
                pointerEvents="none"
            />
            {/* Divider line */}
            <rect
                x={dividerX}
                y={dividerY - lineH / 2}
                width={dividerW}
                height={lineH}
                fill="#232B38"
                stroke="none"
                pointerEvents="none"
            />
        </>
    );
};

const CustomBarLineChart = () => {
    const futureIndex = data.findIndex((d) => d.future);
    const refAreaStart = futureIndex > -1 ? data[futureIndex].month : undefined;
    const refAreaEnd = data[data.length - 1].month;

    return (
        <div style={{ width: '100%', height: 450 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 36, right: 38, left: 5, bottom: 28 }}
                    barGap={8}
                >
                    <CartesianGrid
                        stroke="#E5EAF2"
                        strokeDasharray="3 4"
                        vertical={false}
                        horizontal={true}
                    />
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
                        padding={{ left: 40, right: 40 }}
                    />
                    <YAxis
                        yAxisId="left"
                        domain={[0, 350000]}
                        tickCount={8}
                        tick={{
                            fontSize: 11,
                            fontWeight: 600,
                            fill: '#4B5563',
                        }}
                        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 350000]}
                        tickCount={8}
                        tick={{
                            fontSize: 11,
                            fontWeight: 600,
                            fill: '#4B5563',
                        }}
                        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) =>
                            `${Math.round(value / 1000)}k`
                        }
                        contentStyle={{
                            backgroundColor: '#F5F6FA',
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

                    <Bar
                        yAxisId="left"
                        dataKey="blue"
                        name="Blue"
                        fill="#5B8DEF"
                        barSize={22}
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                        shape={(props: any) => (
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
                    <Bar
                        yAxisId="left"
                        dataKey="red"
                        name="Red"
                        fill="#F78D7D"
                        barSize={22}
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                        shape={(props: any) => (
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
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth"
                        stroke="#1D915C"
                        strokeWidth={2}
                        strokeDasharray="7 7"
                        connectNulls
                        dot={{
                            r: 3,
                            fill: '#176846',
                            strokeWidth: 0,
                        }}
                        activeDot={{
                            r: 5,
                            fill: '#176846',
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
