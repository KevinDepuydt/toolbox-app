import React from 'react';
import styles from '../styles/button.module.css';


interface ButtonProps {
  label: string;
  onClick(event: React.MouseEvent<HTMLElement>): void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button className={styles.primary} onClick={onClick}>
      {label}
    </button>
  );
}
