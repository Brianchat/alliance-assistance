<script>
    import Timeline from "./Timeline.svelte";

    let clear = () =>{
        task.set( {title: ''} );
    }
</script>

<div class="body" >
    <Timeline />
</div>
