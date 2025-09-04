'use client';

import { Box, Flex } from '@radix-ui/themes';
import ChartLoader from './ChartLoader';
import PLBarLineChart from './PLBarLineChart';
import XAxesTogglesChart from './GoNutsChart';
import AdvancedFeaturesBarChart from './AdvancedFeaturesBarChart/AdvancedFeaturesBarChart';
import ChartSection from './ChartSection';
import OnlyReferenceBarChart from './OnlyReferenceBarChart';
import AreaOnlyChart from './AreaOnlyChart';

const Home = () => (
    <Box
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
            <ChartSection
                title="Chart Loader"
                features={['Async loading state', 'Skeleton UI']}
            >
                <ChartLoader />
            </ChartSection>
            <ChartSection
                title="PL Bar/Line Combo Chart with Dual Axes"
                features={[
                    'Grouped bar & line combo: compare multiple series in one chart',
                    'Custom X and dual Y axes: clear, labeled, with left and right value scales',
                    'Custom tick rendering: each bar group labeled with year and stylized ticks',
                    'Bars with divider lines: bars visually split to show sub-values or targets',
                    'Dashed bars for future periods: visually distinguish projections from actuals',
                    'Line overlay (Growth): monotone, dashed style for trend clarity',
                    'Legend and tooltip: styled for clarity',
                    'No area or reference overlays - focuses on bar, line, and axis clarity',
                ]}
            >
                <PLBarLineChart />
            </ChartSection>
            <ChartSection
                title="X-Axes Toggles Chart"
                features={[
                    'Toggleable x-axis: switch between groupings with interactive controls, chart updates instantly',
                    'Custom branded legend and tooltip',
                    'Animated line and grouped bar series with gradients and drop shadows',
                    'Responsive layout',
                ]}
            >
                <XAxesTogglesChart />
            </ChartSection>
            <ChartSection
                title="Bar & Line Chart with Advanced Features"
                features={[
                    'Grouped bars with gradients',
                    'Line chart overlay (shows growth trend over time—uses right Y-axis)',
                    'Dual Y-axes (compare Revenue & Users side by side, each with its own scale)',
                    'LabelList: values shown on top of bars (makes bar chart values instantly readable)',
                    'ErrorBar: uncertainty/error visualization (shows data ranges/confidence for each bar)',
                    'Custom Tooltip & Custom Legend (readable, branded)',
                    'Brush: interactive windowing/scroll (focus on a subset of data, zoom in/out with ease)',
                    'Fully responsive layout',
                ]}
            >
                <AdvancedFeaturesBarChart />
            </ChartSection>
            <ChartSection
                title="Reference"
                features={[
                    'ReferenceArea highlights a projected or focus period (Jul-Oct)',
                    'ReferenceLine marks a target/threshold (200k)',
                    'ReferenceDot emphasizes a key data point (peak at July, 200k)',
                ]}
            >
                <OnlyReferenceBarChart />
            </ChartSection>
            <ChartSection
                title="Area"
                features={[
                    'Animated area chart for “Growth (area)”',
                    'Gradient fill',
                ]}
            >
                <AreaOnlyChart />
            </ChartSection>
        </Flex>
    </Box>
);

export default Home;
