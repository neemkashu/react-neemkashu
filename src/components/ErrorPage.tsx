import React, { CSSProperties } from 'react';

const errorStyle: CSSProperties = {
  margin: '0 auto',
  width: 200,
};

export class ErrorPage extends React.Component {
  render() {
    return (
      <div style={errorStyle}>
        <h1>Oops!</h1>
        <p>Page not found</p>
      </div>
    );
  }
}
