import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../constants'

function Header({ username, image_path }) {
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
			className='relative w-full h-[33vh] flex justify-between items-center px-5'
			style={{
				color: lightTheme.text,
			}}
		>
			<img
				src={image_path}
				alt=''
				className='absolute top-4 right-4 h-12 w-12 object-cover rounded-2xl'
			/>
			<div className='flex flex-col gap-3 mt-15'>
				<h1 className='text-2xl font-bold flex items-center gap-2'>
					Привет, {username}!{' '}
					<img src='assets/1f44b.webp' alt='' className='h-6' />
				</h1>
				<h2 className='text-5xl font-bold'>{greeting}</h2>
				<p className='text-lg font-light'>
					Ты выполнил <span className='font-semibold'>5 задач</span> сегодня
				</p>
			</div>
		</header>
	)
}

export default Header
