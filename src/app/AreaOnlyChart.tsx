'use client';

import React, { FC } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { Box } from '@radix-ui/themes';

const data = [
    { month: 'Jan', line: 70000 },
    { month: 'Feb', line: 90000 },
    { month: 'Mar', line: 95000 },
    { month: 'Apr', line: 120000 },
    { month: 'May', line: 130000 },
    { month: 'Jun', line: 160000 },
    { month: 'Jul', line: 200000 },
    { month: 'Aug', line: 180000 },
    { month: 'Sep', line: 210000 },
    { month: 'Oct', line: 220000 },
];

const AreaOnlyChart: FC = () => (
    <Box
        className="bg-white rounded-2xl p-5 shadow-lg"
        style={{ width: '100%', maxWidth: 700, margin: '0 auto' }}
    >
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart
                data={data}
                margin={{ top: 40, right: 24, left: 24, bottom: 32 }}
            >
                <defs>
                    <linearGradient id="area-green" x1="0" y1="0" x2="0" y2="1">
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
                    strokeDasharray="3 6"
                    vertical={false}
                />
                <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    padding={{ left: 22, right: 22 }}
                    tick={{ fontSize: 15, fontWeight: 700, fill: '#334155' }}
                />

                <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="line"
                    name="Growth (area)"
                    stroke="#16A34A"
                    fill="url(#area-green)"
                    fillOpacity={1}
                    isAnimationActive={true}
                    dot={false}
                    activeDot={false}
                    strokeWidth={3}
                    connectNulls
                />
            </AreaChart>
        </ResponsiveContainer>
    </Box>
);

export default AreaOnlyChart;
