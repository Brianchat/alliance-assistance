import { get, writable } from "svelte/store";

export const status = writable({
    needRefresh: false,
    offlineReady: false,
    registerError: undefined,
    registration: undefined,
    beforeInstallPrompt: undefined,
    canInstall: false,
    updateFunction: undefined
});