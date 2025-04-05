import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
	const navigate = useNavigate()

	useEffect(() => {
		setTimeout(() => {
			navigate("/")
		}, 3000)
	}, [])

	return (
		<div className="full-screen flex flex-col justify-center items-center bg-slate-800">
			<h1 className="text-white text-2xl">Page Not Found</h1>
			<img className="h-[250px]" src="/icons/camera.png" />
		</div>
	)
}

export default NotFound
