document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    let allTools = [];

    fetch('tools.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Remove header row
            allTools = rows.map(row => {
                const [name, location, description, size] = row.split(',');
                return { name, location, description, size };
            });

            // Sort tools alphabetically by name
            allTools.sort((a, b) => a.name.localeCompare(b.name));
        });

    function displayResults(tools) {
        resultsDiv.innerHTML = '';

        if (tools.length === 0) {
            resultsDiv.innerHTML = 'No results found.';
            return;
        }

        tools.forEach(tool => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('search-result');

            const namePara = document.createElement('p');
            namePara.classList.add('tool-name');
            namePara.textContent = tool.name;

            const locationPara = document.createElement('p');
            locationPara.classList.add('tool-location');
            locationPara.textContent = tool.location;

            const detailsPara = document.createElement('p');
            detailsPara.classList.add('tool-details');
            detailsPara.textContent = `${tool.size}, ${tool.description}`;

            resultDiv.appendChild(namePara);
            resultDiv.appendChild(locationPara);
            resultDiv.appendChild(detailsPara);

            resultsDiv.appendChild(resultDiv);
        });
    }

    searchInput.addEventListener('input', function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTools = allTools.filter(tool =>
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.location.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm) ||
            tool.size.toLowerCase().includes(searchTerm)
        );
        displayResults(filteredTools);
    });
});
