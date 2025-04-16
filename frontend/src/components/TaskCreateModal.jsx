import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { darkTheme, lightTheme } from '../constants'

const TaskCreateModal = ({ onClose }) => {
	const [departments, setDepartments] = useState([])
	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState([]) // Состояние для фильтрации пользователей
	const [priorities, setPriorities] = useState([])
	const userId = localStorage.getItem('user_id')
	const [formData, setFormData] = useState({
		title: '',
		description: '',
		departmentId: '',
		executing: '',
		priority_id: '',
	})
	const isFormValid =
		formData.title &&
		formData.departmentId &&
		formData.executing &&
		formData.priority_id

	useEffect(() => {
		if (open) {
			// Загружаем все департаменты и приоритеты
			fetch('http://localhost:8000/departments')
				.then(res => res.json())
				.then(data => {
					setDepartments(data)
				})

			fetch('http://localhost:8000/priorities')
				.then(res => res.json())
				.then(data => {
					setPriorities(data)
				})

			// Загружаем всех пользователей
			fetch('http://localhost:8000/users')
				.then(res => res.json())
				.then(data => {
					console.log(data)
					setUsers(data)
				})
		}
	}, [])

	useEffect(() => {
		if (formData.departmentId) {
			const filtered = users.filter(
				user => user.department_id === Number(formData.departmentId)
			)
			setFilteredUsers(filtered)
		}
	}, [formData.departmentId, users]) // Перезапускаем, когда меняется departmentId или список пользователей

	const handleSubmit = () => {
		const body = {
			title: formData.title,
			description: formData.description,
			executing: Number(formData.executing),
			sender: userId,
			priority_id: Number(formData.priority_id),
			date: new Date().toISOString(),
			status_id: 1,
		}

		fetch('http://localhost:8000/task', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then(res => res.json())
			.then(() => {
				onClose(false)
				location.reload()
			})
			.catch(err => {
				console.error('Ошибка создания задачи:', err)
			})
	}
	return (
		<div className='fixed inset-0 bg-[#00000025] flex items-end z-50'>
			<motion.div
				initial={{ translateY: '100%' }}
				animate={{ translateY: '0%' }}
				exit={{ translateY: '100%' }}
				transition={{ type: 'tween', ease: 'easeOut', duration: 0.25 }}
				className='w-full bg-white rounded-t-3xl'
				style={{ minHeight: '75vh' }}
			>
				<div className='flex w-full justify-between items-center mt-2'>
					<button
						onClick={onClose}
						className='text-start w-full text-lg ml-4 font-medium'
					>
						Закрыть
					</button>
					<p className='w-full text-2xl whitespace-nowrap font-semibold text-center'>
						Новая задача
					</p>
					<button
						onClick={handleSubmit}
						disabled={!isFormValid}
						className={`w-full text-lg text-end mr-4 font-medium ${
							!isFormValid ? 'opacity-50 pointer-events-none' : ''
						}`}
					>
						Готово
					</button>
				</div>
				<div className='p-5'>
					<label>
						<span>Заголовок</span>
						<input
							type='text'
							placeholder='Введите заголовок'
							value={formData.title}
							onChange={e =>
								setFormData({ ...formData, title: e.target.value })
							}
							className='w-full p-3 mb-3 rounded-xl bg-[#efefef]'
						/>
					</label>

					<label>
						<span>Описание</span>
						<textarea
							placeholder='Введите описание'
							value={formData.description}
							onChange={e =>
								setFormData({ ...formData, description: e.target.value })
							}
							className='w-full p-3 mb-3 rounded-xl bg-[#efefef]'
						/>
					</label>

					<label>
						<span>Отдел</span>
						<select
							value={formData.departmentId}
							onChange={e =>
								setFormData({ ...formData, departmentId: e.target.value })
							}
							className='w-full p-3 mb-3 rounded-xl bg-[#efefef]'
						>
							<option className='text-black' value=''>
								Выберите отдел
							</option>
							{departments.map(dep => (
								<option key={dep.id} value={dep.id}>
									{dep.DepName}
								</option>
							))}
						</select>
					</label>

					<label>
						<span>Исполнитель</span>
						<select
							value={formData.executing}
							onChange={e =>
								setFormData({ ...formData, executing: e.target.value })
							}
							className='w-full p-3 mb-3 rounded-xl bg-[#efefef]'
						>
							<option className='text-black' value=''>
								Выберите исполнителя
							</option>
							{filteredUsers.map(user => (
								<option
									key={user.id}
									value={user.user_id}
									className='text-black'
								>
									{user.user_fullname}
								</option>
							))}
						</select>
					</label>

					<div className='w-full'>
						<label>
							<span className='block mb-2'>Приоритет выполнения задачи</span>
							<div className='flex justify-between'>
								{priorities.map(priority => {
									let baseColor = ''
									let grayColor = 'bg-[#E4E4E4] text-[#9B9B9B]'

									switch (priority.priority.toLowerCase()) {
										case 'низкий':
											baseColor = 'bg-[#C3FDC1] text-[#0EC305]'
											break
										case 'средний':
											baseColor = 'bg-[#FDF8C1] text-[#C3B505]'
											break
										case 'высокий':
											baseColor = 'bg-[#FF9C9C] text-[#C30505]'
											break
										default:
											baseColor = 'bg-gray-300 text-black'
									}

									const isSelected = formData.priority_id === priority.id

									return (
										<button
											key={priority.id}
											type='button'
											className={`font-bold p-3 rounded-xl transition-all ${
												isSelected ? baseColor : grayColor
											}`}
											onClick={() =>
												setFormData({ ...formData, priority_id: priority.id })
											}
										>
											{priority.priority}
										</button>
									)
								})}
							</div>
						</label>
					</div>

					<button
						onClick={handleSubmit}
						disabled={!isFormValid}
						className={`w-full py-2 rounded-xl mt-3 transition-all ${
							isFormValid
								? 'text-white border border-black bg-black active:bg-white active:text-black'
								: 'bg-white text-black border border-black cursor-not-allowed opacity-50'
						}`}
					>
						Создать задачу
					</button>
				</div>
			</motion.div>
		</div>
	)
}

export default TaskCreateModal
