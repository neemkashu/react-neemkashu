import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CardInfo, cards } from '../utils/mocha';
import { Card } from '../components/Card';

describe('Card', () => {
  it('Renders headers content', () => {
    cards.forEach((cardProps) => {
      const { unmount } = render(<Card {...cardProps} />);
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(cardProps.name);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(cardProps.type);
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(cardProps.breed);

      unmount();
    });
  });

  it('Renders non array properties of card parameters', () => {
    cards.forEach((cardProps) => {
      const { unmount } = render(<Card {...cardProps} />);
      const parametersListItems = screen.getAllByRole('listitem');

      expect(parametersListItems).toHaveLength(4);

      expect(parametersListItems[0]).toHaveTextContent(cardProps.age);

      unmount();
    });
  });

  it('Renders list of array card parameters', () => {
    const parameters = ['age', 'inoculations', 'diseases', 'parasites'];

    cards.forEach((cardProps) => {
      const { unmount } = render(<Card {...cardProps} />);

      const parametersListItems = screen.getAllByRole('listitem');

      expect(parametersListItems).toHaveLength(4);

      parameters.forEach((key, index) => {
        if (index > 0) {
          const cardKey = key as keyof CardInfo;
          const cardProperties = cardProps[cardKey];

          expect(Array.isArray(cardProperties)).toBe(true);

          const text = Array.isArray(cardProperties)
            ? `${cardProperties.join(', ')}`
            : cardProperties;

          const regExpText = new RegExp(text, 'i');
          const regExpKey = new RegExp(key, 'i');
          expect(parametersListItems[index]).toHaveTextContent(regExpText);
          expect(parametersListItems[index]).toHaveTextContent(regExpKey);
        }
      });

      unmount();
    });
  });
});
