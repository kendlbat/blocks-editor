import { writable } from "svelte/store";

const programcontainer = writable<Element | null>();

programcontainer.subscribe((v) => {
    console.log(v);
});

export default programcontainer;
