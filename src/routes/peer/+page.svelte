<script>
	import { Peer } from 'peerjs';

	let myID = '';
    let peerID = '';
	let error = '';

	const peer = new Peer();
	peer.on('open', (id) => {
		myID = id;
	});
	peer.on('error', (err) => {
		error = err;
	});

	const conn = peer.connect('eNQue-other');

	let messages = [];

	conn.on('open', () => {
		conn.send('hi!');
	});


	let connectToPeer = () => {
		console.log(`Connecting to ${peerID}...`);

		let conn = peer.connect(peerID);
		conn.on('data', (data) => {
			messages.push(data);
		});
		conn.on('open', () => {
			conn.send('hi!');
		});

		// navigator.mediaDevices
		// 	.getUserMedia({ video: true, audio: true })
		// 	.then((stream) => {
		// 		let call = peer.call(peerID, stream);
		// 		call.on('stream', renderVideo);
		// 	})
		// 	.catch((err) => {
		// 		logMessage('Failed to get local stream', err);
		// 	});
	};
</script>

<h1>{myID} Messages:</h1>
<input bind:value={peerID} />
<button on:click={connectToPeer}></button>
<ul>
	{#each messages as message}
		<li>{message}</li>
	{/each}
</ul>
<p>{JSON.stringify(messages)}</p>

<style>
    h1{
        user-select: text;
    }
</style>