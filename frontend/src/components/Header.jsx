import { useEffect, useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../constants'

function Header({ username }) {
	const navigate = useNavigate()

	return (
		<header
			className=' w-full h-25 bg-white flex justify-between items-center px-5 rounded-b-4xl'
			style={{
				color: lightTheme.text,
			}}
		>
			<div className='flex flex-col'>
				<p className={`font-semibold text-xl`}>Привет, {username} 👋</p>
				<p className='font-thin text-sm'>Сотрудник</p>
			</div>
		</header>
	)
}

export default Header
