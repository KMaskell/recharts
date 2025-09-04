import { ReactElement, SVGAttributes, SVGProps } from 'react';
import { OnBrushUpdate } from 'recharts/types/context/brushUpdateContext';
import { DataKey, Padding } from 'recharts/types/util/types';

type BrushTravellerType =
    | ReactElement<SVGElement>
    | ((props: TravellerProps) => ReactElement<SVGElement>);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BrushTickFormatter = (value: any, index: number) => number | string;
interface BrushProps {
    x?: number;
    y?: number;
    dy?: number;
    width?: number;
    className?: string;
    ariaLabel?: string;
    height?: number;
    travellerWidth?: number;
    traveller?: BrushTravellerType;
    gap?: number;
    padding?: Padding;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataKey?: DataKey<any>;
    startIndex?: number;
    endIndex?: number;
    tickFormatter?: BrushTickFormatter;
    children?: ReactElement;
    onChange?: OnBrushUpdate;
    onDragEnd?: OnBrushUpdate;
    leaveTimeOut?: number;
    alwaysShowText?: boolean;
}
export type Props = Omit<
    SVGProps<SVGElement>,
    'onChange' | 'onDragEnd' | 'ref'
> &
    BrushProps;
export type TravellerProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    stroke?: SVGAttributes<SVGElement>['stroke'];
};
export declare function Brush(outsideProps: Props): React.JSX.Element;

export type ChartDatum = {
    month: string;
    blue: number;
    blueErrLow: number;
    blueErrHigh: number;
    red: number;
    redErrLow: number;
    redErrHigh: number;
    line: number;
    future: boolean;
};

export type CustomTooltipProps = {
    active?: boolean;
    payload?: Array<{ payload: ChartDatum }>;
    label?: string;
};
