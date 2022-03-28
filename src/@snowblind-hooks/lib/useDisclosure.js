import { useState } from "@snowblind/core";
/**
 * Hook to help with boolean checks, providing callbacks to handle modal open/close events.
 * @param initialValue The value to start with, either `true` or `false`
 * @param callbacks Callbacks to handle a close or open event
 * @returns The state, an open, close and toggle method.
 */
function useDisclosure(initialValue, callbacks) {
    const [opened, setOpened] = useState(initialValue);
    const open = () => {
        var _a;
        if (!opened) {
            setOpened(true);
            (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onOpen) === null || _a === void 0 ? void 0 : _a.call(callbacks);
        }
    };
    const close = () => {
        var _a;
        if (opened) {
            setOpened(false);
            (_a = callbacks === null || callbacks === void 0 ? void 0 : callbacks.onClose) === null || _a === void 0 ? void 0 : _a.call(callbacks);
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
