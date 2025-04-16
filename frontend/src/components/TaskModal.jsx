import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

function TaskModal({ task, from, onClose }) {
	if (!task) return null

	const [departments, setDepartments] = useState([])
	const [cabinets, setCabinets] = useState([])

	useEffect(() => {
		fetch('http://localhost:8000/departments')
			.then(res => res.json())
			.then(data => {
				setDepartments(data)
			})
		fetch('http://localhost:8000/cabinets')
			.then(res => res.json())
			.then(data => {
				setCabinets(data)
			})
	}, [])

	const updateTaskStatus = async (taskId, newStatusId) => {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/task/${taskId}/status`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ status_id: newStatusId }),
			}
		)
		onClose(false)
		location.reload()
	}

	const departmentName = departments.find(
		dep => dep.id === task.sender_user?.department_id
	)?.DepName

	const departmentCabinetNumber = departments.find(
		dep => dep.id === task.sender_user?.department_id
	)?.cabinet?.number

	const priorityDescriptions = {
		Низкий: 'срок выполнения — до конца рабочего дня',
		Средний: 'срок выполнения — 1-2 часа',
		Высокий: 'срок выполнения — как можно скорее',
	}

	return (
		<div className='fixed inset-0 bg-[#00000025] flex items-end z-50'>
			<motion.div
				initial={{ translateY: '100%' }}
				animate={{ translateY: '0%' }}
				exit={{ translateY: '100%' }}
				transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
				className='w-full bg-white rounded-t-3xl p-6'
				style={{ minHeight: '75vh' }}
			>
				<div className='flex justify-end'>
					<button onClick={onClose} className='text-gray-500 text-xl'>
						<img
							src='assets/icons/plus.svg'
							alt=''
							className=' h-7 w-7 rotate-45 active:scale-97 transition-all '
						/>
					</button>
				</div>

				<p className='ml-2'>Заголовок</p>
				<h2 className='w-full p-3 mb-3 rounded-xl bg-[#efefef]'>
					{task.title}
				</h2>
				<p className='ml-2'>Описание</p>
				<p className='w-full p-3 mb-3 h-30 rounded-xl bg-[#efefef]'>
					{task.description}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Исполнитель: {task.executing_user?.user_fullname}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Отправитель: {task.sender_user?.user_fullname}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Отдел: {departmentName} {departmentCabinetNumber}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Приоритет: {task.priority?.priority}
					{task.priority?.priority && (
						<span className='ml-2 text-gray-400'>
							({priorityDescriptions[task.priority.priority] || 'без описания'})
						</span>
					)}
				</p>

				<button
					onClick={() => {
						if (from === 'ToMe') {
							updateTaskStatus(task.id, 2)
						} else if (from === 'FromMe') {
							updateTaskStatus(task.id, 3)
						}
					}}
					className={`${
						from === 'Done' ? 'hidden' : ''
					} bg-black font-semibold text-white border-2 border-black rounded-2xl w-full py-3 mt-7 active:bg-white active:text-black transition-all `}
				>
					{from === 'ToMe'
						? 'Отметить как выполненное'
						: from === 'FromMe'
						? 'Подтвердить выполнение'
						: ''}
				</button>
			</motion.div>
		</div>
	)
}

export default TaskModal
