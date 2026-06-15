import { type FormEventHandler } from 'react';
import { Button } from '../../atoms/button/index.ts';
import { Field } from '../../molecules/field/index.ts';
import styles from './SignUpForm.module.css';

export interface SignUpFormProps {
	/** Submit handler for the form. */
	onSubmit?: FormEventHandler<HTMLFormElement>;
}

/** Sign-up form organism: composes Field molecules and a Button atom. */
export const SignUpForm = ({ onSubmit }: SignUpFormProps) => {
	return (
		<form className={styles.form} onSubmit={onSubmit}>
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
