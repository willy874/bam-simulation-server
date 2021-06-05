module.exports = class Controller {
	constructor(args) {
		const entity = args ? args : {}
		this.app = entity.app
		this.webSocket = entity.webSocket
		this.connSocket = entity.connSocket
	}
}