import './SampleInput.scss';

export const SampleInput = ({
	id,
	label,
	type,
	...props
}: SampleInputProps) => {
	return (
		<div className='lib-sample-input'>
			<label htmlFor={id}>
				<div className='i-mdi-arrow-forward text-orange-400' />
				{label}
			</label>
			<input id={id} type={type} {...props} />
		</div>
	);
};

export interface SampleInputProps
	extends React.HTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	type: React.HTMLInputTypeAttribute;
}
