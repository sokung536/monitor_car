import { Button } from "@/components/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SyncLoader from "react-spinners/SyncLoader"
import axios from "axios"
import Cookies from "js-cookie"

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Login() {
	const [email, setEmail] = useState("")
	const [isLoading, setLoading] = useState(false)
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	const handleLogin = async () => {
		try {
			setLoading(true)
			const response = await axios.post(`${API_BASE_URL}/api/login`, {
				email,
				password,
			})
			setTimeout(() => {
				setLoading(false)

				if (response.data.token) {
					Cookies.set("token", response.data.token, { expires: 7 })
					navigate("/monitor")
				} else {
					setError("Login failed. Please check your credentials.")
				}
			}, 2000)
		} catch (err) {
			console.error("Login error:", err)
			setLoading(false)
			setError("An unexpected error occurred. Please try again later.")
		}
	}

	const handleRegister = async () => {
		navigate("/register")
	}

	if (isLoading) {
		return (
			<div className="full-screen flex-center bg-slate-800">
				<SyncLoader size={20} color="#ffffff" margin={4} />
			</div>
		)
	}

	return (
		<div className="full-screen flex justify-center items-center bg-slate-800">
			<Card className="h-auto w-[60%] min-w-[400px] max-w-[650px] bg-gray-100">
				<CardHeader>
					<CardTitle>
						<div className="w-full flex justify-center items-center p-4">
							<img className="h-20" src="/icons/cctv_256.png" />
						</div>
					</CardTitle>
					<CardDescription className="text-center uppercase text-3xl tracking-wider text-gray-700 font-bold">MONITOR PARKING</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full gap-4 my-2">
						<div className="grid gap-2">
							<Label htmlFor="email" className="block text-left text-base font-medium text-gray-900">
								Email
							</Label>
							<Input className="text-base" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password" className="block text-left text-base font-medium text-gray-900">
								Password
							</Label>
							<Input className="text-base" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
						</div>
					</div>
					{error && <p className="mt-2 text-red-500">{error}</p>} {/* แสดงข้อความ error */}
				</CardContent>
				<CardFooter>
					<div className="w-full mt-2 flex justify-center gap-4 flex-col md:flex-row">
						<Button text="Login" className="bg-blue-500 text-white w-full hover:bg-blue-400 " onClick={handleLogin} />
						<Button text="Register" className="bg-none text-blue-500 border-2 border-blue-500 hover:border-blue-400 w-full" onClick={handleRegister} />
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Login
