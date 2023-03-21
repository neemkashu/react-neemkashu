import { Component, CSSProperties, PropsWithChildren } from 'react';

interface TwoColumnProps {
  leftWidth?: string;
  rightWidth?: string;
  oneColumnBreakPoint: number;
}
const defaultTwoColumnProps = {
  leftWidth: '1fr',
  rightWidth: '2fr',
  oneColumnBreakPoint: 700,
};
type TwoColumnComponent = PropsWithChildren<TwoColumnProps>;

const wideStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
  width: '100%',
};

export class TwoColumn extends Component<PropsWithChildren> {
  constructor(props: TwoColumnComponent) {
    super(props);
  }
  render() {
    return (
      <div className="grid gap-3" style={{ ...wideStyle }}>
        {this.props.children}
      </div>
    );
  }
}
