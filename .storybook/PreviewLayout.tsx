export const PreviewLayout = ({ children }: PreviewLayoutProps) => {
	return <div style={{ margin: '1rem' }}>{children}</div>;
};

export interface PreviewLayoutProps extends React.PropsWithChildren {}
