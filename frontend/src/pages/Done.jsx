import { useState, useEffect } from 'react'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import DoneTaskCard from '../components/DoneTaskCard'

function Done() {
	const userId = localStorage.getItem('user_id')
	const navigate = useNavigate()

	const [userData, setUserData] = useState(null)
	const [taskData, setTaskData] = useState([])
	const [selectedTask, setSelectedTask] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	const shortMonths = [
		'Янв.',
		'Фев.',
		'Март',
		'Апр.',
		'Май',
		'Июнь',
		'Июль',
		'Авг.',
		'Сен.',
		'Окт.',
		'Ноя.',
		'Дек.',
	]

	const formatDate = dateString => {
		const date = new Date(dateString)
		const month = shortMonths[date.getMonth()]
		const day = date.getDate()
		return `${day} ${month}`
	}

	const formatTime = dateString => {
		const date = new Date(dateString)
		const hours = String(date.getHours()).padStart(2, '0')
		const minutes = String(date.getMinutes()).padStart(2, '0')
		return `${hours}:${minutes}`
	}

	useEffect(() => {
		const checkUserExists = async userId => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/user/${userId}`,
				{ method: 'GET', headers: { 'Content-Type': 'application/json' } }
			)
			const data = await response.json()
			setUserData(data)
		}

		const fetchTask = async userId => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/TaskToMe/${userId}`,
				{ method: 'GET', headers: { 'Content-Type': 'application/json' } }
			)
			const data = await response.json()

			if (Array.isArray(data)) {
				const activeTasks = data.filter(
					task => task.status_id === 2 || task.status_id === 3
				)
				setTaskData(activeTasks)
			} else {
				console.error('Expected an array, but got:', data)
			}

			setIsLoading(false)
		}

		const loadData = async () => {
			await checkUserExists(userId)
			await fetchTask(userId)
		}

		loadData()
	}, [])

	return (
		<>
			<button
				className='flex h-12 m-4 items-center bg-[#ffffff50] rounded-2xl shadow-sm active:bg-[#ffffff75] active:scale-98 active:shadow-xs p-2 transition-all'
				onClick={() => navigate('/main')}
			>
				<img
					className='rotate-180 h-full invert-100'
					src='assets/icons/arrow-right-svgrepo-com.svg'
					alt=''
				/>
				<p className='text-xl font-semibold uppercase'>Назад</p>
			</button>
			<div className='p-4'>
				{isLoading ? (
					<p className='text-center text-gray-500 text-lg mt-4'>Загрузка...</p>
				) : taskData.length > 0 ? (
					taskData.map((task, idx) => (
						<motion.div
							key={task.id}
							initial={{ opacity: 0, y: 20, scale: 0.95 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{
								delay: idx * 0.15,
								duration: 0.45,
								ease: 'easeOut',
							}}
							className='mb-4'
						>
							<DoneTaskCard
								priority={task.status?.status || '—'}
								title={task.title}
								img_path={
									task.sender_user?.image_path ||
									'https://placehold.co/50x50.png'
								}
								username={
									task.sender_user?.user_fullname
										?.trim()
										.split(' ')
										.slice(0, 2)
										.join(' + ') || 'Неизвестно'
								}
								date={formatDate(task.date)}
								time={formatTime(task.date)}
								onClick={() => setSelectedTask(task)}
							/>
						</motion.div>
					))
				) : (
					<p className='text-center text-gray-500 text-lg mt-4'>Задач нет 💤</p>
				)}

				{selectedTask && (
					<TaskModal
						task={selectedTask}
						from='Done'
						onClose={() => setSelectedTask(null)}
					/>
				)}
			</div>
		</>
	)
}

export default Done
