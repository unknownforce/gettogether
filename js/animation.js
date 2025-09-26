<script>
var downwardarrow = document.getElementsByClassName("downward-arrow");

  downwardarrow.addEventListener("click", function () {
		e.preventDefault();
		$('html,body').animate({scrollTop: $(this.hash).offset().top}, 500);
	});
</script>