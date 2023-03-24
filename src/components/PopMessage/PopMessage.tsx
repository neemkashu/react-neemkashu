import { Component } from 'react';
import styles from './PopMessage.module.css';

export const TEXT_CONTENT = 'You have successfully created a card!';

export class PopMessage extends Component<Record<string, never>> {
  render() {
    return (
      <div
        className={`${styles.popup} ${styles.animateOpen}
         bg-amber-300 text-yellow-800 text-center overflow-hidden`}
      >
        {TEXT_CONTENT}
      </div>
    );
  }
}
