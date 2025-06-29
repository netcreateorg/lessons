$(document).foundation()

// ItemCard button and checkbox filtering
const filterButtons = document.querySelectorAll('.filter-button');
const filterCheckboxes = document.querySelectorAll('.checkbox-wrapper input[type="checkbox"]'); // Update the selector here
const itemCards = document.querySelectorAll('.filter-item');

function filterItems() {
	const selectedCategories = Array.from(filterButtons)
		.filter(button => button.classList.contains('active'))
		.map(button => button.dataset.category);

	const selectedFormats = Array.from(filterCheckboxes)
		.filter(checkbox => checkbox.checked)
		.map(checkbox => checkbox.dataset.format);

	itemCards.forEach(card => {
		const itemCategories = card.dataset.categories.split(',');
		const itemFormats = card.dataset.formats.split(',');

		// we want it to be true and this show the item if either there is no selection in the category / format, or if there is a specific matching selection
		// nothing selected means we should show all (I think we can remove the show all now, but leaving for moment)

		const showAll = selectedCategories.length === 0 && selectedFormats.length === 0;
		const showCat = selectedCategories.length === 0 || selectedCategories.some(category => itemCategories.includes(category));

		const showForm =  selectedFormats.length === 0 || selectedFormats.some(format => itemFormats.includes(format));
		const isPerson = selectedFormats.some(format => itemFormats.includes('person'));

		if ((showAll || (showCat && showForm))) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
}

filterButtons.forEach(button => {
	button.addEventListener('click', () => {
		button.classList.toggle('active');
		filterItems();
	});
});

filterCheckboxes.forEach(checkbox => {
	checkbox.addEventListener('change', () => {
		filterItems();
	});
});
