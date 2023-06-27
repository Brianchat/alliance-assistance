<script>
    let location;

    if ("geolocation" in navigator) {
  // Prompt user for permission to access their location
  navigator.geolocation.getCurrentPosition(
    // Success callback function
    (position) => {
      // Get the user's latitude and longitude coordinates
      location = position;
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      // Do something with the location data, e.g. display on a map
      console.log(`Latitude: ${lat}, longitude: ${lng}`);
    },
    // Error callback function
    (error) => {
      // Handle errors, e.g. user denied location sharing permissions
      console.error("Error getting user location:", error);
    }
  );
} else {
  // Geolocation is not supported by the browser
  console.error("Geolocation is not supported by this browser.");
}
</script>

<nav>
	<ul class="nav">
		<li>
			<a href="#">
				<span class="icon"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 640 512"
						fill="currentColor"
						><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M0 48C0 21.5 21.5 0 48 0H368c26.5 0 48 21.5 48 48V96h50.7c17 0 33.3 6.7 45.3 18.7L589.3 192c12 12 18.7 28.3 18.7 45.3V256v32 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H576c0 53-43 96-96 96s-96-43-96-96H256c0 53-43 96-96 96s-96-43-96-96H48c-26.5 0-48-21.5-48-48V48zM416 256H544V237.3L466.7 160H416v96zM160 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm368-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM176 80v48l-48 0c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h48v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V192h48c8.8 0 16-7.2 16-16V144c0-8.8-7.2-16-16-16H240V80c0-8.8-7.2-16-16-16H192c-8.8 0-16 7.2-16 16z"
						/></svg
					></span
				>
				<span class="screen-reader-text">Settings</span>
			</a>
		</li>
		<li>
			<a href="#">
				<span class="icon"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 640 512"
						fill="currentColor"
						><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M240 32a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM192 48a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32 80c17.7 0 32 14.3 32 32h8c13.3 0 24 10.7 24 24v16c0 1.7-.2 3.4-.5 5.1C280.3 229.6 320 286.2 320 352c0 88.4-71.6 160-160 160S0 440.4 0 352c0-65.8 39.7-122.4 96.5-146.9c-.4-1.6-.5-3.3-.5-5.1V184c0-13.3 10.7-24 24-24h8c0-17.7 14.3-32 32-32zm0 320a96 96 0 1 0 0-192 96 96 0 1 0 0 192zm192-96c0-25.9-5.1-50.5-14.4-73.1c16.9-32.9 44.8-59.1 78.9-73.9c-.4-1.6-.5-3.3-.5-5.1V184c0-13.3 10.7-24 24-24h8c0-17.7 14.3-32 32-32s32 14.3 32 32h8c13.3 0 24 10.7 24 24v16c0 1.7-.2 3.4-.5 5.1C600.3 229.6 640 286.2 640 352c0 88.4-71.6 160-160 160c-62 0-115.8-35.3-142.4-86.9c9.3-22.5 14.4-47.2 14.4-73.1zm224 0a96 96 0 1 0 -192 0 96 96 0 1 0 192 0zM368 0a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm80 48a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"
						/></svg
					></span
				>
				<span class="screen-reader-text">Refresh</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 512 512"
						fill="currentColor"
						><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M352 320c88.4 0 160-71.6 160-160c0-15.3-2.2-30.1-6.2-44.2c-3.1-10.8-16.4-13.2-24.3-5.3l-76.8 76.8c-3 3-7.1 4.7-11.3 4.7H336c-8.8 0-16-7.2-16-16V118.6c0-4.2 1.7-8.3 4.7-11.3l76.8-76.8c7.9-7.9 5.4-21.2-5.3-24.3C382.1 2.2 367.3 0 352 0C263.6 0 192 71.6 192 160c0 19.1 3.4 37.5 9.5 54.5L19.9 396.1C7.2 408.8 0 426.1 0 444.1C0 481.6 30.4 512 67.9 512c18 0 35.3-7.2 48-19.9L297.5 310.5c17 6.2 35.4 9.5 54.5 9.5zM80 408a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
						/></svg
					></span
				>
				<span class="screen-reader-text">Home</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						height="1em"
						viewBox="0 0 384 512"
						fill="currentColor"
						><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
							d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						/></svg
					></span
				>
				<span class="screen-reader-text">Location</span>
			</a>
		</li>
	</ul>
</nav>
{location}

<style>
	.screen-reader-text {
		position: absolute;
		top: -9999px;
		left: -9999px;
	}

	[class*='icon'] {
		font-weight: normal;
		font-style: normal;
		font-size: 3em;
		speak: none;
	}

	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	nav {
		background: #f7f7f7 url(/bg.png) repeat center top;
		margin-top: 5px;
	}

	.nav {
		list-style: none;
		text-align: center;
	}

	.nav li {
		position: relative;
		display: inline-block;
		margin-right: -4px;
	}

	.nav li:before {
		content: '';
		display: block;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #fff;
		width: 100%;
		height: 1px;
		position: absolute;
		top: 50%;
		z-index: -1;
	}

	.nav a .icon svg {
		position: relative;
		top: 8px;
	}

	.nav a:link,
	.nav a:visited {
		display: block;
		text-decoration: none;
		background-color: #f7f7f7;
		background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));
		background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7);
		background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7);
		background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7);
		background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7);
		color: #a7a7a7;
		margin: 36px;
		width: 144px;
		height: 144px;
		position: relative;
		text-align: center;
		line-height: 144px;
		border-radius: 50%;
		box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;
		border: solid 1px transparent;
	}

	.nav a:before {
		content: '';
		display: block;
		background: #fff;
		border-top: 2px solid #ddd;
		position: absolute;
		top: -18px;
		left: -18px;
		bottom: -18px;
		right: -18px;
		z-index: -1;
		border-radius: 50%;
		box-shadow: inset 0px 8px 48px #ddd;
	}

	.nav a:active {
		box-shadow: 0px 3px 4px #aaa inset, 0px 2px 3px #fff;
	}

	.nav a:hover {
		text-decoration: none;
		color: #555;
		background: #f5f5f5;
	}
</style>
