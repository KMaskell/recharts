'use client';

import { Skeleton } from '@radix-ui/themes';

const months = 12;
const yTicks = 8;

// Set the maximum bar height (matches the skeleton container's height)
const MAX_BAR_HEIGHT = 200;

const ChartLoader = () => (
    <div
        style={{
            width: '100%',
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            position: 'relative',
            padding: 0,
        }}
        aria-label="Loading chart"
    >
        <div
            style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch',
                width: '100%',
                padding: '0 40px',
                boxSizing: 'border-box',
                position: 'relative',
            }}
        >
            {/* Left Y axis loader */}
            <div
                style={{
                    width: 20,
                    marginRight: 75,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            >
                {[...Array(yTicks)].map((_, i) => (
                    <Skeleton
                        key={`l${i}`}
                        width="20px"
                        height="15px"
                        // style={{ opacity: 0.6, background: Y_AXIS_COLOR }}
                    />
                ))}
            </div>
            {/* Chart bars */}
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: `${MAX_BAR_HEIGHT}px`,
                        display: 'flex',
                        alignItems: 'flex-end',
                        gap: 20,
                        justifyContent: 'space-between',
                    }}
                >
                    {[...Array(months)].map((_, i) => {
                        // Calculate bar "value" as percent of max (bottom always zero)
                        const baseHeight = 52;
                        const peak = 134;
                        const percent =
                            Math.abs(i - (months - 1) / 2) / ((months - 1) / 2);
                        const mainValue = baseHeight + peak * (1 - percent);
                        const secondValue =
                            baseHeight + 0.7 * peak * (1 - percent) + 18;

                        // Express as percentage of MAX_BAR_HEIGHT (bars always start at bottom)
                        const mainBarHeight =
                            (mainValue / (baseHeight + peak)) * MAX_BAR_HEIGHT;
                        const secondBarHeight =
                            (secondValue / (baseHeight + peak + 18)) *
                            MAX_BAR_HEIGHT;

                        return (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: 7,
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Skeleton
                                    width="24px"
                                    height={`${mainBarHeight}px`}
                                    // style={{
                                    //     opacity: 0.9,
                                    // }}
                                />
                                <Skeleton
                                    width="24px"
                                    height={`${secondBarHeight}px`}
                                    // style={{
                                    //     opacity: 0.7,
                                    // }}
                                />
                            </div>
                        );
                    })}
                </div>
                {/* X axis skeletons */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 22,
                        marginBottom: 6,
                    }}
                >
                    {[...Array(months)].map((_, i) => (
                        <Skeleton
                            key={i}
                            width="36px"
                            height="13px"
                            // style={{ opacity: 0.5, background: Y_AXIS_COLOR }}
                        />
                    ))}
                </div>
            </div>
            {/* Right Y axis loader */}
            <div
                style={{
                    width: 24,
                    marginLeft: 75,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    zIndex: 2,
                    pointerEvents: 'none',
                }}
            >
                {[...Array(yTicks)].map((_, i) => (
                    <Skeleton
                        key={`r${i}`}
                        width="20px"
                        height="15px"
                        // style={{ opacity: 0.6, background: Y_AXIS_COLOR }}
                    />
                ))}
            </div>
        </div>
    </div>
);

export default ChartLoader;
