import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	/** Layout axis. */
	direction?: 'column' | 'row';
}

/** ___ComponentName___ layout — arranges its children along one axis. */
export const ___ComponentName___ = ({
	children,
	direction = 'column',
	style,
	...props
}: ___ComponentName___Props) => {
	return (
		<div
			className={styles.root}
			style={{ flexDirection: direction, ...style }}
			{...props}
		>
			{children}
		</div>
	);
};
