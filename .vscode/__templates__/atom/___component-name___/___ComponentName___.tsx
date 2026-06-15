import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends HTMLAttributes<HTMLSpanElement> {
	children?: ReactNode;
}

/** ___ComponentName___ atom. */
export const ___ComponentName___ = ({
	children,
	...props
}: ___ComponentName___Props) => {
	return (
		<span className={styles.root} {...props}>
			{children}
		</span>
	);
};
