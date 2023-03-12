import React, { CSSProperties, PropsWithChildren } from 'react';

interface TwoColumnProps {
  leftWidth?: string;
  rightWidth?: string;
  oneColumnBreakPoint: number;
}
type TwoColumnComponent = PropsWithChildren<TwoColumnProps>;

type TwoColumnState = {
  isWideScreen: boolean;
};

const wideStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
  width: '100%',
};

export class CardGrid extends React.Component<TwoColumnComponent, TwoColumnState> {
  constructor(props: TwoColumnComponent) {
    super(props);
    this.state = { isWideScreen: document.body.offsetWidth > this.props.oneColumnBreakPoint };
    this.handleWideScreen = this.handleWideScreen.bind(this);
  }
  handleWideScreen() {
    this.setState({
      isWideScreen: document.body.offsetWidth > this.props.oneColumnBreakPoint,
    });
  }
  componentDidMount(): void {
    window.addEventListener('resize', this.handleWideScreen);
  }
  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleWideScreen);
  }
  render() {
    const gridStyle: CSSProperties = this.state.isWideScreen
      ? {
          gridTemplateColumns: '1fr 2fr',
        }
      : {
          gridTemplateColumns: '1fr',
        };
    return <div style={{ ...wideStyle, ...gridStyle }}>{this.props.children}</div>;
  }
}
