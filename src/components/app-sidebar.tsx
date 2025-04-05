import { Cctv } from "lucide-react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import NavLogo from "./nav-logo"
import { NavUser } from "./nav-user"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
	user: { id: string; firstName: string; lastName: string; email: string; avatar: string }
	onSelectCamera: (camera: string) => void
}

const data = {
	navMain: [
		{
			title: "Camera",
			url: "#",
			icon: Cctv,
			isActive: true,
			items: [
				{
					title: "Camera All",
					url: "Camera All",
				},
				{
					title: "Camera Live",
					url: "Camera Live",
				},
				{
					title: "Camera 1",
					url: "Camera 1",
				},
				{
					title: "Camera 2",
					url: "Camera 2",
				},
				{
					title: "Camera 3",
					url: "Camera 3",
				},
				{
					title: "Camera 4",
					url: "Camera 4",
				},
			],
		},
	],
}

export function AppSidebar({ user, onSelectCamera }: AppSidebarProps) {
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						<NavLogo />
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<NavMain items={data.navMain} onSelectCamera={onSelectCamera} />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	)
}
