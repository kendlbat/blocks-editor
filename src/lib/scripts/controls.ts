import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import Declare from "@components/svelte/blocks/Declare.svelte";
import Input from "@components/svelte/blocks/Input.svelte";
import Output from "@components/svelte/blocks/Output.svelte";
import Assignment from "@components/svelte/blocks/Assignment.svelte";
import If from "@components/svelte/blocks/If.svelte";

interface IControl {
    id: string;
    ui: SvelteComponent;
}

export const controls: {
    [key: string]: (
        options: ComponentConstructorOptions<Record<string, never>>,
        custom?: Record<string, never>,
    ) => SvelteComponent;
} = {
    // @ts-ignore
    declare: (options) => new Declare(options),
    // @ts-ignore
    input: (options) => new Input(options),
    // @ts-ignore
    output: (options) => new Output(options),
    // @ts-ignore
    assign: (options) => new Assignment(options),
    if: (options, custom) => {
        // @ts-ignore
        let v = new If(options);
        if (custom) {
            v.$set(custom);
        }
        return v;
    },
};
