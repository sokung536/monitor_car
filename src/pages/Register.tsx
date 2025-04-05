import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/Button"
import { Label } from "@radix-ui/react-label"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Register() {
	const [firstName, setFirstName] = useState("") // เก็บข้อมูล firstName
	const [lastName, setLastName] = useState("") // เก็บข้อมูล lastName
	const [email, setEmail] = useState("") // เก็บข้อมูล Email
	const [password, setPassword] = useState("") // เก็บข้อมูล Password
	const [confirmPassword, setConfirmPassword] = useState("") // เก็บข้อมูล Password
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()

	const navigateToLogin = () => {
		navigate("/")
	}

	const registerValidation = async () => {
		if (!firstName) {
			setError("Please fill firstname.")
		} else if (!lastName) {
			setError("Please fill lastname.")
		} else if (!email) {
			setError("Please fill email.")
		} else if (!password || password !== confirmPassword) {
			setError("Password is not correct.")
		} else {
			return true
		}
		return false
	}

	const handleRegister = async () => {
		try {
			if (await registerValidation()) {
				const data = await axios.post(`/api/register`, {
					firstName,
					lastName,
					email,
					password,
				})
				console.log("Registration successful:", data)
				alert("Registration successful!")
				navigate("/")
			}
		} catch (error) {
			console.error("Registration failed:", error)
			alert("Registration failed")
		}
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
							<Label htmlFor="firstName" className="block text-left text-base font-medium text-gray-900">
								First Name
							</Label>
							<Input className="text-base" type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="lastName" className="block text-left text-base font-medium text-gray-900">
								Last Name
							</Label>
							<Input className="text-base" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
						</div>
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
						<div className="grid gap-2">
							<Label htmlFor="comfirmPassword" className="block text-left text-base font-medium text-gray-900">
								Confirm Password
							</Label>
							<Input className="text-base" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
						</div>
					</div>
					{error && <p className="mt-2 text-red-500">{error}</p>} {/* แสดงข้อความ error */}
				</CardContent>
				<CardFooter>
					<div className="w-full mt-2 flex justify-center gap-4 flex-col">
						<Button text="Register" className="bg-blue-500 text-white w-full hover:bg-blue-400 " onClick={handleRegister} />
						<div className="w-full text-center">
							<p className="cursor-pointer text-gray-800 hover:text-gray-600 duration-300 ease-in-out" onClick={navigateToLogin}>
								Already have an account?
							</p>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Register
