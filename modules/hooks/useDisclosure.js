import {useState} from "./useState.js";

/**
 * Hook to help with boolean checks, providing callbacks to handle modal open/close events.
 * @param {boolean} initialValue The value to start with, either `true` or `false`
 * @param {Object<onOpen?, onClose?>} callbacks Callbacks to handle a close or open event
 * @returns [opened, {open, close, toggle}]
 */
function useDisclosure(initialValue, callbacks) {
	const [opened, setOpened] = useState(initialValue);

	const open = () => {
		if (!opened) {
			setOpened(true);
			callbacks?.onOpen?.();
		}
	};

	const close = () => {
		if (opened) {
			setOpened(false);
			callbacks?.onClose?.();
		}
	};

	const toggle = () => {
		opened ? close() : open();
	};

	return [opened, {
		open,
		close,
		toggle
	}];
}

export {useDisclosure};