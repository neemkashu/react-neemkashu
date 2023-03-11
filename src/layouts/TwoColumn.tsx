import React, { CSSProperties, PropsWithChildren } from 'react';

interface TwoColumnProps {
  leftWidth?: string;
  rightWidth?: string;
  oneColumnBreakPoint?: string;
}
type TwoColumnComponent = PropsWithChildren<TwoColumnProps>;
type TwoColumnState = {
  isWideScreen: boolean;
};

const wideStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 2fr',
  gap: 10,
  width: '100%',
};

export class TwoColumn extends React.Component<TwoColumnComponent, TwoColumnState> {
  constructor(props: TwoColumnComponent) {
    super(props);
    this.state = { isWideScreen: true };
    this.handleWideScreen = this.handleWideScreen.bind(this);
  }
  handleWideScreen() {
    if (document.body.offsetWidth > 450) {
      console.log('document.body', document.body.offsetWidth);
      this.setState({
        isWideScreen: true,
      });
    }
  }
  componentDidMount(): void {
    window.addEventListener('resize', this.handleWideScreen);
  }
  componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleWideScreen);
  }
  render() {
    return <div style={wideStyle}>{this.props.children}</div>;
  }
}
