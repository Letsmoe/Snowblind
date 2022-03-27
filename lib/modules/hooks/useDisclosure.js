import { useState } from "./useState.js";
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
//# sourceMappingURL=useDisclosure.js.map