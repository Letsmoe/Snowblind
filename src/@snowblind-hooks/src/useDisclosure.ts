import { ValueBinder, useState } from "@snowblind/core";

/**
 * Hook to help with boolean checks, providing callbacks to handle modal open/close events.
 * @param initialValue The value to start with, either `true` or `false`
 * @param callbacks Callbacks to handle a close or open event
 * @returns The state, an open, close and toggle method.
 */
function useDisclosure(
	initialValue: boolean,
	callbacks: { onOpen?: Function; onClose?: Function }
): [ValueBinder, { open: Function; close: Function; toggle: Function }] {
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

	return [
		opened,
		{
			open,
			close,
			toggle,
		},
	];
}

export { useDisclosure };
