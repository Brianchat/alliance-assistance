<script>
	import { writable } from 'svelte/store';
	import Airtable from 'airtable';

	const base = new Airtable({apiKey: 'pat714QBPWnkOi3r7.04902f7721e126f9b01d6484d7edf39fbd88484bfe1c2778d40e1d07e9a946fc'}).base('appeQues42dYRwHjz');
	const user = writable([]);
	const carReg = writable('');
	
	const check= ()=>{
		base('Customers').select({
			// filterByFormula: `(Car Registration Number)='${carReg}'`,
			sort: [
				{field: 'Surname', direction: 'asc'}
			]
		}).eachPage(function page(records, fetchNextPage) {
			records.forEach(function(record) {
				user.update((a) => a.push(record.get('Membership No')));
			});
			// fetchNextPage();
		}, function done(error) {
			console.log(error);
		});
	}
</script>

<div class="container">
	<!-- code here -->
	<div class="card">
		<div class="card-warning">
			<h2 class="card-heading">
				Warning: Early Release 
				<small>This service is currently only available for select customers who have an active policy with
                    Alliance Insurance.</small>
			</h2>
		</div>
		<form class="card-form">
			<h2 class="card-heading">Login:</h2>
            <div class="input">
				<input name="carReg" type="text" class="input-field" required  bind:value={$carReg}/>
				<label for="carReg" class="input-label">Car Registration</label>
			</div>
			<div class="action">
				<button class="action-button" on:click={check}>Next</button>
			</div>
		</form>
		<div class="card-info">
			<p>By signing up you are agreeing to our <a href="#">Terms and Conditions</a></p>
		</div>
	</div>
</div>

{ JSON.stringify(user) }

<style>


</style>
