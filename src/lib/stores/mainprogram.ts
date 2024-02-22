import { writable } from "svelte/store";

const mainprogram = writable<
    Array<{
        p: any;
        id: string;
        rid: number;
    }>
>();

export default mainprogram;
