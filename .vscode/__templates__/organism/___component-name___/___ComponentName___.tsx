import { type PropsWithChildren } from 'react';
import styles from './___ComponentName___.module.css';

export interface ___ComponentName___Props extends PropsWithChildren {
	title?: string;
}

/** ___ComponentName___ organism — composes molecules and atoms into a section. */
export const ___ComponentName___ = ({
	children,
	title,
}: ___ComponentName___Props) => {
	return (
		<section className={styles.root}>
			{title ? <h2 className={styles.title}>{title}</h2> : null}
			{children}
		</section>
	);
};
