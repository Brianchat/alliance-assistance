<script>
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { extent, max, min } from 'd3-array';
	import { timeYear, timeMonth, timeDay, timeHour } from 'd3-time';
	import { task, tasks, newTask } from '$lib/stores/task';
	import labella from 'labella';    
	import { getContext } from 'svelte';

	let years=[];
	let months=[];
	let days=[];
	let hours=[];
	let level=1;
	let labels=[];
	let paths=[];
	let now = new Date();
	let firstDate = new Date(Date.now() - 1000*60*60); // $tasks.total_rows > 0 ? min($tasks.rows, d => new Date(d.doc.start)) : new Date(Date.now() - 864e5);
	let lastDate = new Date(Date.now() + 1000*60*60); //$tasks.total_rows > 0 ? max($tasks.rows, d => new Date(d.doc.end)) : new Date();
	let yScale = scaleTime()
			.domain([ firstDate, lastDate ])
			.range([ 0, height ])
			.nice();
	let start = yScale.domain()[0];
	let end = yScale.domain()[1];
	let counter = 2;

	const force = new labella.Force({
		minPos: null,
		maxPos: yScale(now),
		// algorithm: none
	});

	var renderer = new labella.Renderer({
      layerGap: 30,
      nodeHeight: 40,
      direction: 'right'
    });

	const select = (t) => {
		if( $task._id === t._id ){
			task.set( {title: ''} );
		} else {
			task.set(t);
		}
	}

	const nth = (d) => {
		if (d > 3 && d < 21) return ""+d+'th';
		switch (d % 10) {
			case 1:  return "1st";
			case 2:  return "2nd";
			case 3:  return "3rd";
			default: return ""+d+"th";
		}
	};

	setInterval(() => {
		now = new Date();
		lastDate = new Date(Date.now() + 1000*60*60)
  	}, 10000)

	const update = ()=>{
		counter = counter*2;
		firstDate = new Date(Date.now() - counter*1000*60*60);
	}
	
	const reset = ()=>{
		counter = 2;
		firstDate = new Date(Date.now() - 1000*60*60);
	}

	const eventHeight = (d)=>{ 
		let h = yScale( new Date(d.end) ) - yScale( new Date(d.start) );
		if( h<20 ) h=20;
		return h; 
	};

	const clientSettings = getContext('clientSettings');

	$: width = $clientSettings.w > 900 ? 900 : $clientSettings.w ;
    $: height = $clientSettings.h - $clientSettings.navHeight -3 || $clientSettings.h;
	$: {
		yScale = scaleTime()
			.domain([ firstDate, lastDate ])
			.range([ 0, height ])
			.nice();

		start = yScale.domain()[0];
		end = yScale.domain()[1];
		
		years = timeYear.every(1).range(start, end);
		months= [];
		days= [];
		hours= [];		

		if( years.length > 1 ){ // We are using 1 rather than 0 as we do want year ticks if looking at the days or hours over New Years Eve/Day.
			level=4;
		} else {
			months = timeMonth.every(1).range(start, end);
			if( months.length > 1 ){
				level=3;
			} else {
				days = timeDay.every(1).range(start, end);
				level=2;

				let hourHeight= yScale( days[1] );
				if ( hourHeight <150 ){
					hours = timeHour.every(6).range(start, end);
					level=1;
				} else if ( hourHeight <301 ){
					hours = timeHour.every(4).range(start, end);
					level=1;
				} else if ( hourHeight <601 ){
					hours = timeHour.every(2).range(start, end);
					level=1;
				} else {
					hours = timeHour.every(1).range(start, end);
					level=1;
				};
			}
		}

		labels = [];
		if ($tasks && $tasks.length > 0) {	
			$tasks.forEach((task)=>{
				const start = yScale(new Date(task.start));
				labels.push(new labella.Node(start, 24, {
					_id: task._id,
					title: task.title,
					color: task.color
				} ));
			});
		}
		
		force.nodes(labels).compute();
		paths=[];
		labels.forEach((d)=> {
			paths.push({ d: renderer.generatePath(d), color: d.data.color });
		});
	};

</script>

