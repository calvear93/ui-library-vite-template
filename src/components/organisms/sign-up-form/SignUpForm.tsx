import { type FormHTMLAttributes } from 'react';
import { Button } from '../../atoms/button/index.ts';
import { Field } from '../../molecules/field/index.ts';
import styles from './SignUpForm.module.css';

export type SignUpFormProps = FormHTMLAttributes<HTMLFormElement>;

/** Sign-up form organism: composes Field molecules and a Button atom. */
export const SignUpForm = ({ className, ...props }: SignUpFormProps) => {
	return (
		<form
			className={[styles.form, className].filter(Boolean).join(' ')}
			{...props}
		>
			<h2 className={styles.title}>
				<span aria-hidden='true' className={styles.icon} />
				Create account
			</h2>
			<Field label='Email' name='email' required type='email' />
			<Field label='Password' name='password' required type='password' />
			<Button text='Sign up' type='submit' />
		</form>
	);
};
