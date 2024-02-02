document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const parkingList = document.getElementById('parkingList');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Simulate fetching data from the server
        const data = [
            { id: 1, name: 'Parking Spot A', location: 'City 1' },
            { id: 2, name: 'Parking Spot B', location: 'City 2' },
            { id: 3, name: 'Parking Spot C', location: 'City 3' },
        ];

        // Clear previous results
        parkingList.innerHTML = '';

        // Display results
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.name} - ${item.location}`;
            parkingList.appendChild(listItem);
        });
    });
});
