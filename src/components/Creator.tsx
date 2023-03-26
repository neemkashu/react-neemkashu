import { Component } from 'react';
import { v4 } from 'uuid';
import { CardGrid } from '../layouts/CardGrid';
import { PetFormData } from './Form/formChecker';
import { PetForm } from './Form/PetForm';
import { PopMessage } from './Form/PopMessage';
import { PetCard } from './PetCard';

type CardData = PetFormData & { id: string; imgSrc: string };

type CreatorState = {
  cards: CardData[];
  isPopupShown: boolean;
  timer: ReturnType<typeof setTimeout> | null;
};

const NOTIFICATION_DURATION = 2000;

export class Creator extends Component<Record<string, never>, CreatorState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      cards: [],
      isPopupShown: false,
      timer: null,
    };
  }
  showPopUp = () => {
    this.setState({ isPopupShown: true });
    const timer = setTimeout(() => {
      this.setState({ isPopupShown: false });
    }, NOTIFICATION_DURATION);
    this.setState({ timer });
  };
  getCardInfo = (data: PetFormData) => {
    this.showPopUp();

    const nextCard: CardData = {
      ...data,
      imgSrc: (data.img && URL.createObjectURL(data.img[0])) ?? '',
      id: v4(),
    };

    this.setState({ cards: [nextCard, ...this.state.cards] });
  };
  componentWillUnmount() {
    const { timer } = this.state;
    const imageUrls = this.state.cards.map(({ imgSrc }) => imgSrc);
    if (timer) {
      clearTimeout(timer);
    }
    if (imageUrls) {
      imageUrls.map((imageUrl) => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      });
    }
  }
  render() {
    return (
      <div className="grid grid-col-1 md:grid-cols-form w-auto justify-center gap-2 p-2">
        <div className=" relative">
          <PetForm backData={this.getCardInfo} />
          {this.state.isPopupShown ? <PopMessage /> : null}
        </div>
        <CardGrid>
          {this.state.cards.map((data) => {
            const { name, birth, type, sex, isExperienced, imgSrc, id } = data;
            return (
              <PetCard
                name={name}
                birth={birth}
                type={type}
                sex={sex}
                isExperienced={isExperienced}
                img={imgSrc}
                key={id}
              />
            );
          })}
        </CardGrid>
      </div>
    );
  }
}
