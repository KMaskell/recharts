import * as React from 'react';
import { blue, indigo, indigoA } from '@radix-ui/colors';
import { TravellerProps } from './types';

const SleekBrushTraveller: React.FC<TravellerProps> = ({
    x,
    y,
    width,
    height,
    stroke = indigo.indigo9,
}) => (
    <g tabIndex={0} style={{ outline: 'none', cursor: 'ew-resize' }}>
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            rx={8}
            fill="url(#traveller-gradient)"
            stroke={stroke}
            strokeWidth={2}
            filter={`drop-shadow(0 2px 10px ${indigoA.indigoA6})`}
        />
        <defs>
            <linearGradient id="traveller-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.92} />
                <stop offset="100%" stopColor="#A5B4FC" stopOpacity={0.82} />
            </linearGradient>
        </defs>
    </g>
);

export default SleekBrushTraveller;
