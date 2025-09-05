'use client';

import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LabelList,
    ErrorBar,
    Brush,
    ResponsiveContainer,
    LegendPayload,
} from 'recharts';
import { Box, Flex } from '@radix-ui/themes';
import { ChartDatum, CustomTooltipProps } from '../types';
import { data } from '../XAxesToggleChart/mockData';

// --- ErrorBar expects a function that returns [low, high] ---
const renderBlueError = (d: ChartDatum) =>
    typeof d.blueErrLow === 'number' && typeof d.blueErrHigh === 'number'
        ? [d.blueErrLow, d.blueErrHigh]
        : [d.blue, d.blue];

const renderRedError = (d: ChartDatum) =>
    typeof d.redErrLow === 'number' && typeof d.redErrHigh === 'number'
        ? [d.redErrLow, d.redErrHigh]
        : [d.red, d.red];

const CustomTooltip: React.FC<CustomTooltipProps> = ({
    active,
    payload,
    label,
}) => {
    if (active && payload && payload.length) {
        const d = payload[0].payload;
        return (
            <Box
                style={{
                    background: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: 10,
                    padding: 16,
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 14,
                    boxShadow: '0 2px 12px #0002',
                }}
            >
                <Box style={{ fontWeight: 700, color: '#2563EB' }}>
                    {label} 2024{' '}
                    {d.future && (
                        <span style={{ color: '#64748B' }}>(projected)</span>
                    )}
                </Box>
                <Box style={{ marginTop: 8, color: '#1e293b' }}>
                    <span style={{ color: '#3B82F6', fontWeight: 600 }}>
                        🟦 Blue:{' '}
                    </span>
                    {(d.blue / 1000).toLocaleString()}k
                    <br />
                    <span style={{ color: '#EF4444', fontWeight: 600 }}>
                        🟥 Red:{' '}
                    </span>
                    {(d.red / 1000).toLocaleString()}k
                    <br />
                    <span style={{ color: '#16A34A', fontWeight: 600 }}>
                        🟢 Growth:{' '}
                    </span>
                    {(d.line / 1000).toLocaleString()}k
                </Box>
            </Box>
        );
    }
    return null;
};

// --- Custom Legend ---
const CustomLegend = ({ payload }: { payload?: LegendPayload[] }) => (
    <Flex
        gap="4"
        align="center"
        style={{
            marginBottom: 10,
            marginTop: 10,
            fontSize: 15,
            fontWeight: 600,
        }}
    >
        {payload?.map((entry, i) => (
            <Flex
                key={`${entry.value as string}-${entry.type || 'legend'}-${i}`}
                align="center"
                gap="2"
            >
                <Box
                    style={{
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        background:
                            entry.value === 'Blue'
                                ? 'linear-gradient(135deg,#3B82F6,#93C5FD)'
                                : entry.value === 'Red'
                                ? 'linear-gradient(135deg,#EF4444,#FCA5A5)'
                                : 'linear-gradient(135deg,#16A34A,#6EE7B7)',
                        display: 'inline-block',
                    }}
                />
                {entry.value}
            </Flex>
        ))}
    </Flex>
);

