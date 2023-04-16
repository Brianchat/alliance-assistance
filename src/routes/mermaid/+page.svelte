<script>
    import mermaid from 'mermaid';
    import { onMount } from 'svelte';
    import Mermaid from './Mermaid.svelte';
</script>

<main>
    <Mermaid theme="forest">
        graph LR
        C-->D-->E
    </Mermaid>
    <Mermaid theme="dark">
        gantt
        title A Gantt Diagram
        dateFormat  YYYY-MM-DD
        section Section
        A task           :a1, 2023-04-01, 30d
        Another task     :after a1  , 20d
        section Another
        Task in sec      :2023-04-12  , 12d
        another task      : 24d
    </Mermaid>
    <Mermaid theme="dark">
        sequenceDiagram
        A->> B: Query
        B->> C: Forward query
        Note right of C: Thinking...
        C->> B: Response
        B->> A: Forward response
    </Mermaid>
    <Mermaid theme="dark">
        mindmap
        root((mindmap))
            Origins
            Long history
            ::icon(fa fa-book)
            Popularisation
                British popular psychology author Tony Buzan
            Research
            On effectiveness<br/>and features
            On Automatic creation
                Uses
                    Creative techniques
                    Strategic planning
                    Argument mapping
            Tools
            Pen and paper
            Mermaid
    </Mermaid>
</main>