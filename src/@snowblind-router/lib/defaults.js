const ROUTES = [];
const _LOCATION = {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
};
const hashCode = (s) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
const navigate = (url) => {
    const urlHash = hashCode(url);
    history.pushState({ key: urlHash }, '', url);
};
