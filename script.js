function checkAddress() {
    var loader = document.getElementById("loader");
    loader.style.display = "block";
    var inputAddresses = document.getElementById("address").value.toLowerCase().split("\n").map(addr => addr.trim());

    fetch('HolographRFP.txt')
        .then(response => response.text())
        .then(html => {
            var resultContainer = document.getElementById("result-container");
            var resultTable = document.getElementById("resultTable").querySelector("tbody");
            var tableHeaders = document.getElementById("resultTable").querySelector("thead");
            resultTable.innerHTML = '';
            tableHeaders.style.display = 'none';

            inputAddresses.forEach(address => {
                if (address) {
                    var result = html.includes(address) ? "ELIGIBLE" : "NOT ELIGIBLE";
                    var row = resultTable.insertRow();
                    row.insertCell(0).textContent = address;
                    row.insertCell(1).textContent = result;
                }
            });

            
            if (resultTable.rows.length > 0) {
                tableHeaders.style.display = 'table-header-group';
            }


            loader.style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            loader.style.display = "none";
        });
}