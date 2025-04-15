import { darkTheme, lightTheme } from '../constants'
function LoadingCard({}) {
	return (
		<div
			className={`w-full flex flex-col justify-between h-50 rounded-4xl bg-white py-3 px-3 shadow-md transition-all mb-4`}
			style={{
				color: lightTheme.text,
			}}
		>
			<div className='flex flex-col gap-3 ml-3'>
				<div className='flex justify-between items-center'>
					<div
						className={`w-[85%] h-[85%] rounded-lg font-bold bg-[#efefef]`}
					></div>
					<div className='h-10 w-10 rounded-full bg-[#efefef]' />
				</div>
				<div className={`w-full h-20 rounded-lg bg-[#efefef]`}></div>
			</div>

			<div className='flex gap-1 m-2'>
				<div
					className={`text-sm font-normal h-7 w-20 text-center backdrop-blur-sm rounded-full mr-2 bg-[#efefef]`}
				></div>
				<div className='flex gap-5'>
					<div className='flex items-center gap-1'>
						<img className='h-4 ' src='assets/icons/calendar.svg' alt='' />
						<div className='bg-[#efefef] w-14 h-4 rounded-md'></div>
					</div>
					<div className='flex items-center gap-1'>
						<img className='h-4 ' src='assets/icons/clock.svg' alt='' />
						<div className='bg-[#efefef] w-14 h-4 rounded-md'></div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default LoadingCard