// --- Main Chart ---
const AdvancedFeaturesBarChart: React.FC = () => {
    const [brushIdx, setBrushIdx] = useState<{
        startIndex: number;
        endIndex: number;
    }>({
        startIndex: 0,
        endIndex: data.length - 1,
    });

    return (
        <Box
            className="bg-white rounded-2xl p-4 shadow-lg"
            style={{ width: '100%', maxWidth: 970, margin: '0 auto' }}
        >
            <ResponsiveContainer width="100%" height={470}>
                <BarChart
                    data={data}
                    margin={{ top: 40, right: 36, left: 16, bottom: 32 }}
                    barGap={10}
                >
                    <defs>
                        <linearGradient
                            id="bar-blue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#3B82F6"
                                stopOpacity={0.95}
                            />
                            <stop
                                offset="100%"
                                stopColor="#93C5FD"
                                stopOpacity={0.75}
                            />
                        </linearGradient>
                        <linearGradient
                            id="bar-red"
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
                            id="area-green"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="#16A34A"
                                stopOpacity={0.22}
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
                    <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 22, right: 22 }}
                        tick={{
                            fontSize: 13,
                            fontWeight: 600,
                            fill: '#334155',
                        }}
                    />

                    <YAxis
                        yAxisId="left"
                        domain={[0, 200000]}
                        tickCount={5}
                        width={60}
                        padding={{ top: 18, bottom: 14 }}
                        minTickGap={8}
                        mirror={false}
                        tickMargin={12}
                        angle={0}
                        axisLine={false}
                        tickLine={false}
                        label={{
                            value: 'Income/Outcome (£)',
                            angle: -90,
                            position: 'insideLeft',
                            offset: -25,
                            style: {
                                fontSize: 15,
                                fontWeight: 700,
                                letterSpacing: 0.5,
                                fontFamily: 'Inter, sans-serif',
                            },
                        }}
                        tick={{
                            fontSize: 14,
                            fontWeight: 700,
                            fill: '#3B82F6',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: 0.2,
                        }}
                        tickFormatter={(v) =>
                            v === 0 ? '0' : `${Math.round(v / 1000)}k`
                        }
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        domain={[0, 1000000]}
                        tickCount={6}
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
                        tick={{
                            fontSize: 13,
                            fontWeight: 700,
                            fill: '#16A34A',
                            fontFamily: 'Inter, sans-serif',
                            letterSpacing: 0.1,
                        }}
                        tickFormatter={(v) =>
                            v === 0
                                ? '0'
                                : `${(v / 1_000_000)
                                      .toFixed(1)
                                      .replace(/\.0$/, '')}M`
                        }
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: '#E0E7EF', opacity: 0.35 }}
                    />
                    <Legend content={<CustomLegend />} />

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth"
                        stroke="#16A34A"
                        strokeWidth={3}
                        strokeDasharray="6 6"
                        connectNulls
                        isAnimationActive={true}
                        activeDot={{
                            r: 7,
                            stroke: '#16A34A',
                            strokeWidth: 3,
                            fill: '#fff',
                        }}
                        dot={{
                            r: 4,
                            fill: '#16A34A',
                            stroke: '#16A34A',
                            strokeWidth: 2,
                        }}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    <Bar
                        yAxisId="left"
                        dataKey="blue"
                        name="Blue"
                        fill="url(#bar-blue)"
                        barSize={22}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                    >
                        <LabelList
                            dataKey="blue"
                            position="top"
                            formatter={(label: React.ReactNode) =>
                                typeof label === 'number'
                                    ? `${Math.round(label / 1000)}k`
                                    : ''
                            }
                            fill="#3B82F6"
                            fontSize={13}
                            fontWeight={700}
                        />
                        <ErrorBar
                            dataKey={renderBlueError}
                            width={6}
                            strokeWidth={2}
                            stroke="#3B82F6"
                            direction="y"
                        />
                    </Bar>

                    <Bar
                        yAxisId="left"
                        dataKey="red"
                        name="Red"
                        fill="url(#bar-red)"
                        barSize={22}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                    >
                        <LabelList
                            dataKey="red"
                            position="top"
                            formatter={(label: React.ReactNode) =>
                                typeof label === 'number'
                                    ? `${Math.round(label / 1000)}k`
                                    : ''
                            }
                            fill="#EF4444"
                            fontSize={13}
                            fontWeight={700}
                        />
                        {/* <ErrorBar
                            dataKey={renderRedError}
                            width={6}
                            strokeWidth={2}
                            stroke="#EF4444"
                            direction="y"
                        /> */}
                    </Bar>

                    <Brush
                        dataKey="month"
                        height={26}
                        stroke="#3730A3"
                        fill="#E0E7EF"
                        travellerWidth={20}
                        startIndex={brushIdx.startIndex}
                        endIndex={brushIdx.endIndex}
                        onChange={setBrushIdx}
                        tickFormatter={(d: string) => d}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default AdvancedFeaturesBarChart;
