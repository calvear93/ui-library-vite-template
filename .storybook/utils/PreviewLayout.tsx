import styles from './PreviewLayout.module.css';

export const PreviewLayout = ({ children }: PreviewLayoutProps) => {
	return <div className={styles.layout}>{children}</div>;
};

export interface PreviewLayoutProps extends React.PropsWithChildren {}
