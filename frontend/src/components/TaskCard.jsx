import { darkTheme, lightTheme } from '../constants'
function TaskCard({
	priority,
	title,
	description,
	date,
	time,
	img_path,
	username,
	onClick,
}) {
	return (
		<div
			className={`w-full rounded-4xl bg-white py-3 px-4 shadow-xl active:shadow-lg active:scale-99 transition-all`}
			style={{
				color: lightTheme.text,
			}}
			onClick={onClick}
		>
			<div className='flex justify-between items-center mt-1'>
				<div className='flex items-center gap-2'>
					<img className='h-10 w-10 rounded-full' src={img_path} alt='' />
					<p>{username}</p>
				</div>

				<p
					className={`text-sm font-normal py-1 w-20 text-center backdrop-blur-sm rounded-full mr-2`}
					style={{
						backgroundColor: lightTheme.primary,
						color: lightTheme.background,
					}}
				>
					{priority}
				</p>
			</div>

			<p className={`text-lg font-semibold mt-2`}>{title}</p>
			<p className={`text-md font-normal`}>{description}</p>
			<div className='flex gap-5 opacity-50'>
				<div className='flex items-center gap-1'>
					<img className='h-4' src='assets/icons/calendar.svg' alt='' />
					<p>{date}</p>
				</div>
				<div className='flex items-center gap-1'>
					<img className='h-4' src='assets/icons/clock.svg' alt='' />
					<p>{time}</p>
				</div>
			</div>
		</div>
	)
}

export default TaskCard
