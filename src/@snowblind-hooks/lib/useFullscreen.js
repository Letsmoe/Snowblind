import { useState } from "@snowblind/core";
function useFullscreen() {
    const [fullscreen, toggle] = useState(false);
    const toggleFullscreen = () => {
        toggle(!fullscreen);
    };
    return [fullscreen, toggleFullscreen];
}
