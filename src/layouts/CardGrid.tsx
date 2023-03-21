import { Component, PropsWithChildren } from 'react';

export class CardGrid extends Component<PropsWithChildren> {
  render() {
    return (
      <div className="grid justify-center gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {this.props.children}
      </div>
    );
  }
}
