<script>
// add these between the scripts
document.addEventListener("DOMContentLoaded", function() {
	const provinceSelect = document.getElementById("province-select");
	const campusSelect = document.getElementById("campus-select");
	const redirectButton = document.getElementById("redirect-button");

	// Load PapaParse dynamically
	const papaScript = document.createElement("script");
	papaScript.src = "https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js";
	papaScript.onload = function() {

		const proxy = "https://cors-anywhere.herokuapp.com/";
		const csvURL = "https://raw.githubusercontent.com/dupls/leaderboard-campus/main/campuses.csv";

		Papa.parse("https://raw.githubusercontent.com/dupls/leaderboard-campus/main/campuses.csv", {
			download: true,
			header: true,
			skipEmptyLines: true,
			complete: function(results) {
				const data = results.data;

				if (!data || data.length === 0) {
					console.error("CSV loaded but no data found.");
					return;
				}

				// Get unique provinces
				const provinces = [...new Set(data.map(entry => entry.Province).filter(Boolean))];

				provinces.forEach(province => {
					const option = document.createElement("option");
					option.value = province;
					option.textContent = province;
					provinceSelect.appendChild(option);
				});

				// Populate campuses when province is selected
				provinceSelect.addEventListener("change", function() {
					const selectedProvince = this.value;
					campusSelect.innerHTML = `<option value="">Select a Campus</option>`;

					const filtered = data.filter(entry => entry.Province === selectedProvince);

					filtered.forEach(entry => {
						const option = document.createElement("option");
						option.value = entry.RedirectURL;
						option.textContent = entry.Campus;
						campusSelect.appendChild(option);
					});
				});

				const redirectButton = document.getElementById("redirect-button");

				redirectButton.addEventListener("click", function() {
					const selectedURL = campusSelect.value;
					if (selectedURL) {
						window.location.href = selectedURL;
					} else {
						alert("Please select a campus first.");
					}
				});

				// Redirect when campus is selected
				// campusSelect.addEventListener("change", function() {
				//    const url = this.value;
				//   if (url) window.location.href = url;
				// });
			},
			error: function(err) {
				console.error("PapaParse error:", err);
			}
		});
	};

	document.head.appendChild(papaScript);
});
</script>
