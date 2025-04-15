import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../constants'

const Login = () => {
	const userId = localStorage.getItem('user_id')

	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [departmentId, setDepartmentId] = useState('')
	const [departments, setDepartments] = useState([])

	const [step, setStep] = useState(1)
	const [isFocused, setIsFocused] = useState(false)

	const navigate = useNavigate()

	const isFullNameValid = fullName.trim().split(' ').length >= 3
	const isEmailValid = email.trim().includes('@')
	const isDepartmentValid = departmentId !== ''

	const isInputEmpty =
		(step === 1 && !isFullNameValid) ||
		(step === 2 && !isDepartmentValid) ||
		(step === 3 && !isEmailValid)
	useEffect(() => {
		// Получаем список департаментов
		const fetchDepartments = async () => {
			try {
				const res = await fetch(`${import.meta.env.VITE_API_URL}/departments`)
				const data = await res.json()
				setDepartments(data)
			} catch (err) {
				console.error('Ошибка при загрузке департаментов:', err)
			}
		}

		fetchDepartments()
	}, [])

	const sendUserDataToServer = async (
		userId,
		fullName,
		email,
		departmentId
	) => {
		try {
			const avatarUrl = `https://eu.ui-avatars.com/api/?name=${fullName
				.trim()
				.split(' ')
				.slice(0, 2)
				.join('+')}&size=50`

			const userData = {
				user_id: Number(userId),
				user_fullname: fullName,
				email: email,
				department_id: departmentId,
				image_path: avatarUrl,
			}

			console.log('Отправляем данные:', userData)

			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/reg_user/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(userData),
				}
			)

			if (!response.ok) {
				const errorData = await response.json()
				console.error(
					'Ошибка при регистрации:',
					errorData.detail || response.status
				)
				return
			}

			const data = await response.json()
			console.log('User registered successfully:', data)
		} catch (error) {
			console.error('Ошибка при отправке данных на сервер:', error)
		}
	}

	const handleNextStep = () => {
		document.getElementById('form-container').classList.add('fade-out')
		setTimeout(() => {
			if (step < 3) {
				setStep(prev => prev + 1)
			} else {
				localStorage.setItem('userFullName', fullName)
				sendUserDataToServer(userId, fullName, email, departmentId)
				navigate('/main')
			}
			document.getElementById('form-container').classList.remove('fade-out')
			document.getElementById('form-container').classList.add('fade-in')
		}, 600)
	}

	return (
		<div
			id='form-container'
			className='h-screen w-screen flex flex-col justify-center items-center text-center p-10'
		>
			<div className={`mb-85`}>
				{step > 1 ? (
					<p className='text-4xl mb-15 text-center text-black z-10 relative'>
						Привет, {fullName.split(' ')[1] || fullName}👋
					</p>
				) : (
					<p className='text-4xl mb-15'>
						Давайте познакомимся – как вас зовут?
					</p>
				)}

				<div className='z-10 w-full max-w-sm flex flex-col items-center transition-opacity duration-300'>
					{step === 1 && (
						<label className='w-full flex flex-col text-lg mb-4'>
							<span
								className='text-start uppercase text-md transition-all'
								style={{
									color: isFocused ? lightTheme.primary : 'black',
								}}
							>
								Введите полное имя
							</span>
							<input
								type='text'
								placeholder='Иванов Иван Иванович'
								value={fullName}
								onChange={e => setFullName(e.target.value)}
								className='text-start border-b-2 border-solid outline-none py-1 w-full transition-all'
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								style={{
									borderColor: isFocused
										? lightTheme.primary
										: lightTheme.secondary,
								}}
							/>
							<span className='text-center text-xs text-black font-thin mt-2'>
								Мы используем ваше имя для персонализации приложения.
							</span>
						</label>
					)}

					{step === 2 && (
						<label className='w-full flex flex-col text-lg mb-4'>
							<span
								className='text-start uppercase text-md mb-2'
								style={{
									color: lightTheme.primary,
								}}
							>
								Выберите департамент
							</span>
							<select
								value={departmentId}
								onChange={e => setDepartmentId(e.target.value)}
								className='text-start border-b-2 border-solid outline-none py-2 w-full transition-all bg-transition'
								style={{
									borderColor: lightTheme.primary,
								}}
							>
								<option value=''>-- Выберите --</option>
								{departments.map(dep => (
									<option key={dep.id} value={dep.id}>
										{dep.DepName}
									</option>
								))}
							</select>
							<span className='text-center text-xs text-black font-thin mt-2'>
								Это поможет нам организовать задачи по отделам.
							</span>
						</label>
					)}

					{step === 3 && (
						<label className='w-full flex flex-col text-lg mb-4'>
							<span
								className='text-start uppercase text-md transition-all'
								style={{
									color: isFocused ? lightTheme.primary : 'black',
								}}
							>
								Введите корпоративную почту
							</span>
							<input
								type='email'
								placeholder='example@melsu.ru'
								value={email}
								onChange={e => setEmail(e.target.value)}
								className='text-start border-b-2 border-solid outline-none py-1 w-full transition-all'
								onFocus={() => setIsFocused(true)}
								onBlur={() => setIsFocused(false)}
								style={{
									borderColor: isFocused
										? lightTheme.primary
										: lightTheme.secondary,
								}}
							/>
							<span className='text-center text-xs text-black font-thin mt-2'>
								Мы используем эти данные для персонализации приложения.
							</span>
						</label>
					)}

					<button
						type='submit'
						className={`mt-6 rounded-full ${
							isInputEmpty ? 'cursor-default' : 'cursor-pointer'
						} text-white font-semibold py-3 text-2xl w-2/3 transition-all`}
						style={{
							backgroundColor: isInputEmpty
								? lightTheme.secondary
								: lightTheme.primary,
						}}
						disabled={isInputEmpty}
						onClick={handleNextStep}
					>
						<div className='flex justify-center items-center gap-5'>
							<p>{step < 3 ? 'Далее' : 'Завершить'}</p>
							<img
								src='assets/icons/arrow-right-svgrepo-com.svg'
								alt=''
								className={`h-10 ${step < 3 ? '' : 'hidden'}`}
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login
