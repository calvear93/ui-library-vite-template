import { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
}

/** Button atom. */
export const Button = ({ text, type = 'button', ...props }: ButtonProps) => {
	return (
		<button className={styles.button} type={type} {...props}>
			{text}
		</button>
	);
};
