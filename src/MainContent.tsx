import { TwoColumn } from './layouts/TwoColumn';
import React, { CSSProperties } from 'react';
import { Search } from './Search/Search';

const wrapperStyle: CSSProperties = {
  padding: '1rem',
};

export class MainContent extends React.Component {
  render() {
    return (
      <div style={wrapperStyle}>
        <TwoColumn oneColumnBreakPoint={450}>
          <Search />
          <p>This is main page</p>
        </TwoColumn>
      </div>
    );
  }
}
