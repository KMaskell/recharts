import React, { useState } from 'react';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line,
    Bar,
    Brush,
} from 'recharts';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
import ChartGradients, {
    gradientIdBlue,
    gradientIdRed,
} from './ChartGradients';
import SleekBrushTraveller from '../SleekBrushtraveller';
import { data } from './mockData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const XAxesTogglesChart = () => {
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
                padding: '0 20px 0 20px',
                margin: 0,
            }}
        >
            <CustomLegend />
            <ResponsiveContainer width="100%" height="90%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 40, left: 40, bottom: 24 }}
                    barGap={8}
                    onMouseLeave={() => setBrushIdx({ ...brushIdx })}
                >
                    <ChartGradients />
                    <CartesianGrid
                        stroke="#E5EAF2"
                        strokeDasharray="4 4"
                        vertical={false}
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

                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="line"
                        name="Growth"
                        stroke="#16A34A"
                        strokeWidth={3}
                        strokeDasharray="6 4"
                        connectNulls
                        activeDot={{
                            r: 6,
                            stroke: '#16A34A',
                            strokeWidth: 3,
                            fill: '#fff',
                            filter: 'drop-shadow(0 2px 6px #16A34A77)',
                        }}
                        dot={{
                            width: 14,
                            height: 14,
                            display: 'inline-block',
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
                    />
                    <Bar
                        yAxisId="left"
                        dataKey="red"
                        name="Red"
                        fill={`url(#${gradientIdRed})`}
                        barSize={22}
                        radius={[8, 8, 0, 0]}
                        isAnimationActive={true}
                    />
                    <Brush
                        dataKey="month"
                        height={22}
                        stroke="#3730A3"
                        fill="#E0E7EF"
                        travellerWidth={20}
                        traveller={(props) => (
                            <SleekBrushTraveller {...props} />
                        )}
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

export default XAxesTogglesChart;
