import { useState } from "./useState";
function useFullscreen() {
    const [fullscreen, toggle] = useState(false);
    const toggleFullscreen = () => {
        toggle(!fullscreen);
    };
    return [fullscreen, toggleFullscreen];
}
//# sourceMappingURL=useFullscreen.js.map