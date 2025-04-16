import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import Loading from './pages/Loading'
import MainPage from './pages/MainPage'
import Done from './pages/Done'

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Loading />} />
				<Route path='/login' element={<Login />} />
				<Route path='/main' element={<MainPage />} />
				<Route path='/done' element={<Done />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
