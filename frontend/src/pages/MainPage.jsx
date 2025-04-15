import { useState, useEffect } from 'react'
import Header from '../components/Header'
import TaskModal from '../components/TaskModal'
import { motion } from 'framer-motion'
import TwoTabs from '../components/TwoTabs'
import ToMe from './chapters/ToMe'
import FromMe from './chapters/FromMe'

function MainPage() {
	const userId = localStorage.getItem('user_id')

	const [userData, setUserData] = useState(null)
	const [activeTab, setActiveTab] = useState('toMe')

	const [toMeCount, setToMeCount] = useState(0)
	const [fromMeCount, setFromMeCount] = useState(0)

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
			console.log(data)
			setUserData(data)
		}
		const fetchTaskCounts = async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/task-counts/${userId}`
			)
			const data = await res.json()
			setToMeCount(data.to_me)
			setFromMeCount(data.from_me)
		}

		fetchTaskCounts()
		checkUserExists(userId)
	}, [])

	return (
		<div className='flex flex-col h-screen'>
			<Header
				username={userData ? userData.user_fullname.split(' ')[1] : ''}
				image_path={
					userData ? userData.image_path : 'https://placehold.co/50x50.png'
				}
			/>
			<TwoTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				toMeTasksCount={toMeCount}
				fromMeTasksCount={fromMeCount}
			/>

			{/* Скролл только здесь 👇 */}
			<div className='flex-1 overflow-y-auto px-4'>
				{activeTab === 'toMe' && <ToMe />}
				{activeTab === 'fromMe' && <FromMe />}
			</div>
		</div>
	)
}

export default MainPage
