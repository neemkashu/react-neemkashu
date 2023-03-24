import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PopMessage, TEXT_CONTENT } from '../components/PopMessage/PopMessage';

describe('Rendering pop up', () => {
  it('Renders about content', () => {
    render(<PopMessage />);
    expect(screen.getByText(TEXT_CONTENT)).toBeInTheDocument();
  });
});
