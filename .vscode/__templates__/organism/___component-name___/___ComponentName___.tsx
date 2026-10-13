import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	/** Optional section heading. */
	title?: string;
}

/** ___ComponentName___ organism — composes molecules and atoms into a section. */
export const ___ComponentName___ = ({
	children,
	className,
	title,
	...props
}: ___ComponentName___Props) => {
	return (
		<section
			className={[styles.root, className].filter(Boolean).join(' ')}
			{...props}
		>
			{title ? <h2 className={styles.title}>{title}</h2> : null}
			{children}
		</section>
	);
};
