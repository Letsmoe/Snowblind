import { useRef } from "@snowblind/core"
import { useEffect } from "@snowblind/core";

function useClickOutside(
	callback: Function,
	events = ["mousedown", "touchstart"]
) {
	const ref = useRef();
	var reffedNode: HTMLElement;
	const clickCallback = (e: Event) => {
		const target = e.target;
		if (target && reffedNode) {
			const inParents = (parent: any) => {
				if (parent instanceof HTMLBodyElement) {
					return false;
				} else if (parent.isEqualNode(reffedNode)) {
					return true;
				} else if (parent.parentNode) {
					return inParents(parent.parentNode);
				}
			};

			if (!inParents(target)) {
				callback();
			}
		}
	};

	events.forEach((fn) => document.addEventListener(fn, clickCallback));

	useEffect((node: HTMLElement) => {
		reffedNode = node;
	});

	return ref;
}

export { useClickOutside };
