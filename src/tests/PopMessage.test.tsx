import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NOTIFICATION_DURATION, PopMessage, TEXT_CONTENT } from '../components/Form/PopMessage';

describe('Pop up', () => {
  it('Renders about content', () => {
    const callback = vi.fn();
    render(<PopMessage hide={callback} />);

    expect(screen.getByText(TEXT_CONTENT)).toBeInTheDocument();
  });

  it('Call props callback after some duration', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    render(<PopMessage hide={callback} />);

    act(() => {
      vi.advanceTimersByTime(NOTIFICATION_DURATION);
    });

    vi.useRealTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
