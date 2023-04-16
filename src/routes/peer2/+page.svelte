<script>
    import { Peer } from "peerjs";

    const peer = new Peer("eNQue-other");
    const conn = peer.connect("eNQue-test");

    let messages = []

    conn.on("open", () => {
            conn.send("hi!");
    });

    peer.on("connection", (conn) => {
        conn.on("data", (data) => {
            // Will print 'hi!'
            console.log(data);
            messages.push(data);
        });
        conn.on("open", () => {
            conn.send("hello!");
        });
    });

</script>

<h1>Messages:</h1>
<ul>
    {#each messages as message }
        <li>{ message }</li>
    {/each}
</ul>