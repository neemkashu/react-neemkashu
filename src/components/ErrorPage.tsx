import React, { CSSProperties } from 'react';

const errorStyle: CSSProperties = {
  margin: '0 auto',
  width: 200,
};

const textStyle: CSSProperties = {
  textAlign: 'center',
};

export class ErrorPage extends React.Component {
  render() {
    return (
      <div style={errorStyle}>
        <p style={textStyle}>Oops!</p>
        <p style={textStyle}>Page not found</p>
      </div>
    );
  }
}
