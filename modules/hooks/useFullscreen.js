function useFullscreen() {
	const [fullscreen, toggle] = useState(false);

	const toggleFullscreen = () => {
		toggle(!fullscreen);
	}

	return {ref, toggleFullscreen, fullscreen}
}