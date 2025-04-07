import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@radix-ui/react-separator"
import Cookies from "js-cookie"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import CameraView from "@/components/cameraView"

const API_BASE_URL = import.meta.env.VITE_API_URL;

const Monitor = () => {
	const [isLogin, setIsLogin] = useState(false)
	// const { open } = useSidebar()
	const [selectedCamera, setSelectedCamera] = useState("Camera 1")
	const [user, setUser] = useState({
		id: "",
		firstName: "",
		lastName: "",
		email: "",
	})
	const navigate = useNavigate()

	useEffect(() => {
		const validateToken = async () => {
			const token = Cookies.get("token")
			if (token) {
				try {
					const res = await axios.get(`${API_BASE_URL}/api/authenticateToken`, {
						headers: {
							authorization: token,
						},
					})
					if (res?.data?.id) {
						const { id, firstName, lastName, email } = res.data
						setIsLogin(true)
						setUser({ id, firstName, lastName, email })
					} else {
						navigate("/")
					}
				} catch (err) {
					navigate("/")
				}
			} else {
				navigate("/")
			}
		}
		validateToken()
	}, [])

	if (!isLogin) {
		return <></>
	}

	return (
		<SidebarProvider>
			<AppSidebar user={{ ...user, avatar: user.firstName[0] || "" }} onSelectCamera={setSelectedCamera} />
			<main className="w-full p-4 bg-gray-100">
				<div className="flex items-center gap-2">
					<SidebarTrigger />
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink className="ml-10" href="#">
									Camera
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>{selectedCamera}</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<Separator orientation="vertical" className="mr-2 h-4" />
				<CameraView />
			</main>
		</SidebarProvider>
	)
}

export default Monitor
