import { useState } from 'react'

const TwoTabs = ({
	activeTab,
	setActiveTab,
	toMeTasksCount,
	fromMeTasksCount,
}) => {
	return (
		<div className='w-full mb-4'>
			<div className='flex justify-around relative'>
				<div
					onClick={() => setActiveTab('toMe')}
					className={`text-2xl pb-2 cursor-pointer transition-all ${
						activeTab === 'toMe'
							? 'opacity-100 font-bold'
							: 'opacity-50 font-semibold'
					}`}
				>
					Мне({toMeTasksCount})
				</div>
				<div
					onClick={() => setActiveTab('fromMe')}
					className={`text-2xl pb-2 cursor-pointer transition-all ${
						activeTab === 'fromMe'
							? 'opacity-100 font-bold'
							: 'opacity-50 font-semibold'
					}`}
				>
					От меня({fromMeTasksCount})
				</div>

				<div className='absolute bottom-0 left-0 w-full h-[2px] bg-black opacity-25' />

				<div
					className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300`}
					style={{
						width: '50%',
						left: activeTab === 'toMe' ? '0%' : '50%',
						opacity: 1,
					}}
				/>
			</div>
		</div>
	)
}

export default TwoTabs
