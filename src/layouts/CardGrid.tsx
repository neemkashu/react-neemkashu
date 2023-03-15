import React, { CSSProperties, PropsWithChildren } from 'react';
import { CARD_WIDTH } from '../utils/constants';

interface CardGridProps {
  cardWidth?: string;
  cardGap?: string;
}
type CardGridComponent = PropsWithChildren<CardGridProps>;

const gridStyle: CSSProperties = {
  display: 'grid',
  justifyContent: 'center',
  width: '100%',
};

export class CardGrid extends React.Component<CardGridComponent, CardGridProps> {
  constructor(props: CardGridProps) {
    super(props);
  }

  render() {
    const style = {
      ...gridStyle,
      gap: this.props.cardGap ?? '0.8rem',
      gridTemplateColumns: `repeat(auto-fill, ${this.props.cardWidth ?? `${CARD_WIDTH}px`})`,
    };
    return <div style={style}>{this.props.children}</div>;
  }
}
