import React, { CSSProperties, PropsWithChildren } from 'react';

interface CardGridProps {
  cardWidth?: string;
  cardGap?: string;
}
type CardGridComponent = PropsWithChildren<CardGridProps>;

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.8rem',
  gridTemplateColumns: 'repeat(auto-fill, 320px)',
  justifyContent: 'center',
  width: '100%',
};

export class CardGrid extends React.Component<CardGridComponent, CardGridProps> {
  constructor(props: CardGridProps) {
    super(props);
  }

  render() {
    return <div style={gridStyle}>{this.props.children}</div>;
  }
}
