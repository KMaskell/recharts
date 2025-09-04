'use client';

import { Flex, Box } from '@radix-ui/themes';
import React from 'react';

export type ChartSectionProps = {
    title: string;
    features: string[];
    children: React.ReactNode;
};

const ChartSection = ({ title, features, children }: ChartSectionProps) => {
    return (
        <Box
            width="100%"
            style={{
                margin: '0 auto',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px #0001',
                padding: '24px 0',
            }}
        >
            <Box asChild>
                <h2
                    style={{
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: '#1e293b',
                        marginBottom: 8,
                        paddingLeft: 32,
                    }}
                >
                    {title}
                </h2>
            </Box>
            <Box asChild>
                <ul
                    style={{
                        color: '#64748B',
                        fontSize: '1rem',
                        marginBottom: 16,
                        paddingLeft: 40,
                        listStyle: 'disc',
                    }}
                >
                    {features.map((f, i) => (
                        <li key={i}>{f}</li>
                    ))}
                </ul>
            </Box>
            <Flex direction="column" align="center">
                {children}
            </Flex>
        </Box>
    );
};

export default ChartSection;
