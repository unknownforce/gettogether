<script>
// enter code on unbounced campuses between script

function waitForElements(callback) {
  const check = () => {
	const provinceSelect = document.getElementById("province_select");
	const campusSelect = document.getElementById("campus_select");
	const redirectButton = document.getElementById("campus_button");

	if (provinceSelect && campusSelect && redirectButton) {
	  callback(provinceSelect, campusSelect, redirectButton);
	} else {
	  setTimeout(check, 100);
	}
  };
  check();
}

waitForElements(function (provinceSelect, campusSelect, redirectButton) {
  /** TESTIN REMOVE */
  console.log("Campus script loaded");
  console.log("PapaParse available:", typeof Papa !== "undefined");

  const csvURL = "https://raw.githubusercontent.com/dupls/leaderboard-campus/main/campuses.csv";
  console.log("PapaParse loaded:", typeof Papa !== "undefined");
  console.log("Starting CSV fetch:", csvURL);

  Papa.parse(csvURL, {
	download: true,
	header: true,
	skipEmptyLines: true,
	complete: function (results) {
	  const data = results.data;
	  if (!data || data.length === 0) {
		console.error("CSV loaded but no data found.");
		return;
	  }
	  const provinces = [...new Set(data.map((entry) => entry.Province?.trim()).filter(Boolean))];
	  console.log("Provinces found:", provinces);

	  console.log("Parsed CSV data:", results.data);

	  provinces.forEach((province) => {
		const option = document.createElement("option");
		option.value = province;
		option.textContent = province;
		provinceSelect.appendChild(option);
	  });

	  provinceSelect.addEventListener("change", function () {
		const selectedProvince = this.value.trim();
		const filtered = data.filter((entry) => entry.Province?.trim() === selectedProvince);
		
		// Reset campus dropdown
		campusSelect.innerHTML = `<option value="">Select a Campus</option>`;

		if (filtered.length > 0) {
		  campusSelect.disabled = false; // ✅ Enable the dropdown
		  
		  filtered.forEach((entry) => {
			const option = document.createElement("option");
			option.value = entry.RedirectURL;
			option.textContent = entry.Campus;
			campusSelect.appendChild(option);
			redirectButton.removeAttribute('disabled');
		  });
		} else {
		  campusSelect.disabled = true; // ✅ Keep it disabled if no match
		}
		
		console.log("Selected province:", selectedProvince);
		console.log("Filtered campuses:", filtered);
	  });

	  redirectButton.addEventListener("click", function () {
		const selectedURL = campusSelect.value;
		if (selectedURL) {
		  window.location.href = selectedURL;
		} else {
		  alert("Please select a campus first.");
		}
	  });
	},
	error: function (err) {
	  console.error("PapaParse error:", err);
	},
  });
});

</script>