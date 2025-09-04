'use client';

import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ReferenceLine,
    ReferenceArea,
    ReferenceDot,
    ResponsiveContainer,
} from 'recharts';
import { Box } from '@radix-ui/themes';

const data = [
    { month: 'Jan', dummy: 0 },
    { month: 'Feb', dummy: 0 },
    { month: 'Mar', dummy: 0 },
    { month: 'Apr', dummy: 0 },
    { month: 'May', dummy: 0 },
    { month: 'Jun', dummy: 0 },
    { month: 'Jul', dummy: 0 },
    { month: 'Aug', dummy: 0 },
    { month: 'Sep', dummy: 0 },
    { month: 'Oct', dummy: 0 },
];

const minTick = 0;
const maxTick = 250000;
const numTicks = 6;
const yTicks = Array.from({ length: numTicks }, (_, i) =>
    Math.round(minTick + ((maxTick - minTick) / (numTicks - 1)) * i)
);

const OnlyReferenceBarChart: React.FC = () => (
    <Box
        className="bg-white rounded-2xl p-6 shadow-xl"
        style={{
            width: '100%',
            maxWidth: 700,
            margin: '0 auto',
            background: 'linear-gradient(120deg, #f8fafc 80%, #e0ecfc 100%)',
        }}
    >
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{ top: 40, right: 32, left: 32, bottom: 32 }}
            >
                {/* Minimal, soft grid */}
                <CartesianGrid
                    stroke="#E4EAF6"
                    strokeDasharray="3 6"
                    vertical={false}
                />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 22, right: 22 }}
                    tick={{
                        fontSize: 15,
                        fontWeight: 700,
                        fill: '#3b4b69',
                        letterSpacing: 0.12,
                    }}
                />
                <YAxis
                    domain={[minTick, maxTick]}
                    ticks={yTicks}
                    width={60}
                    tickMargin={12}
                    axisLine={false}
                    tickLine={false}
                    tick={{
                        fontSize: 15,
                        fontWeight: 700,
                        fill: '#3b4b69',
                        letterSpacing: 0.12,
                    }}
                    tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                />
                {/* Invisible bar to activate y-axis */}
                <Bar
                    dataKey="dummy"
                    fill="transparent"
                    isAnimationActive={false}
                />

                {/* Beautiful Reference Area */}
                <ReferenceArea
                    x1="Jul"
                    x2="Oct"
                    fill="#74b9ff"
                    fillOpacity={0.18}
                    label={{
                        value: 'Projected',
                        position: 'top',
                        fill: '#2067c6',
                        fontWeight: 700,
                        fontSize: 16,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: 0.12,
                    }}
                />

                {/* Glowing Reference Line */}
                <ReferenceLine
                    y={200000}
                    stroke="#a259ec"
                    strokeDasharray="0"
                    strokeWidth={4}
                    label={{
                        value: 'Target 200k',
                        position: 'top', // <-- Move label above the line!
                        fill: '#a259ec',
                        fontWeight: 700,
                        fontSize: 15,
                        fontFamily: 'Inter, sans-serif',
                    }}
                    ifOverflow="extendDomain"
                    style={{ filter: 'drop-shadow(0 0 8px #a259ec77)' }}
                />

                {/* Vivid Reference Dot */}
                <ReferenceDot
                    x="Jul"
                    y={200000}
                    r={16}
                    fill="#1bcfb4"
                    stroke="#fff"
                    strokeWidth={4}
                    label={{
                        value: 'Peak',
                        position: 'top',
                        fill: '#1bcfb4',
                        fontWeight: 800,
                        fontSize: 16,
                        fontFamily: 'Inter, sans-serif',
                        letterSpacing: 0.15,
                    }}
                    ifOverflow="visible"
                />
            </BarChart>
        </ResponsiveContainer>
    </Box>
);

export default OnlyReferenceBarChart;
