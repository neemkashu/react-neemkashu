import React, { CSSProperties, PropsWithChildren } from 'react';
import { CARD_WIDTH } from '../utils/constants';

interface CardGridProps {
  cardWidth?: string;
  cardGap?: string;
}
type CardGridComponent = PropsWithChildren<CardGridProps>;

const gridStyle: CSSProperties = {
  display: 'grid',
  gap: '0.8rem',
  gridTemplateColumns: `repeat(auto-fill, ${CARD_WIDTH}px)`,
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
