import { Component, PropsWithChildren } from 'react';

interface CardGridProps {
  cardWidth?: string;
  cardGap?: string;
}
type CardGridComponent = PropsWithChildren<CardGridProps>;

export class CardGrid extends Component<CardGridComponent, CardGridProps> {
  constructor(props: CardGridProps) {
    super(props);
  }

  render() {
    return (
      <div className="grid justify-center gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {this.props.children}
      </div>
    );
  }
}
