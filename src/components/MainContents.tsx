import { TwoColumn } from '../layouts/TwoColumn';
import { Component } from 'react';
import { Search } from './Search';
import { cards } from '../utils/mocha';
import { CardGrid } from '../layouts/CardGrid';
import { Card, CardProps } from './Card';

const LAYOUT_BREAK_POINT = 1600;

export class MainContent extends Component {
  render() {
    return (
      <div className="wrapper">
        <TwoColumn oneColumnBreakPoint={LAYOUT_BREAK_POINT} leftWidth="320px" rightWidth="1fr">
          <Search />
          <CardGrid>
            {cards.map((card, index) => {
              const cardProps: CardProps = { ...card };
              return <Card key={index} {...cardProps} />;
            })}
          </CardGrid>
        </TwoColumn>
      </div>
    );
  }
}
