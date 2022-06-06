import { make } from "./make"

function SnowblindFragment(props: any) {
	return () => make("Fragment", null, ...(props.children as []))
}

export { SnowblindFragment }