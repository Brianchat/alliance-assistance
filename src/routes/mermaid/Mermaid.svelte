<script>
    import mermaid from 'mermaid';
    import {onMount} from 'svelte';

    export let theme ='dark';

    mermaid.initialize({
        startOnLoad: false,
        gantt: { axisFormatter: [
            ['%Y-%m-%d', (d) => {
                return d.getDay() === 1
            }]
        ] }
    });

    onMount(()=>{
        mermaid.run()
    })
</script>

<pre class="mermaid">
    {@html "%%{init: {'theme':'"}{theme}{@html "'}}%%" }
    <slot></slot>
</pre>