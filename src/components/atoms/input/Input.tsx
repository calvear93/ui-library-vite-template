import { type InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

/** Input atom. */
export const Input = (props: InputProps) => {
	return <input className={styles.input} {...props} />;
};
