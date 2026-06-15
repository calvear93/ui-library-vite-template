import { useId } from 'react';
import { Input, type InputProps } from '../../atoms/input/index.ts';
import styles from './Field.module.css';

export interface FieldProps extends InputProps {
	label: string;
}

/** Field molecule: a label bound to an Input atom. */
export const Field = ({ id, label, ...props }: FieldProps) => {
	const autoId = useId();
	const inputId = id ?? autoId;

	return (
		<div className={styles.field}>
			<label className={styles.label} htmlFor={inputId}>
				{label}
			</label>
			<Input id={inputId} {...props} />
		</div>
	);
};
