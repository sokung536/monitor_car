import { useEffect } from "react"
import { useSidebar } from "./ui/sidebar"
import { AspectRatio } from "./ui/aspect-ratio"
import vdo_camera1 from "@/assets/3car.mov"
import vdo_camera2 from "@/assets/4car.mov"

const cameraVdo: Record<string, string> = {
	"Camera 1": vdo_camera1,
	"Camera 2": vdo_camera2,
	"Camera 3": vdo_camera1,
	"Camera 4": vdo_camera2,
	"Camera Live": "Camera Live",
}

interface CameraViewProps {
	selectedCamera: string
}

const CameraView = ({ selectedCamera }: CameraViewProps) => {
	const { open } = useSidebar()
	useEffect(() => {}, [open])
	console.log(selectedCamera)

	if (selectedCamera === "Camera Live") {
		return (
			<div className="mt-10 w-full px-4">
				<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg shadow-lg p-4">
					<img src="http://localhost:8888/video_feed" className="w-full h-full object-contain rounded-lg" />
				</AspectRatio>
			</div>
		)
	}

	if (selectedCamera !== "Camera All") {
		return (
			<div className="mt-10 w-full px-4">
				<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg shadow-lg p-4">
					<video src={cameraVdo[selectedCamera]} autoPlay loop muted className="h-full w-full" />
					{/* <img src="http://localhost:8888/video_feed" className="w-full h-full object-cover" /> */}
				</AspectRatio>
			</div>
		)
	}

	return (
		<div className={` mt-10 w-full grid grid-cols-1 ${open ? "2xl:grid-cols-2" : "xl:grid-cols-2"} gap-4`}>
			{Object.entries(cameraVdo).map(([camera, vdoSrc]) => (
				<AspectRatio key={camera} ratio={16 / 9} className="overflow-hidden rounded-lg shadow-lg p-4">
					<video
						src={vdoSrc}
						// controls
						autoPlay
						loop
						muted
						className="h-full w-full"
					/>
				</AspectRatio>
			))}
		</div>
	)
}

export default CameraView
