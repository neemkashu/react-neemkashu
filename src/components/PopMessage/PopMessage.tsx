import { Component } from 'react';
import styles from './PopMessage.module.css';

export class PopMessage extends Component<Record<string, never>> {
  render() {
    return (
      <div
        className={`${styles.popup} ${styles.animateOpen}
         bg-amber-300 text-yellow-800 text-center overflow-hidden`}
      >
        {'You have successfully created a card!'}
      </div>
    );
  }
}
