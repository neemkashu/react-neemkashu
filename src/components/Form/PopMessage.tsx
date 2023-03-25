import styles from '../../styles/PopMessage.module.css';

export const TEXT_CONTENT = 'You have successfully created a card!';

export const PopMessage = () => {
  return (
    <div
      className={`${styles.popup} ${styles.animateOpen}
         bg-amber-300 text-yellow-800 text-center overflow-hidden`}
    >
      {TEXT_CONTENT}
    </div>
  );
};
