import React from 'react';
import { Flex, Box } from '@radix-ui/themes';

const CustomLegend: React.FC = () => (
    <Flex gap="5" align="center" mb="0" mt="0" justify="center">
        <Flex align="center" gap="2">
            <Box
                style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg,#93C5FD,#3B82F6)',
                    borderRadius: 3,
                    display: 'inline-block',
                }}
            />
            Income
        </Flex>
        <Flex align="center" gap="2">
            <Box
                style={{
                    width: 14,
                    height: 14,
                    background: 'linear-gradient(135deg,#FCA5A5,#EF4444)',
                    borderRadius: 3,
                    display: 'inline-block',
                }}
            />
            Outcome
        </Flex>
        <Flex align="center" gap="2">
            <Box
                style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: '#065F46',
                    border: '2px solid #16A34A',
                    display: 'inline-block',
                }}
            />
            Cash Balance
        </Flex>
    </Flex>
);

export default CustomLegend;
