import React, { useState } from 'react';
import {
    BarChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
} from 'recharts';
import { Flex, Box } from '@radix-ui/themes';

// Sample data
const data = [
    { name: 'A', uv: 400, pv: 240 },
    { name: 'B', uv: 300, pv: 139 },
    { name: 'C', uv: 200, pv: 980 },
    { name: 'D', uv: 278, pv: 390 },
    { name: 'E', uv: 189, pv: 480 },
];

const HoverableBarLineChart = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            style={{ width: '100%' }}
        >
            <Box width="100%" style={{ height: 350, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        {/* Only show CartesianGrid on hover */}
                        {isHovered && (
                            <CartesianGrid
                                stroke="#E5EAF2"
                                strokeDasharray="3 4"
                                vertical={false}
                                horizontal={true}
                            />
                        )}
                        <Bar dataKey="uv" fill="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#ff7300" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Flex>
    );
};

export default HoverableBarLineChart;
