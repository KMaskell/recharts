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
    ResponsiveContainer,
} from 'recharts';
import { data } from './mockData';
import CustomLegend from './XAxesToggleChart/CustomLegend';
import { Flex } from '@radix-ui/themes';

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

const PLBarLineChart = () => {
    return (
        <Flex width="100%" direction="column" pl="30px" style={{ height: 450 }}>
            <CustomLegend />
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

                    <XAxis
                        dataKey="month"
                        tick={CustomTick}
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 40, right: 40 }}
                    />
                    <YAxis
                        yAxisId="left"
                        domain={[0, 100000]}
                        tickCount={5}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 12,
                            fontWeight: 700,
                            fill: '#3B82F6',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: 0.2,
                        }}
                        tickFormatter={(v) =>
                            v === 0 ? '0' : `${Math.round(v / 1000)}k`
                        }
                        label={{
                            value: 'Income/Outcome (£)',
                            angle: -90,
                            position: 'insideLeft',
                            offset: 0,
                            style: {
                                fontSize: 15,
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                fontFamily: 'Inter, sans-serif',
                            },
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 1000000]}
                        tickCount={6}
                        axisLine={false}
                        tickLine={false}
                        tick={{
                            fontSize: 12,
                            fontWeight: 700,
                            fill: '#1D915C',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: 0.2,
                        }}
                        tickFormatter={(v) =>
                            v === 0
                                ? '0'
                                : `${(v / 1_000_000)
                                      .toFixed(1)
                                      .replace(/\.0$/, '')}M`
                        }
                        label={{
                            value: 'Cash Balance (£)',
                            angle: 90,
                            position: 'insideRight',
                            offset: -15,
                            style: {
                                fontSize: 15,
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                fontFamily: 'Inter, sans-serif',
                            },
                        }}
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
                    <Bar
                        yAxisId="left"
                        dataKey="blue"
                        name="Blue"
                        fill="#5B8DEF"
                        barSize={22}
                        radius={[6, 6, 0, 0]}
                        isAnimationActive={false}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        </Flex>
    );
};

export default PLBarLineChart;
