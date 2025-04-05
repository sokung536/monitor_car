import "./global.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Monitor from "./pages/Monitor"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

function App() {
	return (
		<div className="full-screen">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/monitor" element={<Monitor />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App
