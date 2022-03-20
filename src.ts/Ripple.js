function CreateRipple(e) {
	const Button = e.currentTarget;
	const Circle = document.createElement("span");
	Circle.classList.add("ripple");
	const bBox = Button.getBoundingClientRect();

	const Diameter = Math.min(Math.max(bBox.width, bBox.height), 500);
	const Radius = Diameter / 2;
	
	Circle.style.width = Diameter + "px";
	Circle.style.height = Diameter + "px";
	Circle.style.left = (e.clientX + window.scrollX) - Button.offsetLeft - Radius + "px";
	Circle.style.top = (e.clientY + window.scrollY) - Button.offsetTop - Radius + "px";
	/**
	 * Remove left over ripples when user clicked fast.
	 */
	Button.querySelectorAll(".ripple").forEach(x => x.remove());
	Circle.addEventListener("animationend", (e) => {
		Circle.remove()
	})
	
	Button.append(Circle);
}

function enableRipples() {
	const Buttons = document.querySelectorAll(".sUIRipple");

	for (const Button of Array.from(Buttons)) {
		Button.removeEventListener("click", CreateRipple)
		Button.addEventListener("click", CreateRipple)
	}
}

window.addEventListener("load", () => {
	enableRipples()
})