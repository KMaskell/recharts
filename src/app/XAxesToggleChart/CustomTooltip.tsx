import React from 'react';
import { Box, Flex } from '@radix-ui/themes';

interface CustomTooltipProps {
    active?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any[];
    label?: string;
}
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
                    borderRadius: 8,
                    padding: 16,
                    boxShadow: '0 4px 16px #0002',
                    minWidth: 160,
                }}
            >
                <Box style={{ color: '#3B82F6' }}>{label} 2024</Box>
                <Box mt="2">
                    <Flex align="center" gap="2">
                        <Box
                            as="span"
                            style={{ color: '#2563EB', fontWeight: 600 }}
                        >
                            🔵 Blue:
                        </Box>
                        <Box>{Math.round(d.blue / 1000)}k</Box>
                    </Flex>
                    <Flex align="center" gap="2">
                        <Box
                            as="span"
                            style={{ color: '#EF4444', fontWeight: 600 }}
                        >
                            🔴 Red:
                        </Box>
                        <Box>{Math.round(d.red / 1000)}k</Box>
                    </Flex>
                    <Flex align="center" gap="2">
                        <Box
                            as="span"
                            style={{ color: '#16A34A', fontWeight: 600 }}
                        >
                            🟢 Growth:
                        </Box>
                        <Box>{Math.round(d.line / 1000)}k</Box>
                    </Flex>
                </Box>
                {d.future && (
                    <Box
                        style={{
                            color: '#64748B',
                            marginTop: 4,
                            fontStyle: 'italic',
                        }}
                    >
                        Projected
                    </Box>
                )}
            </Box>
        );
    }
    return null;
};

export default CustomTooltip;
