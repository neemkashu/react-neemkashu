import { TwoColumn } from './layouts/TwoColumn';
import React, { CSSProperties } from 'react';
import { Search } from './Search/Search';
import { cards } from './utils/mocha';

const wrapperStyle: CSSProperties = {
  padding: '1rem',
};

export class MainContent extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <TwoColumn oneColumnBreakPoint={450}>
          <Search />
          <ul>
            {cards.map((card) => {
              return <li key={Math.random() * 1000}>{card.name}</li>;
            })}
          </ul>
        </TwoColumn>
      </div>
    );
  }
}
