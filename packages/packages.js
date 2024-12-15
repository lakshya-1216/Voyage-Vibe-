const packageData = {
    paris: { 
        name: "Paris", 
        1: "Day 1: Eiffel Tower",
        2: "Day 1: Eiffel Tower, Day 2: Loire Valley",
        3: "Day 1: Eiffel Tower, Day 2: Louvre Museum, Day 3: Seine River Cruise", 
        4: "Day 1: Eiffel Tower, Day 2: Louvre Museum, Day 3: Seine River Cruise, Day 4: French Riviera",
        5: "Day 1-2: Paris Highlights, Day 3: Versailles Palace, Day 4-5: Disneyland Paris",
        6: "Day 1-2: Paris Highlights, Day 3: Versailles Palace, Day 4-5: Disneyland Paris, Day 6: Eiffel Tower", 
        7: "Day 1-3: City Highlights, Day 4-5: Loire Valley, Day 6-7: French Riviera"
    },
    new_york: { 
        name: "New York", 
        1: "Day 1: Niagara Falls",
        2: "Day 1: Highlights, Day 2: Long Island",
        3: "Day 1: Times Square, Day 2: Statue of Liberty, Day 3: Central Park",
        4: "Day 1: Times Square, Day 2: Statue of Liberty, Day 3: Central Park, Day 4: Museums",
        5: "Day 1-3: City Highlights, Day 4-5: Museums & Broadway Shows", 
        6: "Day 1-3: Highlights, Day 4-5: Long Island, Day 6: Statue of Liberty",
        7: "Day 1-3: Highlights, Day 4-5: Long Island, Day 6-7: Niagara Falls"
    },
    tokyo: { 
        name: "Tokyo", 
        1: "Day 1: Tokyo Tower",
        2: "Day 1: Tokyo Tower, Day 2: Senso-ji Temple",
        3: "Day 1: Tokyo Tower, Day 2: Senso-ji Temple, Day 3: Akihabara", 
        4: "Day 1: Tokyo Tower, Day 2: Senso-ji Temple, Day 3: Akihabara, Day 4: Mount Fuji", 
        5: "Day 1-3: City Highlights, Day 4: Mount Fuji, Day 5: Tokyo Disneyland", 
        6: "Day 1-3: City Highlights, Day 4: Mount Fuji, Day 5: Tokyo Disneyland, Day 6: Kyoto", 
        7: "Day 1-3: Highlights, Day 4-5: Kyoto, Day 6-7: Osaka"
    }
};

document.getElementById('days').addEventListener('change', function () {
    const selectedDays = this.value;
    const placeDropdown = document.getElementById('place');
    const resultSection = document.createElement('section');
    resultSection.classList.add('result-section');
    const packageDetails = document.querySelector('.pack-sect');
    const selectedPlace = placeDropdown.value;

    if (selectedPlace !== "select-Value" && packageData[selectedPlace][selectedDays]) {
        const itinerary = packageData[selectedPlace][selectedDays];
        resultSection.innerHTML = `
            <h3>Package for ${packageData[selectedPlace].name} (${selectedDays} days)</h3>
            <p><strong>Itinerary:</strong> ${itinerary}</p>
        `;
    } else {
        resultSection.innerHTML = `<p>Please select a valid destination or number of days.</p>`;
    }

    const existingResult = document.querySelector('.result-section');
    if (existingResult) {
        existingResult.remove();
    }
    packageDetails.appendChild(resultSection);
});

document.getElementById('place').addEventListener('change', function () {
    document.getElementById('days').value = "";
    const existingResult = document.querySelector('.result-section');
    if (existingResult) {
        existingResult.remove();
    }
});
