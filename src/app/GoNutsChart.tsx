'use client';

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    Area,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
    Brush,
    Cell,
} from 'recharts';
import { data } from './mockData';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const d = payload[0].payload;
        return (
            <div
                style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: '0 4px 16px #0002',
                    minWidth: 160,
                }}
            >
                <strong style={{ color: '#3B82F6' }}>{label} 2024</strong>
                <div style={{ marginTop: 8 }}>
                    <span style={{ color: '#2563EB', fontWeight: 600 }}>
                        🔵 Blue:
                    </span>{' '}
                    {Math.round(d.blue / 1000)}k<br />
                    <span style={{ color: '#EF4444', fontWeight: 600 }}>
                        🔴 Red:
                    </span>{' '}
                    {Math.round(d.red / 1000)}k<br />
                    <span style={{ color: '#16A34A', fontWeight: 600 }}>
                        🟢 Growth:
                    </span>{' '}
                    {Math.round(d.line / 1000)}k
                </div>
                {d.future && (
                    <div
                        style={{
                            color: '#64748B',
                            marginTop: 4,
                            fontStyle: 'italic',
                        }}
                    >
                        Projected
                    </div>
                )}
            </div>
        );
    }
    return null;
};

const CustomLegend = () => (
    <div
        style={{
            display: 'flex',
            gap: 18,
            alignItems: 'center',
            marginBottom: 18,
            marginTop: 0,
            justifyContent: 'center',
        }}
    >
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
                style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg,#93C5FD,#3B82F6)',
                    borderRadius: 3,
                    display: 'inline-block',
                }}
            ></span>
            Blue
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
                style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg,#FCA5A5,#EF4444)',
                    borderRadius: 3,
                    display: 'inline-block',
                }}
            ></span>
            Red
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
                style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg,#6EE7B7,#16A34A)',
                    display: 'inline-block',
                }}
            ></span>
            Growth
        </span>
    </div>
);

const gradientIdBlue = 'bar-gradient-blue';
const gradientIdRed = 'bar-gradient-red';
const areaGradientId = 'area-gradient';

const GoNutsChart = () => {
    const [brushIdx, setBrushIdx] = useState({
        startIndex: 0,
        endIndex: data.length - 1,
    });

    return (
        <div
            style={{
                width: '100%',
                height: 520,
                background: '#F8FAFC',
                borderRadius: 16,
                boxShadow: '0 2px 24px #0001',
                padding: 0,
                margin: 0,
            }}
        >
            <CustomLegend />
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 0, left: 0, bottom: 24 }}
                    barGap={8}
                    onMouseLeave={() => setBrushIdx({ ...brushIdx })}
                >
                    <defs>
                        <linearGradient
                            id={gradientIdBlue}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3B82F6"
                                stopOpacity={0.9}
                            />
                            <stop
                                offset="100%"
                                stopColor="#93C5FD"
                                stopOpacity={0.7}
                            />
                        </linearGradient>
                        <linearGradient
                            id={gradientIdRed}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#EF4444"
                                stopOpacity={0.9}
                            />
                            <stop
                                offset="100%"
                                stopColor="#FCA5A5"
                                stopOpacity={0.7}
                            />
                        </linearGradient>
                        <linearGradient
                            id={areaGradientId}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#16A34A"
                                stopOpacity={0.25}
                            />
                            <stop
                                offset="95%"
                                stopColor="#6EE7B7"
                                stopOpacity={0.01}
                            />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        stroke="#E5EAF2"
                        strokeDasharray="4 4"
                        vertical={false}
                    />

                    <ReferenceLine
                        y={100000}
                        stroke="#A21CAF"
                        strokeDasharray="4 4"
                        strokeWidth={2}
                        label={{
                            value: '100k',
                            position: 'insideRight',
                            fill: '#A21CAF',
                            fontWeight: 600,
                        }}
                    />

                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 32, right: 32 }}
                        tick={{
                            fontSize: 12,
                            fontWeight: 700,
                            fill: '#475569',
                            letterSpacing: 0.5,
                        }}
                    />

                    <YAxis
                        yAxisId="left"
                        domain={[0, 350000]}
                        tickCount={8}
                        tick={{
                            fontSize: 12,
                            fontWeight: 600,
                            fill: '#475569',
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
                            fontSize: 12,
                            fontWeight: 600,
                            fill: '#475569',
                        }}
                        tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: '#E0E7EF', opacity: 0.35 }}
                    />

                    <Area
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth (area)"
                        stroke="#16A34A"
                        fill={`url(#${areaGradientId})`}
                        fillOpacity={1}
                        isAnimationActive={true}
                        dot={false}
                        activeDot={false}
                        strokeWidth={2}
                        connectNulls
                    />

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth"
                        stroke="#16A34A"
                        strokeWidth={3}
                        strokeDasharray="6 3"
                        connectNulls
                        activeDot={{
                            r: 7,
                            stroke: '#16A34A',
                            strokeWidth: 3,
                            fill: '#fff',
                            filter: 'drop-shadow(0 2px 6px #16A34A77)',
                        }}
                        dot={{
                            r: 4,
                            fill: '#16A34A',
                            stroke: '#fff',
                            strokeWidth: 2,
                            filter: 'drop-shadow(0 1px 2px #16A34A33)',
                        }}
                        isAnimationActive={true}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <Bar
                        yAxisId="left"
                        dataKey="blue"
                        name="Blue"
                        fill={`url(#${gradientIdBlue})`}
                        barSize={22}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                    >
                        {data.map((entry, idx) => (
                            <Cell
                                key={`b${idx}`}
                                fill={
                                    entry.future
                                        ? 'url(#bar-gradient-blue)'
                                        : 'url(#bar-gradient-blue)'
                                }
                                opacity={entry.future ? 0.35 : 1}
                                style={{
                                    filter: entry.future
                                        ? undefined
                                        : 'drop-shadow(0 2px 8px #3B82F644)',
                                }}
                            />
                        ))}
                    </Bar>

                    <Bar
                        yAxisId="left"
                        dataKey="red"
                        name="Red"
                        fill={`url(#${gradientIdRed})`}
                        barSize={22}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                    >
                        {data.map((entry, idx) => (
                            <Cell
                                key={`r${idx}`}
                                fill={
                                    entry.future
                                        ? 'url(#bar-gradient-red)'
                                        : 'url(#bar-gradient-red)'
                                }
                                opacity={entry.future ? 0.35 : 1}
                                style={{
                                    filter: entry.future
                                        ? undefined
                                        : 'drop-shadow(0 2px 8px #EF444455)',
                                }}
                            />
                        ))}
                    </Bar>

                    <Brush
                        dataKey="month"
                        height={20}
                        stroke="#2563eb" // handle border color (blue)
                        fill="#f1f5f9" // background of brush area
                        travellerWidth={18} // slightly wider for touch
                        handleStyle={{
                            fill: '#fff', // handle fill (white)
                            stroke: '#5B8DEF', // handle border blue
                            rx: 4, // rounded corners
                            ry: 4,
                            filter: 'drop-shadow(0 1px 4px #5B8DEF33)',
                        }}
                        startIndex={brushIdx.startIndex}
                        endIndex={brushIdx.endIndex}
                        onChange={setBrushIdx}
                        tickFormatter={(d) => d}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GoNutsChart;
