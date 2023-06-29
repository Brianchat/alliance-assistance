<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	
	let pressed = false;
	let error;
	let position;

	const successCallback = (p) => {
		error='Location Success';
		console.log(p);
		position = p;
		// error = JSON.stringify(p);
		pressed = false
		
	};

	const errorCallback = (err) => {
		error='Location Failure: '+ err.message;
		console.log(err.code);
		// error = JSON.stringify(err);
		pressed = false
		// goto(`/`);
	};

	const click = () => {
		pressed = true
		error='None';
		if (navigator.geolocation) {
			error='Geolocation Present';
			navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
		} else {
			error = "Geolocation is not supported by this browser.";
		}
	}

	onMount(()=>{
		navigator.permissions.query({ name: "geolocation" }).then((result) => {
			if (result.state === "granted") {
				error = "Geolocation is not supported by this browser.";
			} else if (result.state === "prompt") {
				error = "Geolocation is in prompt state.";
				// navigator.geolocation.getCurrentPosition(
				// 	revealPosition,
				// 	positionDenied,
				// 	geoSettings
				// );
			} else if (result.state === "denied") {
				error = "Geolocation is denied.";
			}
			result.addEventListener("change", () => {
				error = `Geolocation changed to ${result.state}`;
			});
		});
	})
</script>

<h3>Policy: 00000001</h3>
<h3>Expires: 20/01/2024</h3>


<button class="wrapper" class:pressed={pressed} on:mousedown={()=> pressed = true} on:click={click} on:mouseup={()=> pressed = false}>
	<div class="inner"  >
		<img src="/siren-call.svg" alt="Press in Emergency" />
		<!-- <span /> -->
	</div>
</button>

<p>{pressed}</p>
{#if position && position.coords}
<p>Latitude: {position.coords.latitude}</p>
<p>Longitude: {position.coords.longitude}</p>
{JSON.stringify(Object.keys(position))}
{/if}
<p class="error">{error}</p>
<p>
	<a href="sms:+447484845356?&body=Hi">Send an SMS</a>
	<a href="tel:*141#">Send a USSD</a>
	<a href="/peer">WebRTC</a>
</p>


<style>
	@font-face {
		font-family: 'Roboto-Black';
		src: url(/Roboto-Black.ttf) format('truetype');
	}

	p{
		color: #fff;
	}

	p.error {
		background-color: #5e1912;

	}
	h3 {
		color: #fff;
		width: 100%;
		text-align: center;
		font-family: 'Roboto-Black', 'Courier New', Courier, monospace;
	}
	.wrapper {
		display: block;
		box-sizing: border-box;
		width: 150px;
		height: 150px;
		margin: 60px auto;
		border-radius: 50%;
		background: #b25244;
		background: linear-gradient(#b25244, #5e1912);
		position: relative;
		padding: 20px;
		box-shadow: inset 0 2px 3px rgba(255, 255, 255, 0.13), 0 5px 8px rgba(0, 0, 0, 0.5),
			0 10px 10px 4px rgba(0, 0, 0, 0.3);
		cursor: pointer;
	}

    .wrapper.pressed {
        box-shadow: none;
        background: linear-gradient(#961f0f, #b25244);
    }

	.wrapper:after {
		content: '';
		position: absolute;
		left: -20px;
		right: -20px;
		top: -20px;
		bottom: -20px;
		z-index: -2;
		border-radius: inherit;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 1px 2px rgba(0, 0, 0, 0.3),
			0 0 10px rgba(0, 0, 0, 0.15);
	}

	.wrapper:before {
		content: '';
		position: absolute;
		left: -10px;
		right: -10px;
		top: -10px;
		bottom: -10px;
		z-index: -1;
		border-radius: inherit;
		box-shadow: inset 0 10px 10px rgba(0, 0, 0, 0.13);
		-webkit-filter: blur(1px);
		filter: blur(1px);
	}

	.inner {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(#8a2c20, #9e4235);
		display: block;
		box-shadow: 0 -2px 5px rgba(255, 255, 255, 0.05), 0 2px 5px rgba(255, 255, 255, 0.1);
	}

    .wrapper.pressed .inner {
        background: radial-gradient(#961f0f, #b25244);
    }

	/* .inner:after {
		position: absolute;
		width: 50px;
		height: 50px;
		background: white;
		background: linear-gradient(#eaeceb, #8d8d8d);
		left: 50%;
		top: 50%;
		content: '';
		border-radius: inherit;
		margin: -25px 0 0 -25px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
	} */

	/* .inner:before {
		position: absolute;
		content: '';
		width: 40px;
		height: 40px;
		left: 50%;
		top: 50%;
		border-radius: inherit;
		background: inherit;
		margin: -20px 0 0 -20px;
		z-index: 2;
		box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(255, 255, 255, 1);
	} */

	.inner img {
		position: absolute;
		height: 52px;
		width: 50px;
		left: 30px;
		top: 30px;
		filter: drop-shadow(0 3px 5px rgba(0, 0, 0, 0.3));
	}

	.wrapper.pressed .inner img {
		height: 57px;
	}

    .wrapper.pressed .inner:after {
        position: absolute;
		top: calc(50% +12px);
    }

	/* .inner span {
		display: block;
		width: 20px;
		height: 20px;
		background: #8f3327;
		position: absolute;
		left: 50%;
		margin-left: -10px;
		top: 25px;
		z-index: 3;
		position: relative;
	} */

    /* .wrapper.pressed .inner span{
        top: 28px;
    } */

	/* .inner span:before {
		content: '';
		position: absolute;
		width: 6px;
		height: 25px;
		background: linear-gradient(#fff, #cbcbcd);
		border-radius: 10px;
		box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
		left: 50%;
		margin-left: -3px;
	} */
</style>
