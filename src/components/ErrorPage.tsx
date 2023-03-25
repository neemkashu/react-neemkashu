import { Component } from 'react';

export class ErrorPage extends Component {
  constructor(props: Record<string, never>) {
    super(props);
  }
  render() {
    return (
      <div className="my-1 mx-auto">
        <p className="text-center text-2xl">Oops!</p>
        <p className="text-center text-1xl">Page not found</p>
      </div>
    );
  }
}
