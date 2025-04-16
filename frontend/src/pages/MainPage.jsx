import { useState, useEffect } from 'react'
import Header from '../components/Header'
import TaskModal from '../components/TaskModal'
import { motion } from 'framer-motion'
import TwoTabs from '../components/TwoTabs'
import ToMe from './chapters/ToMe'
import FromMe from './chapters/FromMe'
import TaskCreateModal from '../components/TaskCreateModal'

function MainPage() {
	const userId = localStorage.getItem('user_id')
	const [isModalOpen, setIsModalOpen] = useState(false)

	const [userData, setUserData] = useState(null)
	const [activeTab, setActiveTab] = useState('toMe')

	const [toMeCount, setToMeCount] = useState(0)
	const [fromMeCount, setFromMeCount] = useState(0)
	const [doneCount, setDoneCount] = useState(0)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch(
					`http://192.168.167.48:8000/user/${userId}`
				)
				if (!response.ok) {
					console.error('Пользователь не найден')
					return
				}
				const data = await response.json()
				setUserData(data)
			} catch (error) {
				console.error('Ошибка при загрузке пользователя:', error)
			}
		}

		if (userId) {
			fetchUser()
		}
		const fetchTaskCounts = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/task-counts/${userId}`
			)
			const data = await res.json()
			setToMeCount(data.to_me)
			setFromMeCount(data.from_me)
			setDoneCount(data.done_today)
		}

		fetchTaskCounts()
	}, [])

	return (
		<div className='flex flex-col h-screen'>
			<Header
				username={userData ? userData.user_fullname.split(' ')[1] : ''}
				image_path={
					userData ? userData.image_path : 'https://placehold.co/50x50.png'
				}
				onCreateTask={() => setIsModalOpen(true)}
				done_count={doneCount || 0}
			/>
			<TwoTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				toMeTasksCount={toMeCount}
				fromMeTasksCount={fromMeCount}
			/>

			<div className='flex-1 overflow-y-auto px-4'>
				{activeTab === 'toMe' && <ToMe />}
				{activeTab === 'fromMe' && <FromMe />}
			</div>
			{isModalOpen && <TaskCreateModal onClose={() => setIsModalOpen(false)} />}
		</div>
	)
}

export default MainPage
