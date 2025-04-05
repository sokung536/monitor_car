export function Button({ text, className = "", onClick }: { text: string; className?: string; onClick: () => void }) {
	return (
		<div
			className={`px-6 py-2 shadow-xl rounded-lg text-center hover:cursor-pointer hover:-translate-y-1 duration-300 ease-in-out text-lg ${className}`}
			onClick={onClick}
		>
			<span>{text}</span>
		</div>
	)
}

Button
