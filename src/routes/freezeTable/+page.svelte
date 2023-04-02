<div class="wrapper">
	<table role="grid">
		<thead>
			<tr>
				<th scope="col" class="sticky-col first-col">Number</th>
				<th scope="col" class="sticky-col second-col" >First Name</th>
                <th class="splitter" ></th>
				<th scope="col" >Last Name</th>
				<th scope="col" >Employer</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row" class="sticky-col first-col">1</th>
				<th scope="row" class="sticky-col second-col">Mark</th>
				<td class="splitter" />
				<td>Ham</td>
				<td>Micro</td>
			</tr>
			<tr>
				<th scope="row" class="sticky-col first-col">2</th>
				<td class="sticky-col second-col">Jacob</td>
				<td class="splitter" />
				<td>Smith</td>
				<td>Adob Adob Adob AdobAdob Adob Adob Adob Adob</td>
			</tr>
			<tr>
				<th scope="row" class="sticky-col first-col">3</th>
				<td class="sticky-col second-col">Larry</td>
				<td class="splitter" />
				<td>Wen</td>
				<td>Goog Goog Goog GoogGoog Goog Goog Goog Goog Goog</td>
			</tr>
		</tbody>
	</table>
</div>

<style>
	.wrapper {
		position: relative;
		overflow: auto;
		white-space: nowrap;
	}

	table {
		border-collapse: collapse;
	}

	.sticky-col {
		position: -webkit-sticky;
		position: sticky;
		background-color: var(--background-color);
	}

    tbody tr:nth-child(odd) td, tbody tr:nth-child(odd) th {
        background-color: var(--secondary);
        color: var(--secondary-inverse);
    }

	.first-col {
		width: 100px;
		min-width: 100px;
		max-width: 100px;
		left: 0px;
	}

	.second-col {
		width: 150px;
		min-width: 150px;
		max-width: 150px;
		left: 100px;
	}

	.splitter {
		position: -webkit-sticky;
		position: sticky;
		left: 250px;
		min-width: 1px;
		max-width: 1px;
		padding: 0px;
		background-color: var(--table-border-color);
	}
</style>
