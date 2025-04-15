import { motion } from 'framer-motion'

function TaskModal({ task, onClose }) {
	if (!task) return null

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
						×
					</button>
				</div>

				<h2 className='text-2xl font-bold mb-2'>{task.title}</h2>
				<p className='text-sm mb-4'>{task.description}</p>
				<p className='text-sm text-gray-500 mb-1'>
					Исполнитель: {task.executing_user?.user_fullname}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Отправитель: {task.sender_user?.user_fullname}
				</p>
				<p className='text-sm text-gray-500 mb-1'>
					Приоритет: {task.priority?.priority}
				</p>
			</motion.div>
		</div>
	)
}

export default TaskModal
