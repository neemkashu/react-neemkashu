import { useEffect } from 'react';
import styles from '../../styles/PopMessage.module.css';

export const NOTIFICATION_DURATION = 2000;

export const TEXT_CONTENT = 'You have successfully created a card!';

export const PopMessage = ({ hide }: { hide: () => void }) => {
  useEffect((): (() => void) => {
    const timeoutId = setTimeout((): void => {
      hide();
    }, NOTIFICATION_DURATION);

    return (): void => {
      clearTimeout(timeoutId);
    };
  }, [hide]);

  return (
    <div
      className={`${styles.popup} ${styles.animateOpen}
         bg-amber-300 text-yellow-800 text-center overflow-hidden`}
    >
      {TEXT_CONTENT}
    </div>
  );
};
