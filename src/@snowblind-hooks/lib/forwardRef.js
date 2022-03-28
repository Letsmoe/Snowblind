function forwardRef(callback) {
    return (props, ref) => {
        return callback(props, ref);
    };
}
export { forwardRef };
