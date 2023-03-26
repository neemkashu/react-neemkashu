import { Component } from 'react';
import { v4 } from 'uuid';
import { CardGrid } from '../layouts/CardGrid';
import { PetFormData } from './Form/formChecker';
import { PetForm } from './Form/PetForm';
import { PopMessage } from './Form/PopMessage';
import { PetCard } from './PetCard';

type CreatorState = {
  cards: JSX.Element[];
  nextCard: PetFormData | null;
  isPopupShown: boolean;
};

const NOTIFICATION_DURATION = 2000;

export class Creator extends Component<Record<string, never>, CreatorState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cards: [],
      nextCard: null,
      isPopupShown: false,
    };
  }
  getCardInfo = (data: PetFormData) => {
    this.setState({ nextCard: data });
    this.setState({ isPopupShown: true });

    setTimeout(() => {
      this.setState({ isPopupShown: false });
    }, NOTIFICATION_DURATION);

    this.setState({ cards: [this.makeCard(data), ...this.state.cards] });
  };
  makeCard = (data: PetFormData): JSX.Element => {
    const { name, birth, type, sex, isExperienced, img } = data;
    const imgSrc = (img && URL.createObjectURL(img[0])) ?? '';
    const key = v4();

    return (
      <PetCard
        name={name}
        birth={birth}
        type={type}
        sex={sex}
        isExperienced={isExperienced}
        img={imgSrc}
        key={key}
      />
    );
  };

  render() {
    return (
      <div className="grid grid-col-1 md:grid-cols-form w-auto justify-center gap-2 p-2">
        <div className=" relative">
          <PetForm backData={this.getCardInfo} />
          {this.state.isPopupShown ? <PopMessage /> : null}
        </div>
        <CardGrid>{this.state.cards}</CardGrid>
      </div>
    );
  }
}
