import { useEffect } from "react"
import { useSidebar } from "./ui/sidebar"
import { AspectRatio } from "./ui/aspect-ratio"

const CameraView = () => {
	const { open } = useSidebar()
	useEffect(() => {}, [open])
	
	return (
		<div className="mt-10 w-full px-4">
			<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg shadow-lg p-4">
				<img
					src="http://localhost:8888/video_feed"
					className="w-full h-full object-contain rounded-lg"
					alt="Live camera feed"
				/>
			</AspectRatio>
		</div>
	)
}

export default CameraView
