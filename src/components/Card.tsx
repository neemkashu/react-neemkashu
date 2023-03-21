import { Component } from 'react';
import { CardInfo } from '../utils/mocha';

export interface CardProps extends CardInfo {
  width?: number;
}

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <div className="p-2 border-2 rounded-lg bg-white border-zinc-300 shadow-md shadow-zinc-400">
        <div className="flex flex-col gap-2 tiny:flex-row">
          <img className=" w-52 tiny:w-64" src={this.props.img} alt="" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl">{this.props.name}</h2>
            <h3>
              {this.props.type} - {this.props.breed}
            </h3>
            <ul>
              <li>
                <strong>Age:</strong> {this.props.age}
              </li>
              <li>
                <strong>Inoculations:</strong> {this.props.inoculations.join(', ')}
              </li>
              <li>
                <strong>Diseases:</strong> {this.props.diseases.join(', ')}
              </li>
              <li>
                <strong>Parasites:</strong> {this.props.parasites.join(', ')}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
