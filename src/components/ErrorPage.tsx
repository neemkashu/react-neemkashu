import { Component } from 'react';
import { redirect } from 'react-router-dom';

export class ErrorPage extends Component {
  render() {
    redirect('/404');
    return (
      <div className="my-1 mx-auto">
        <p className="text-center text-2xl">Oops!</p>
        <p className="text-center text-1xl">Page not found</p>
      </div>
    );
  }
}