<div class='timeline' style="--width:{width};--height:{height};">
	<svg width={width} height={height} >
		<g class="axis">
			{#each years as tick}
				<g class="tick year" >
					<line stroke="#aaa" x1=35 x2={width} y1={ yScale( tick ) } y2={ yScale( tick) } stroke-width=3 ></line>

						<text fill="#aaa" x="2" y="{yScale( tick ) }" dy="7" font-size="10pt" >{ tick.getFullYear() }</text>

				</g>	
			{/each}
			{#each months as tick}
				<g class="tick month" >
					<line stroke="#aaa" x1=35 x2={width} y1={ yScale( tick ) } y2={ yScale( tick) } stroke-width=2 ></line>
					{#if tick.getMonth() != 0  }
					<text fill="#aaa" x="2" y="{yScale( tick )}" dy="7" font-size="9pt" >{ tick.toLocaleString('default', { month: 'long' }) }</text>
					{/if}
				</g>
				
			{/each}
			{#each days as tick}
				<g class="tick day" >
					<line stroke="#aaa" x1=35 x2={width} y1={ yScale( tick ) } y2={ yScale( tick ) } stroke-width=1></line>
					{#if tick.getDate() != 1 }
						<text fill="#aaa" x="2" y="{yScale( tick )}"  dy="7" font-size="8pt">{ nth(tick.getDate()) }</text>
					{/if}
				</g>
			{/each}
			{#each hours as tick}
				<g class="tick hour" >
					<line stroke="#aaa" x1=35 x2={width} y1={ yScale( tick ) } y2={ yScale( tick ) } stroke-dasharray="1,2" stroke-width=1></line>
					{#if tick.getHours() != 0 }
						<text fill="#aaa" x="2" y={ yScale( tick ) } dy="6" font-size="7pt">{tick.toLocaleTimeString([], { hourCycle: 'h23', hour: '2-digit', minute: '2-digit' })}</text>
					{/if}
				</g>
			{/each}
			<line stroke="{ $task.color || '#555' }" x1={width-2} x2={width-2} y1={ 0 } y2={ height } stroke-width=4></line>
		</g>

		<line stroke="#bc07bc" x1=0 x2={width} y1={ yScale( now ) } y2={ yScale( now ) } stroke-width=1></line>

		<g style="transform: translate(40px, 2px);">
			{#if paths.length > 0} 
				{#each paths as d }
					<path class="timeline-path" d={d.d}  style="stroke: {d.color};"/>
				{/each}
			{/if}
		</g>

		{#each labels as d }
			<rect class="timeline-event" x={40}  y={d.idealPos-1} width=6 height=6 rx="3" style="stroke: {d.data.color};"/>
		{/each}
	</svg>
	{#each labels as d }
	<div on:click={select(d.data)} class="timeline-event gradient-text {d.data._id == $task._id ? 'active' :'' }" style="left: 70px;  top:{d.currentPos - 10}px; width:{d.data._id == $task._id ?  ''+width+'px' :  'auto'}; height:20px; border-color:{ d.data.color }">
		<span>{ d.data.title }</span>
	</div>
	{/each}
	<button on:click={update} class="up" style="top:2px;left:2px">^</button>
	<button on:click={reset} class="up" style="top:2px;left:18px">Reset</button>
	<button on:click={newTask} class="button new" style="top:{yScale( now )-25}px;">+</button>
</div>

<style>
	.timeline {
		width: calc(var(--width) * 1px - 1px);
		background-color: #eee;
		margin-right: auto;
		margin-left: auto;
		position: relative;
		border-left: solid 1px #2d2d2d;
	}

	rect.timeline-event {
		fill: #eee;
	}

	div.timeline-event{
		position: absolute;
		/* background-image: linear-gradient(90deg, #FFB03A 0 50%, #E21143 50% 100%); */
		background-color: #fff;
		border: solid 1px #aaa;
		border-left-width: 3px;
		padding: 0px 3px 1px 3px;
		display: flex;
		align-items: center;
	}

	.timeline-event:hover {
		cursor: pointer;
	}

	div.timeline-event.gradient-text span{
		/* background-image: linear-gradient(90deg, #E21143 0 50%, #FFB03A 50% 100%);
		background-clip: text;
		color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent; */
		color: #111;
		font-size: 14px;
	}

	.timeline-event:hover, .timeline-event.active {
		border-color: #666;
	}

	div.timeline-event:hover span, div.timeline-event.active span {
		font-size: 15px;
	}

	button {
		position: absolute;
	}

	button.button.new {
		left: 10px;
		width: 50px;
		height: 50px;
		font-size: 30px;
		color: #808080;
		border: solid 1px #bc07bc;
		box-shadow: 2px 2px 15px #555;
		padding: 0px;
	}

	button.button.new, button.button.new::before, button.button.new::after {
		border-radius: 25px;
	}

	button.button.new::after {
		box-shadow: 0px 0px 5px #555;
	}

	button.button.new:hover::after {
		box-shadow: none;
	}

	path {
		fill: none;
	}

</style>