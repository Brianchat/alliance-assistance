<script>
	import { Peer } from 'peerjs';

	var peer = new Peer();
	let codeid = '';
	let videocurrent;
	let videoEl;
	let youid = '';
    let error='';

	// GET YOU ID
	peer.on('open', (id) => {
		youid = id;
		console.log(id);
	});
	// IF ERROR CAN GET ID
	peer.on('error', (err) => {
		 error = JSON.stringify(err);
	});

	peer.on('connection', (conn) => {
		console.log('message....');
		conn.on('data', (data) => {
			console.log('new data ' + data);
		});
		conn.on('open', () => {
			console.log('new message');
		});
	});

	// HANDLE CONNECTTION
	peer.on('call', async (call) => {
		// open webcam
		await navigator.mediaDevices
			.getUserMedia({
				video: true,
				audio: true
			})
			.then((stream) => {
				call.answer(stream);
				call.on('stream', renderYouwebcam);
				videocurrent.srcObject = stream;
				videocurrent.play();
			})
			.catch((err) => error = JSON.stringify(err));
	});
	// RENDER YOU WEBCAM HERE
	let renderYouwebcam = (stream) => {
		console.log(stream);
		videoEl.srcObject = stream;
		videoEl.play();
	};

    let connect = async () => {
			var conn = peer.connect(codeid);
			conn.on('data', (data) => {
				console.log('new data ' + data);
			});
			conn.on('open', function () {
				conn.send('hi');
			});
			// OPEN YOU WEBCAM
			await navigator.mediaDevices
				.getUserMedia({
					video: true,
					audio: true
				})
				.then((stream) => {
					let call = peer.call(codeid, stream);
					videocurrent.srcObject = stream;
					videocurrent.play();
					call.on('stream', renderYouwebcam);
				})
				.catch((err) => error = JSON.stringify(err));
		}

        onMount(async () => {
            videocurrent = document.getElementById("video");
            // @ts-ignore
            canvas = window.canvas = document.getElementById("canvas");
            console.log(canvas);
            //video.play();
            // @ts-ignore
            const constraints = (window.constraints = {
                audio: false,
                video: true,
            });

            if (window.isSecureContext) {
                error = "Secure";
            } else {
                error = "Not Secure";
            }
            try {
                if (browser) {
                    const stream = await navigator.mediaDevices.getUserMedia(
                        constraints
                    );
                    console.log("this a stream = > ", stream);
                    const video = document.querySelector("video");
 
                }
            } catch (err) {
                error = JSON.stringify(err);
            }
            // init();
        });
</script>

<div>
	<h1>ID: {youid}</h1>
	Peer ID:<input type="" bind:value={codeid} name="" />
	<button on:click={connect}>Connect</button>
    <p>{error}</p>

	<!-- VIDEO YOU FRIEND TAG HTML -->
	<video id="El" bind:this={videoEl} width="400" height="400" autoplay playsinline preload="metadata">
		<track kind="captions" src="" />
	</video>
	<br />

	<!-- YOU FACE CAM HERE -->
	<video id="video" bind:this={videocurrent} width="400" height="400" autoplay playsinline preload="metadata">
		<track kind="captions" src="" />
	</video>
</div>

<style>
	div,
	h1 {
		color: #fff;
	}

    input {
        width: calc( 100% - 150px ); 
    }
</style>
