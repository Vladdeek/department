import { darkTheme, lightTheme } from '../constants'
function DoneTaskCard({ priority, title, date, time, img_path, onClick }) {
	let priorityColor = ''

	switch (priority?.toLowerCase()) {
		case 'выполнена':
			priorityColor = 'bg-[#C3FDC1] text-[#0EC305]'
			break
		default:
			priorityColor = 'bg-gray-300 text-black'
	}
	return (
		<div
			className={`w-full flex flex-col justify-between h-40 rounded-4xl bg-white py-3 px-3 shadow-xl active:shadow-lg active:scale-99 transition-all`}
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
			</div>
			<div className='flex gap-5 m-2'>
				<div className='flex items-center gap-1'>
					<img className='h-4' src='assets/icons/calendar.svg' alt='' />
					<p>{date}</p>
				</div>
				<div className='flex items-center gap-1'>
					<img className='h-4' src='assets/icons/clock.svg' alt='' />
					<p>{time}</p>
				</div>
			</div>
			<div className='flex gap-1 m-2'>
				<p
					className={`text-sm font-semibold py-1 w-25 text-center backdrop-blur-sm rounded-full mr-2 ${priorityColor}`}
				>
					{priority}
				</p>
			</div>
		</div>
	)
}

export default DoneTaskCard
