import { type ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Visible label, also the button's accessible name. */
	text: string;
}

/** Button atom. */
export const Button = ({
	className,
	text,
	type = 'button',
	...props
}: ButtonProps) => {
	return (
		<button
			className={[styles.button, className].filter(Boolean).join(' ')}
			type={type}
			{...props}
		>
			{text}
		</button>
	);
};
