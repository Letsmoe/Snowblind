import {useRef} from "./useRef.js";
import { useEffect } from "./useEffect.js";

function useClickOutside(callback, events = ["mousedown", "touchstart"]) {
	const ref = useRef();
	var reffedNode;
	const clickCallback = (e) => {
		const target = e.target;
		if (target && reffedNode) {
			const inParents = (parent) => {
				if (parent instanceof HTMLBodyElement) {
					return false;
				} else if (parent.isEqualNode(reffedNode)) {
					return true;
				} else if (parent.parentNode) {
					return inParents(parent.parentNode)
				}
			}

			if (!inParents(target)) {
				callback();
			}
		}
	}

	(events).forEach((fn) => document.addEventListener(fn, clickCallback));

	useEffect((node) => {
		reffedNode = node;
	})

	return ref;
}

export {useClickOutside}