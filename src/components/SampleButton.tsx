import styles from './SampleButton.module.scss';

export const SampleButton = ({ text }: SampleButtonProps) => {
	return <button className={styles.button}>{text}</button>;
};

export interface SampleButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	text: string;
}
