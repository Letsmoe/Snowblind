import Snowblind from "../src/snowblind.js";
import {
	html,
	repeat
} from "../src/html.js";

function CopyToClipboard(x) {
	navigator.clipboard.writeText(x)
}

class ColorPalette extends Snowblind.Component {
	render() {
		return html `
			<h6>${this.opts.title}</h6>
			<div class="sg-color-palette">
			${repeat(this.opts.colors, (i, x) => {
				return html`<span color="${x}" sx="${{background: x}}" @click="${(node) => {
					document.querySelectorAll("span.copied").forEach(c => c.classList.remove("copied"))
					node.classList.add("copied")
					CopyToClipboard(x.toUpperCase(), )
					setTimeout(() => {
						node.classList.remove("copied")
					}, 400)
				}}"></span>`
			})}
			</div>`
	}
}

class Popup extends Snowblind.Component {
	__init__() {
		this.opts.delay = 2000
		this.opts.autoCancel = true
	}

	render() {
		if (this.opts.autoCancel) {
			setTimeout(() => {
				this.fadeOutDestroy()
			}, this.opts.delay)
		}

		const MB = Array.from(document.querySelectorAll(".popup-little")).reduce((x, y) => x + y.getBoundingClientRect().height + 20, 0)
		return `
			<div class="popup-little" style="margin-bottom: ${MB}px">
				<span>${this.opts.text}</span>
			</div>
		`
	}

	update(msg) {
		this.opts.text = msg
	}
}





class Modal extends Snowblind.Component {
	__init__() {
		[this.isOpen, this.setOpen] = this.useState(true)
	}

	render() {
		return html `<div class="sUIModal-container" @@click="${() => {this.opts.keepMounted ? this.setOpen(!this.isOpen.valueOf()) : this.fadeOutDestroy()}}" ?hidden="${!this.isOpen.valueOf()}">
			<div class="sUIModal">
				<h4>${this.opts.title}</h4>
				<p>${this.opts.description}</p>
			</div>
		</div>`
	}
}



window.expose([ColorPalette])
console.log("%c           \/$$   \/$$ \/$$$$$$\r\n          | $$  | $$|_  $$_\/\r\n  \/$$$$$$$| $$  | $$  | $$  \r\n \/$$_____\/| $$  | $$  | $$  \r\n|  $$$$$$ | $$  | $$  | $$  \r\n \\____  $$| $$  | $$  | $$  \r\n \/$$$$$$$\/|  $$$$$$\/ \/$$$$$$\r\n|_______\/  \\______\/ |______\/", "color: #EB5E28;")

export {
	ColorPalette,
	Modal,
	Popup
}