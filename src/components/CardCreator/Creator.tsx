import { Component } from 'react';
import { v4 } from 'uuid';
import { CardGrid } from '../../layouts/CardGrid';
import { PetFormData } from '../../utils/types';
import { PetForm } from '../Form/PetForm';
import { PetCard } from '../PetCard';

type CreatorState = {
  cards: JSX.Element[];
  nextCard: PetFormData | null;
};

export class Creator extends Component<Record<string, never>, CreatorState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cards: [],
      nextCard: null,
    };
  }
  getCardInfo = (data: PetFormData) => {
    console.log({ data });
    this.setState({ nextCard: data });
    this.setState({ cards: [this.makeCard(data), ...this.state.cards] });
  };
  makeCard = (data: PetFormData): JSX.Element => {
    const { name, birth, type, sex, isExperienced, img } = data;
    const imgSrc = (img && URL.createObjectURL(img[0])) ?? '';

    return (
      <PetCard
        name={name}
        birth={birth}
        type={type}
        sex={sex}
        isExperienced={isExperienced}
        img={imgSrc}
        key={v4()}
      />
    );
  };

  render() {
    return (
      <div className="flex flex-col lg:flex-row p-2">
        <PetForm backData={this.getCardInfo} />
        <CardGrid>{this.state.cards.map((card) => card)}</CardGrid>
      </div>
    );
  }
}
