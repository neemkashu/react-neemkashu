import { TwoColumn } from '../layouts/TwoColumn';
import React from 'react';
import { CSSProperties } from 'react';
import { CardInfo } from '../utils/mocha';
import { CARD_WIDTH } from '../utils/constants';

export interface CardProps extends CardInfo {
  width?: number;
}

const cardStyle: CSSProperties = {
  padding: '0.5rem',
  border: '2px solid #F1CDB3',
  borderRadius: 10,
  backgroundColor: '#FFFFFF',
};
const cardInfoStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
};

export class Card extends React.Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <div className="card" style={cardStyle}>
        <TwoColumn oneColumnBreakPoint={CARD_WIDTH} leftWidth="1fr" rightWidth="2fr">
          <img src={this.props.img} alt="" />
          <div style={cardInfoStyle}>
            <h2>{this.props.name}</h2>
            <h3>
              {this.props.type} - {this.props.breed}
            </h3>
            <ul>
              <li>
                <strong>Age:</strong> {this.props.age}
              </li>
              <li>
                <strong>Inoculations:</strong> {...this.props.inoculations}
              </li>
              <li>
                <strong>Diseases:</strong> {...this.props.diseases}
              </li>
              <li>
                <strong>Parasites:</strong> {...this.props.parasites}
              </li>
            </ul>
          </div>
        </TwoColumn>
      </div>
    );
  }
}
