<script>
    import { goto } from '$app/navigation';
    import { user } from '$lib/stores/db';

    function handleClick() {
		if(signedIn){
            goto('/');
        }
	}

    $: className = $user.name ? 'signedIn' : $user.signedOut && $user.ok ? 'signedOut': 'working';
</script>

<svg on:click={handleClick} on:keypress={handleClick} xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMinYMin meet" viewBox="0 0 255 145" 
    class={className} width="100%" height="100%" >
    <defs>
        <ref id="paramColor" param="color" default="#ccc"/>
        <mask id="gradMask" fill="#fff">
            <path
                d="M30.345 129.174h8.123v2.606h-2.605q-2.529 4.368-6.973 6.973-4.445 2.606-9.656 2.606-7.97 0-13.64-5.594Q0 130.094 0 122.125q0-7.97 5.594-13.564 5.67-5.67 13.64-5.67 7.97 0 13.564 5.67 5.67 5.594 5.67 13.563 0 .384-.076 1.303H6.284q.46 6.284 4.674 10.652 4.291 4.291 10.039 4.291 3.601 0 6.666-1.762 3.142-1.763 5.211-4.828h-2.529zm-9.348-23.295q-3.832 0-7.127 1.992-3.218 1.993-5.287 5.441-1.993 3.372-2.3 7.51h29.503q-.46-6.284-4.75-10.575-4.216-4.368-10.04-4.368z"
                fill="#FFFFFF"
                id="e" />
                <path
                d="M197.705 103.12h10.422v2.606h-3.832v18.62q0 6.897-4.98 11.878-4.905 4.905-11.878 4.905-6.974 0-11.878-4.905-4.904-4.98-4.904-11.877v-18.621h-2.146v-2.606h10.422v2.606h-2.07v19.08q0 3.372 1.61 6.208 1.686 2.835 4.521 4.52 2.912 1.687 6.284 1.687 5.057 0 8.66-3.602 3.677-3.678 3.677-8.812v-19.081h-3.908z"
                fill="#FFFFFF"
                id="u" />
            <path
                d="M242.84 129.174h8.123v2.606h-2.605q-2.53 4.368-6.974 6.973-4.444 2.606-9.655 2.606-7.97 0-13.64-5.594-5.594-5.671-5.594-13.64 0-7.97 5.594-13.564 5.67-5.67 13.64-5.67 7.97 0 13.563 5.67 5.671 5.594 5.671 13.564 0 .383-.077 1.302h-32.108q.46 6.284 4.675 10.652 4.291 4.291 10.038 4.291 3.602 0 6.667-1.762 3.142-1.763 5.211-4.828h-2.529zm-9.349-23.295q-3.831 0-7.126 1.992-3.219 1.993-5.288 5.441-1.992 3.372-2.299 7.51h29.503q-.46-6.284-4.751-10.575-4.215-4.368-10.039-4.368z"
                fill="#FFFFFF"
                id="e" />
            <path
                d="M131.5 55.335c1.1-.52 2.178-1.07 3.287-1.559 11.669-5.175 24.835-2.457 33.966 6.474 7.773 7.622 6.873 22.327 1.259 28.621-.19.22-.54.3-1.089.59.31-1.649.59-3.127.85-4.606a22.977 22.977 0 1 0-45.535-4.675 33.806 33.806 0 0 0 8.411 23.866c4.326 5.065 9.56 9.09 14.786 13.127a49.85 49.85 0 0 1 5.994 4.935c-1.998.68-3.457.13-4.925-.27a42.098 42.098 0 0 1-31.26-42.048 65.614 65.614 0 0 1 7.643-28.891 114.535 114.535 0 0 1 11.928-18.082c3.387-4.326 6.873-8.591 10.27-12.917 4.296-5.464 8.272-11.109 9.62-18.152.1-.54.61-.999 1.07-1.748a20.57 20.57 0 0 1-1 17.183 63.307 63.307 0 0 1-6.094 9.49c-3.656 4.915-7.642 9.59-11.338 14.486-3.207 4.256-6.204 8.671-7.842 14.176z"
                fill="#FFFFFF"
                id="spirit" />
            <path d="M159.473 46.124a6.773 6.773 0 1 1 6.683-6.913 6.673 6.673 0 0 1-6.683 6.913z"
                fill="#FFFFFF"
                id="head" />
        </mask>
        <linearGradient id="Gradient" spreadMethod="repeat" gradientTransform="rotate(-45)" gradientUnits="userSpaceOnUse" >
            <stop offset="0%" stop-color="#bc07bc" >
                <animate attributeName="stop-color" values="#ff0000; #ff7300; #fffb00; #48ff00; #00ffd5; #002bff; #7a00ff; #ff00c8; #ff0000;" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="25%" stop-color="#bc07bc" >
                <animate attributeName="stop-color" values="#ff7300; #fffb00; #48ff00; #00ffd5; #002bff; #7a00ff; #ff00c8; #ff0000; #ff7300;" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stop-color="#bc07bc" >
                <animate attributeName="stop-color" values="#fffb00; #48ff00; #00ffd5; #002bff; #7a00ff; #ff00c8; #ff0000; #ff7300; #fffb00;" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="75%" stop-color="#bc07bc" >
                <animate attributeName="stop-color" values="#48ff00; #00ffd5; #002bff; #7a00ff; #ff00c8; #ff0000; #ff7300; #fffb00; #48ff00;" dur="3s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stop-color="#bc07bc" >
                <animate attributeName="stop-color" values="#00ffd5; #002bff; #7a00ff; #ff00c8; #ff0000; #ff7300; #fffb00; #48ff00; #00ffd5;" dur="3s" repeatCount="indefinite" />
            </stop>
        </linearGradient>
        <filter id='shadow' >
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
            <feComposite in="SourceGraphic" operator="over" /> 
        </filter>
    </defs>
    
    <g mask="url(#gradMask)" >
        <rect id="bg" x="0" y="0" fill="#bc07bc" width="255" height="145" />
    </g>
    <g>
        <path
            d="M83.067 72.928H95.25v2.682h-2.989v65.519h-6.207l-33.947-62.76v60.154h2.989v2.606H42.913v-2.606H45.9V72.928h6.207l33.947 62.76V75.61h-2.988z"
            id="N" />
        <path
            d="M161.536 137.604v-5.134h2.605v9.732q-7.74.153-13.64-3.449-.843-.46-2.299-1.609 0 .077-.076.077-4.215 2.758-8.966 3.908-3.525.92-7.357.92-3.754 0-7.28-.92-1.532-.383-3.294-.996-1.533-.614-2.989-1.38-8.43-4.214-13.564-12.72-5.134-8.583-5.134-19.005 0-9.502 4.292-17.548 4.367-8.123 11.8-12.797 7.434-4.675 16.246-4.675 6.514 0 12.49 2.836 6.055 2.758 10.346 7.433 4.291 4.674 6.82 11.188 2.605 6.437 2.605 13.563 0 5.288-1.379 10.269-1.38 4.904-3.985 9.042-2.529 4.138-6.054 7.433-.153.153-.613.537-.383.306-.46.306.154.077.46.307.307.23.537.306 3.908 2.146 8.889 2.376zm-17.625-1.916q.077 0 1.61-.766-4.139-3.679-5.748-4.675-2.605-1.762-5.9-2.222-3.219-.536-6.284.23-4.521 1.15-8.43 4.904 1.84 1.226 3.679 2.146 2.145.92 4.214 1.532 3.449.92 6.897.92 5.134 0 9.962-2.069zm5.824-3.218q5.67-4.215 8.966-10.882 3.371-6.743 3.371-14.56 0-8.352-3.755-15.402-3.754-7.05-10.268-11.112-6.437-4.138-14.1-4.138-7.663 0-14.176 4.138-6.514 4.062-10.269 11.112t-3.755 15.402q0 7.357 2.989 13.794 2.988 6.437 8.2 10.728 4.367-4.674 9.961-6.284 3.142-.996 7.51-.613 3.678.383 7.356 2.53 1.84 1.149 5.748 4.367.306.307 1.609 1.303.076-.077.306-.154.23-.153.307-.23z"
            id="Q" />
    </g>
    <script type="text/ecmascript" xlink:href="/ref2.js" />
</svg>

<style>
    svg {
        position: fixed;
        top: calc(50vh - 155px);
		left: calc(50vw - 121px);
        display: block;
        height: 145px;
		width: 255px;
        transition-property: top, left, height;
        transition-duration: 2s;
        transition-timing-function: cubic-bezier();
        transition-delay: 0.5s;
        z-index: 30;
    }

    svg.working rect#bg, svg.signedIn:hover rect#bg {
        fill: url(#Gradient);
    }

    svg.signedIn:hover {
        filter: url(#shadow);
    }

    svg path#N, svg path#Q {
        transition-delay: 0.2s;
        transition-duration: 0.7s;
        fill: #000;
    }

    svg.signedIn {
		height: 48px;
        width: auto;
		top: 0px;
		left: 4px;
	}

    svg.signedIn path#N, svg.signedIn path#Q {
        fill: #c0c0c0;
    }

    svg.signedIn:hover path#N, svg.signedIn:hover path#Q {
        fill: #fff;
    }

    @keyframes glowing {
	0% {
		background-position: 0 0;
	}

	50% {
		background-position: 400% 0;
	}

	100% {
		background-position: 0 0;
	}
}

</style>

