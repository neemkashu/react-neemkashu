import { Component } from 'react';
import { Search } from './Search';
import { cards } from '../utils/mocha';
import { CardGrid } from '../layouts/CardGrid';
import { Card, CardProps } from './Card';
import { CARD_WIDTH } from '../utils/constants';

export class MainContent extends Component {
  render() {
    return (
      <div className="sm:p-3 p-2">
        <Search />
        <CardGrid>
          {cards.map((card, index) => {
            const cardProps: CardProps = { width: CARD_WIDTH, ...card };
            return <Card key={index} {...cardProps} />;
          })}
        </CardGrid>
      </div>
    );
  }
}
