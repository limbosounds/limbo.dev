export class Congol {
	private colors
		: string[]
		= [
			"#000000",
			"#FFFFFF",
		]

	private size
		: number
		= 250

	private scale
		: number
		= 5

	private speed
		: number
		= 10

	private data
		: number[][]
		// = [
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
		// 	[0, 0, 0, 0, 0, 1, 0, 1, 1, 0],
		// 	[0, 0, 0, 0, 0, 1, 0, 1, 0, 0],
		// 	[0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
		// 	[0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
		// 	[0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
		// 	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		// ]
		= [
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 1, 1, 1, 0, 1, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0],
			[0, 0, 1, 1, 0, 1, 0, 0],
			[0, 1, 0, 1, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0],
		]

	intervalId
		: number

	private createEmptyRow = (
		length: number = this.size
	) => {
		return Array.from({ length }, () => 0)
	}

	private clearer = (
		context: CanvasRenderingContext2D
	) => {
		context.fillStyle = "#424242"
		context.fillRect(0, 0, this.size * this.scale, this.size * this.scale)
	}
	
	private cycle = (
		callback: (
			i: number,
			j: number,
		) => void
	) => {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				callback(i, j)
			}
		}
	}

	private step = (
		context: CanvasRenderingContext2D
	) => {
		const old = JSON.parse(JSON.stringify(this.data))
		this.cycle((i, j) => {
			this.data[i][j] = this.isAlive(i, j, old) ? 1 : 0
			context.fillStyle = this.colors[this.data[i][j]]
			context.fillRect(
				j * this.scale, i * this.scale,
				this.scale, this.scale,
			)
		})
	}

	private isAlive = (
		i: number,
		j: number,
		array: number[][],
	): boolean => {
		const cell = array[i][j]
		const surround = [
			...(array[i - 1] || []).slice(j - 1, j + 2),
			array[i][j - 1], array[i][j + 1],
			...(array[i + 1] || []).slice(j - 1, j + 2),
		].filter(item => item)

		return cell
			? [2, 3].includes(surround.length)
			: surround.length == 3
	}

	constructor(
		private readonly execDraw: (
			drawer: (
				context: CanvasRenderingContext2D
			) => void
		) => void
	) {
		this.data.forEach(row => {
			if (row.length == this.size)
				return

			const count = (this.size - row.length) / 2 | 0
			row.unshift(...this.createEmptyRow(count))
			row.push(...this.createEmptyRow(count))
		})

		if (this.data.length != this.size) {
			const count = (this.size - this.data.length) / 2 | 0
			this.data = [
				...Array.from({ length: count }, () => this.createEmptyRow()),
				...this.data,
				...Array.from({ length: count }, () => this.createEmptyRow()),
			]
		}
	}

	clear = () => {
		this.execDraw(this.clearer)
	}

	next = () => {
		this.clear()
		this.execDraw(this.step)
		requestAnimationFrame(this.next)
	}

	start = () => {
		this.speed
		this.next()
		// this.intervalId = window.setInterval(() => {
		// 	this.clear()
		// 	this.execDraw(this.step)
		// }, 1000 / this.speed)
	}
}