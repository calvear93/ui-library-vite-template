import { type HTMLAttributes, type ReactNode } from 'react';
import styles from './Stack.module.css';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	/** Layout axis. */
	direction?: 'column' | 'row';
	/** Space between children, in rem. */
	gap?: number;
}

/** Stack layout — arranges its children along one axis with a uniform gap. */
export const Stack = ({
	children,
	direction = 'column',
	gap = 1,
	style,
	...props
}: StackProps) => {
	return (
		<div
			className={styles.stack}
			style={{ flexDirection: direction, gap: `${gap}rem`, ...style }}
			{...props}
		>
			{children}
		</div>
	);
};
