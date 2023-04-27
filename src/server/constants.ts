export const VITE_HEADER_SCRIPT = `
import RefreshRuntime from "/@react-refresh"
RefreshRuntime.injectIntoGlobalHook(window)
window.$RefreshReg$ = () => {}
window.$RefreshSig$ = () => (type) => type
window.__vite_plugin_react_preamble_installed__ = true`;

export const STORE_PRELOAD_KEY = 'PRELOADED_VALUE';
