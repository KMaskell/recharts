'use client';

import { Flex } from '@radix-ui/themes';

import ChartLoader from './ChartLoader';
import CustomBarLineChart from './CustomBarLineChart';
import GoNutsChart from './GoNutsChart';

const chartContainerStyle = {
    width: '100%',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px #0001',
    padding: '24px 0',
};

const Home = () => (
    <main
        style={{
            minHeight: '100vh',
            background: '#f8fafc',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
        }}
    >
        <Flex direction="column" gap="8" width="100%" align="center">
            <div style={chartContainerStyle}>
                <CustomBarLineChart />
            </div>
            <div style={chartContainerStyle}>
                <ChartLoader />
            </div>
            <div style={chartContainerStyle}>
                <GoNutsChart />
            </div>
        </Flex>
    </main>
);

export default Home;
