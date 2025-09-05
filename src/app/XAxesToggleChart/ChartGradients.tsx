import React from 'react';

export const gradientIdBlue = 'bar-gradient-blue';
export const gradientIdRed = 'bar-gradient-red';
export const areaGradientId = 'area-gradient';

const ChartGradients: React.FC = () => (
    <defs>
        <linearGradient id={gradientIdBlue} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.7} />
        </linearGradient>
        <linearGradient id={gradientIdRed} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#EF4444" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#FCA5A5" stopOpacity={0.7} />
        </linearGradient>
        <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#16A34A" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#6EE7B7" stopOpacity={0.01} />
        </linearGradient>
    </defs>
);

export default ChartGradients;
