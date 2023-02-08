class Drawer {
	private context
		: CanvasRenderingContext2D

	private dimensions
		: {
			width: number
			height: number
		}
		= {
			width: 0,
			height: 0,
		}

	private setDimensions = (
		canvas: HTMLCanvasElement
	) => {
		this.dimensions.width = canvas.width
		this.dimensions.height = canvas.height
	}

	private reset = () => {
		this.context.fillRect(0, 0, this.dimensions.width, this.dimensions.height)
	}

	init = (
		canvas: HTMLCanvasElement
	) => {
		this.setDimensions(canvas)
		this.context = canvas.getContext("2d") as CanvasRenderingContext2D
		this.reset()
	}

	resize = (
		canvas: HTMLCanvasElement
	) => {
		this.setDimensions(canvas)
		this.reset()
	}

	draw = (
		drawer: (
			context: CanvasRenderingContext2D
		) => void
	) => {
		drawer(this.context)
	}
}

export default new Drawer()