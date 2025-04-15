import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

function Loading() {
	const navigate = useNavigate()

	useEffect(() => {
		localStorage.clear()
		const urlParams = new URLSearchParams(window.location.search)
		const userId = urlParams.get('user_id')

		console.log('User ID из URL:', userId)

		if (userId) {
			localStorage.setItem('user_id', userId)
			const checkUserExists = async userId => {
				try {
					const response = await fetch(
						`${import.meta.env.VITE_API_URL}/auth/${userId}`,
						{
							method: 'GET',
							headers: { 'Content-Type': 'application/json' },
						}
					)
					if (!response.ok) {
						throw new Error('Пользователь не найден')
					}

					const data = await response.json()
					console.log('Пользователь найден:', data.exists)

					// Задержка перед перенаправлением
					setTimeout(() => {
						if (data.exists) {
							navigate('/main')
						} else {
							navigate('/login')
						}
					}, 1500) // 1 секунда
				} catch (error) {
					console.error('Ошибка при отправке запроса:', error)
					setTimeout(() => {
						navigate('/login')
					}, 1500) // 1 секунда
				}
			}
			checkUserExists(userId)
		}
	}, [navigate])

	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<img src='Artboard 1.png' alt='' className='h-50 w-50' />
		</div>
	)
}

export default Loading
