import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	/** Visible label shown above the content. */
	label: string;
}

/** ___ComponentName___ molecule — composes atoms under a label. */
export const ___ComponentName___ = ({
	children,
	className,
	label,
	...props
}: ___ComponentName___Props) => {
	return (
		<div
			className={[styles.root, className].filter(Boolean).join(' ')}
			{...props}
		>
			<span className={styles.label}>{label}</span>
			{children}
		</div>
	);
};
