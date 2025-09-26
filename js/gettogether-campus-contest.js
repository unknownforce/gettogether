<script src="//ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js" type="text/javascript"></script>
<script>
// contents of this file in on unbounce.com within <script>
// copy this to unbounce
document.addEventListener("DOMContentLoaded", function() {
	const loader = document.getElementById("leaderboard-loader");
	const container = document.getElementById("leaderboard-container");

	// Show loader over leaderboard block
	loader.style.display = "flex";
	//simulate delay
	const MIN_DISPLAY_TIME = 3000; // Minimum time to show loader (in ms)
	const startTime = Date.now();

	fetch("https://leaderboard-backend-72i9.onrender.com/leaderboard", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-api-key": "Ql|gK$1U]s;~9(1800" // Render API key
			}
		})
		.then(response => {
			if (!response.ok) throw new Error("Forbidden");
			return response.json();
		})
		.then(data => {
			const {
				lastUpdated,
				entries
			} = data;
			if (!container) return;

			// ✅ Sort entries by DPA score descending
			const sortedEntries = entries
				.filter(entry => !isNaN(entry.dpa)) // Optional: filter out invalid scores
				.sort((a, b) => b.dpa - a.dpa);

			// Clear and build leaderboard content
			container.innerHTML = `
	<div class="row header">
	  <div class="rank">Rank</div>
	  <div class="name">Post-secondary school</div>
	  <div class="points">DPA score</div>
	</div>
  `;

			sortedEntries.slice(0, 10).forEach((entry, index) => {
				const row = document.createElement("div");
				row.className = "row";
				if (index === 0) row.classList.add("gold");
				else if (index === 1) row.classList.add("silver");
				else if (index === 2) row.classList.add("bronze");

				row.innerHTML = `
	  <div class="rank">${index + 1}</div>
	  <div class="name">${entry.post_secondary}</div>
	  <div class="points">${Number(entry.dpa).toFixed(2)}</div>
	`;
				container.appendChild(row);
			});
			// adding timestamp footer
			const timestamp = new Date(lastUpdated).toLocaleString();
			const footer = document.createElement("div");
			footer.className = "timestamp";
			footer.textContent = `Last updated: ${timestamp}`;
			container.appendChild(footer);

			// ✅ Delay hiding the loader to ensure smooth UX
			const elapsedTime = Date.now() - startTime;
			const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsedTime);

			setTimeout(() => {
				loader.style.display = "none";
				container.style.display = "block";
			}, remainingTime);
		})
		.catch(error => {
			console.error("Fetch error:", error);
			loader.style.display = "none";
			container.innerHTML = `<div class="row">Error loading leaderboard data.</div>`;
		});
});
</script>