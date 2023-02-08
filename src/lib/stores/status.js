import { writable } from "svelte/store";

export const status = writable({
    needRefresh: false,
    offlineReady: false,
    registerError: undefined,
    registration: undefined,
    beforeInstallPrompt: undefined,
    canInstall: false,
    updateFunction: undefined,
    signedIn: false,
    ready: false,
    status: 'Loading'
});