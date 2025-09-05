'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from 'recharts';
import { data } from './XAxesToggleChart/mockData';

export default function DebugGridChart() {
    return (
        <div style={{ width: 800, height: 400 }}>
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
                        // tick={CustomTick}
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
                    <Bar dataKey="blue" fill="#5B8DEF" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
