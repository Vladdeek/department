import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { darkTheme, lightTheme } from '../constants'

const Login = () => {
	const userId = localStorage.getItem('user_id')

	const [fullName, setFullName] = useState('')
	const [groupNumber, setGroupNumber] = useState('')
	const [step, setStep] = useState(1)
	const [isFocused, setIsFocused] = useState(false)

	const navigate = useNavigate()

	const isFullNameValid = fullName.trim().split(' ').length >= 3
	const isGroupNumberValid = groupNumber.trim().split('@').length >= 2

	const isInputEmpty = step === 1 ? !isFullNameValid : !isGroupNumberValid

	const sendUserDataToServer = async (userId, fullName, groupNumber) => {
		try {
			const userData = {
				user_id: Number(userId), // на всякий случай
				user_fullname: fullName,
				user_group: groupNumber,
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
				console.log(
					'Отправляемые данные в fetch:',
					JSON.stringify(userData, null, 2)
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
		if (step === 1) {
			document.getElementById('form-container').classList.add('fade-out')
			setTimeout(() => {
				setStep(2)
				document.getElementById('form-container').classList.remove('fade-out')
				document.getElementById('form-container').classList.add('fade-in')
			}, 600)
		} else {
			// Сохраняем имя в localStorage
			localStorage.setItem('userFullName', fullName)

			// Отправляем данные на сервер
			sendUserDataToServer(userId, fullName, groupNumber)

			// Переходим на главную страницу
			navigate('/main')
		}
	}

	return (
		<div
			id='form-container'
			className='h-screen w-screen flex flex-col justify-center items-center text-center p-10'
		>
			<div className={`mb-85`}>
				{step !== 1 ? (
					<p className='text-4xl mb-15 text-center text-black z-10 relative'>
						Привет, {fullName.split(' ')[1] || fullName}👋
					</p>
				) : (
					<p className='text-4xl mb-15'>
						Давайте познакомимся – как вас зовут?
					</p>
				)}
				<div className='z-10 w-full max-w-sm flex flex-col items-center transition-opacity duration-300'>
					<label className='w-full flex flex-col text-lg mb-4'>
						<span
							className='text-start uppercase text-md transition-all'
							style={{
								color: isFocused ? lightTheme.primary : 'black',
							}}
						>
							{step === 1
								? 'Введите полное имя'
								: 'Введите корпоративную почту'}
						</span>
						<input
							type={step === 1 ? 'text' : 'email'}
							placeholder={
								step === 1 ? 'Иванов Иван Иванович' : 'exemple@melsu.ru'
							}
							value={step === 1 ? fullName : groupNumber}
							onChange={e =>
								step === 1
									? setFullName(e.target.value)
									: setGroupNumber(e.target.value)
							}
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
							{step === 1
								? 'Мы используем ваше имя для персонализации приложения.'
								: 'Мы используем эти данные для персонализации приложения.'}
						</span>
					</label>
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
							<p className={` ${step === 1 ? 'ml-5' : ''}`}>
								{step === 1 ? 'Далее' : 'Подтвердить'}
							</p>
							<img
								src='assets/icons/arrow-right-svgrepo-com.svg'
								alt=''
								className={`h-10 ${step === 1 ? '' : 'hidden'}`}
							/>
						</div>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Login
