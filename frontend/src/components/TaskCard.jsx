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
	let priorityColor = ''

	switch (priority?.toLowerCase()) {
		case 'низкий':
			priorityColor = 'bg-[#C3FDC1] text-[#0EC305]'
			break
		case 'средний':
			priorityColor = 'bg-[#FDF8C1] text-[#C3B505]'
			break
		case 'высокий':
			priorityColor = 'bg-[#FF9C9C] text-[#C30505]'
			break
		default:
			priorityColor = 'bg-gray-300 text-black'
	}
	return (
		<div
			className={`w-full flex flex-col justify-between h-50 rounded-4xl bg-white py-3 px-3 shadow-xl active:shadow-lg active:scale-99 transition-all`}
			style={{
				color: lightTheme.text,
			}}
			onClick={onClick}
		>
			<div className='flex flex-col gap-3 ml-3'>
				<div className='flex justify-between items-center'>
					<p className={`text-2xl font-bold mt-2`}>{title}</p>
					<img className='h-10 w-10 rounded-full' src={img_path} alt='' />
				</div>
				<p className={`text-md font-semibold opacity-75`}>{description}</p>
			</div>

			<div className='flex gap-1 m-2'>
				<p
					className={`text-sm font-semibold py-1 w-20 text-center backdrop-blur-sm rounded-full mr-2 ${priorityColor}`}
				>
					{priority}
				</p>
				<div className='flex gap-5'>
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
		</div>
	)
}

export default TaskCard
