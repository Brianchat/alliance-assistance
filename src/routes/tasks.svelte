<script>
    import { tasks } from '$lib/stores/tasks';
	import moment from 'moment';

</script>


<svg viewBox="0 0 0 0" style="position: absolute; z-index: -1; opacity: 0;">
	<defs>
		<linearGradient id="boxGradient" gradientUnits="userSpaceOnUse" x1="-15" y1="-15" x2="15" y2="15">
			<stop offset="0%" stop-color="var(--color)" />
			<stop offset="100%" stop-color="#bc07bc" />
		</linearGradient>

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

		<linearGradient id="lineGradient" gradientTransform="rotate(-5)" gradientUnits="userSpaceOnUse">
			<stop offset="25%" stop-color="#bc07bc" />
			<stop offset="200%" stop-color="var(--muted-color)" />
		</linearGradient>

		<path id="todo__line" stroke="url(#lineGradient)" d="M21 12.3h168v0.1z" />
		<path
			id="todo__box"
			stroke="url(#boxGradient)"
			d="M21 12.7v5c0 1.3-1 2.3-2.3 2.3H8.3C7 20 6 19 6 17.7V7.3C6 6 7 5 8.3 5h10.4C20 5 21 6 21 7.3v5.4"
		/>
		<path id="todo__check" stroke="url(#boxGradient)" d="M10 13l2 2 5-5" />
		<circle id="todo__circle" cx="13.5" cy="12.5" r="10" />
	</defs>
</svg>

<div class="todo-list">
	{#each $tasks as row}
		{#key row._id}
			<label class="todo">
				<input class="todo__state" type="checkbox" bind:checked={row.doc.completed} on:click|preventDefault={() => tasks.toggle(row.doc)} />

				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					viewBox="0 0 200 25"
					class="todo__icon"
				>
					<use xlink:href="#todo__line" class="todo__line" />
					<use xlink:href="#todo__box" class="todo__box" />
					<use xlink:href="#todo__check" class="todo__check" />
					<use xlink:href="#todo__circle" class="todo__circle" />
				</svg>

				<span class="todo__start">{moment(row.doc.start).calendar()}</span>
				<div class="todo__text">
					{row.doc.title}
				</div>
			</label>
		{/key}
	{/each}
</div>

<style>
	.todo-list {
		background: var(--form-element-background-color);
		color: var(--form-element-color);
		font-size: 20px;
		max-width: 15em;
		margin: 15px auto;
		padding: 0.5em 1em;
		box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
	}
	.todo {
		display: block;
		position: relative;
		padding: 0.2em 1em 1em 16%;
		margin: 0 auto;
		cursor: pointer;
		border-bottom: solid 1px var(--muted-color);
	}
	.todo:last-child {
		border-bottom: none;
	}
	.todo__state {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
	}
	.todo__start {
		font-size: 0.5em;
	}
	.todo__text {	
		transition: all 0.8s/2 linear 0.8s/2;
	}
	.todo__icon {
		position: absolute;
		top: 1em;
		bottom: 0;
		left: 0;
		width: 100%;
		height: auto;
		margin: auto;
		fill: none;
		stroke: #27fdc7;
		stroke-width: 2;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.todo__line,
	.todo__box,
	.todo__check {
		transition: stroke-dashoffset 0.8s cubic-bezier(0.9, 0, 0.5, 1);
	}
	.todo__circle {
		stroke: #bc07bc;
		stroke-dasharray: 1 6;
		stroke-width: 0;
		transform-origin: 13.5px 12.5px;
		transform: scale(0.4) rotate(0deg);
		animation: none 0.8s linear;
	}
	@keyframes explode {
		30% {
			stroke-width: 3;
			stroke-opacity: 1;
			transform: scale(0.8) rotate(40deg);
		}
		100% {
			stroke-width: 0;
			stroke-opacity: 0;
			transform: scale(1.1) rotate(60deg);
		}
	}
	.todo__box {
		stroke-dasharray: 56.1053, 56.1053;
		stroke-dashoffset: 0;
		transition-delay: 0.16s;
	}
	.todo__check {
		stroke: #bc07bc;
		stroke-dasharray: 9.8995, 9.8995;
		stroke-dashoffset: 9.8995;
		transition-duration: 0.32s;
	}
	.todo__line {
		stroke-dasharray: 168, 1684;
		stroke-dashoffset: 168;
	}
	.todo__circle {
		animation-delay: 0.56s;
		animation-duration: 0.56s;
	}
	.todo__state:checked ~ .todo__text, .todo__state:checked ~ .todo__start {
		transition-delay: 0s;
		color: var(--muted-color);
		opacity: 0.8;
	}
	.todo__state:checked ~ .todo__icon .todo__box {
		stroke-dashoffset: 56.1053;
		transition-delay: 0s;
	}
	.todo__state:checked ~ .todo__icon .todo__line {
		stroke-dashoffset: -8;
	}
	.todo__state:checked ~ .todo__icon .todo__check {
		stroke-dashoffset: 0;
		transition-delay: 0.48s;
	}
	.todo__state:checked ~ .todo__icon .todo__circle {
		animation-name: explode;
	}
</style>
