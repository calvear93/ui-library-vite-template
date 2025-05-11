import styles from './SampleButton.module.css';

export const SampleButton = ({ text }: SampleButtonProps) => {
	return <button className={styles.button}>{text}</button>;
};

export interface SampleButtonProps
	extends React.HTMLAttributes<HTMLButtonElement> {
	text: string;
}
