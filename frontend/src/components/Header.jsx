import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../constants'

function Header({ username, image_path, onCreateTask, done_count }) {
	const navigate = useNavigate()
	const [greeting, setGreeting] = useState('')

	useEffect(() => {
		const hour = new Date().getHours()

		if (hour >= 5 && hour < 12) {
			setGreeting('Доброе утро')
		} else if (hour >= 12 && hour < 18) {
			setGreeting('Добрый день')
		} else {
			setGreeting('Добрый вечер')
		}
	}, [])

	return (
		<header
			className=' w-full h-[40vh] flex flex-col items-start px-5'
			style={{
				color: lightTheme.text,
			}}
		>
			<div className='flex w-full justify-between mt-4'>
				<button
					onClick={onCreateTask}
					className='flex gap-2 items-center bg-[#ffffff50] rounded-2xl shadow-sm active:bg-[#ffffff75] active:scale-98 active:shadow-xs p-2 transition-all'
				>
					<img src='assets/icons/plus.svg' alt='' className=' ' />
					<p className='font-semibold'>Создать задачу</p>
				</button>
				<div className='flex gap-3'>
					<img
						src='assets/icons/clipboard-check.svg'
						alt=''
						className=' h-12 w-12 object-cover rounded-2xl p-2 bg-[#ffffff50] shadow-sm active:bg-[#ffffff75] active:scale-95 active:shadow-xs transition-all'
						onClick={() => navigate('/done')}
					/>
					<img
						src={image_path}
						alt=''
						className=' h-12 w-12 object-cover rounded-2xl'
					/>
				</div>
			</div>

			<div className='flex flex-col gap-3 mt-15'>
				<h1 className='text-2xl font-bold flex items-center gap-2'>
					Привет, {username}!{' '}
					<img src='assets/1f44b.webp' alt='' className='h-6' />
				</h1>
				<h2 className='text-5xl font-bold'>{greeting}</h2>
				<p className='text-lg font-light'>
					Ты выполнил <span className='font-semibold'>{done_count} задач</span>{' '}
					сегодня
				</p>
			</div>
		</header>
	)
}

export default Header
