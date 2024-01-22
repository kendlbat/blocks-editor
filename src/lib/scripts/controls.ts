import type { ComponentConstructorOptions, SvelteComponent } from "svelte";
import Declare from "@components/svelte/blocks/Declare.svelte";
import Input from "@components/svelte/blocks/Input.svelte";
import Output from "@components/svelte/blocks/Output.svelte";
import Assignment from "@components/svelte/blocks/Assignment.svelte";

interface IControl {
    id: string;
    ui: SvelteComponent;
}

export const controls: {
    [key: string]: (
        options: ComponentConstructorOptions<Record<string, never>>,
    ) => SvelteComponent;
} = {
    declare: (options) => new Declare(options),
    input: (options) => new Input(options),
    output: (options) => new Output(options),
    assign: (options) => new Assignment(options),
};
