<script lang="ts">
    import Declare from "./controls/Declare.svelte";
    import Input from "./controls/Input.svelte";
    import Output from "./controls/Output.svelte";
    import Assignment from "./controls/Assignment.svelte";
    import If from "./controls/If.svelte";
    import Switch from "./controls/Switch.svelte";
    import While from "./controls/While.svelte";
    import DoWhile from "./controls/DoWhile.svelte";
    import For from "./controls/For.svelte";
</script>

<div class="flex flex-row flex-wrap gap-1 print:hidden">
    <Declare />
    <Input />
    <Output />
    <Assignment />
    <If />
    <Switch />
    <While />
    <DoWhile />
    <For />
</div>
