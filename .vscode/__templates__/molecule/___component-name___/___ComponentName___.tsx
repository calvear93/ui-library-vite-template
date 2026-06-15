import { type PropsWithChildren } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends PropsWithChildren {
	label: string;
}

/** ___ComponentName___ molecule — composes atoms under a label. */
export const ___ComponentName___ = ({
	children,
	label,
}: ___ComponentName___Props) => {
	return (
		<div className={styles.root}>
			<span className={styles.label}>{label}</span>
			{children}
		</div>
	);
};
