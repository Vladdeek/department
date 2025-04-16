import { useState, useEffect } from 'react'
import TaskCard from '../../components/TaskCard'
import TaskModal from '../../components/TaskModal'
import { motion } from 'framer-motion'

function FromMe() {
	const userId = localStorage.getItem('user_id')

	const [userData, setUserData] = useState(null)
	const [taskData, setTaskData] = useState([])
	const [selectedTask, setSelectedTask] = useState(null) // для хранения выбранной задачи
	const [isLoading, setIsLoading] = useState(true)

	const shortMonths = [
		'Янв.',
		'Фев.',
		'Март', // Можешь сократить до 'Мар.' если хочешь, но так читаемее
		'Апр.',
		'Май', // Оставил как есть, он и так короткий
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
		const year = date.getFullYear()
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
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				}
			)
			const data = await response.json()
			setUserData(data)
		}

		const fetchTask = async userId => {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/TaskFromMe/${userId}`,
				{
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
				}
			)
			const data = await response.json()
			const filteredTasks = data.filter(
				task => task.status_id === 1 || task.status_id === 2
			)
			setTaskData(filteredTasks)
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
						<TaskCard
							priority={task.priority?.priority || '—'}
							title={task.title}
							img_path={
								task.sender_user?.image_path || 'https://placehold.co/50x50.png'
							}
							username={
								task.sender_user?.user_fullname.split(' ')[1] || 'Неизвестно'
							}
							description={task.description}
							date={formatDate(task.date)}
							time={formatTime(task.date)}
							onClick={() => setSelectedTask(task)} // при клике
						/>
					</motion.div>
				))
			) : (
				<p className='text-center text-gray-500'>Задач нет 💤</p>
			)}

			{selectedTask && (
				<TaskModal
					task={selectedTask}
					from='FromMe'
					onClose={() => setSelectedTask(null)}
				/>
			)}
		</>
	)
}

export default FromMe
