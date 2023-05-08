/**
 * Scripts
 * Created by Seth Kerrey
 * 2021-02-18
 */

/**
 * Generate PDF from HTML
 */
function generatePDF() {
const element = document.getElementById('invoice');
var opt = {
   margin:       1,
   filename:     'html2pdf_example.pdf',
   image:        { type: 'jpeg', quality: 0.98 },
   html2canvas:  { scale: 2 },
   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' },
   margin:       .3
};
// Choose the element that our invoice is rendered in.
html2pdf().set(opt).from(element).save();
}

/**
 * Change image on input
 */
function imgChange() {
  var logo = document.getElementById("logo");
  var imgInput = document.getElementById("image-input");
  
  var reader = new FileReader();
  reader.onload = function(e) {
    logo.src = e.target.result;
  }
  reader.readAsDataURL(imgInput.files[0]);
}

/**
 * Change bar color on input
 */
document.getElementById("color-picker").addEventListener("input", function() {
  var bgColor = this.value;
  document.querySelectorAll(".bar-bg").forEach(function(element) {
    element.style.backgroundColor = bgColor;
  });
});

/**
 * Inverse Table Headers button
 */
function inverseTableHeaders() {
  var thDescription = document.querySelector(".th-description");
  var thQty = document.querySelector(".th-qty");
  var thUnit = document.querySelector(".th-unit");
  var thTotal = document.querySelector(".th-total");

  const thArray = [thDescription, thQty, thUnit, thTotal];

  thArray.forEach(function(element) {
    if (element.style.color === "rgb(255, 255, 255)") {
      element.style.color = "#000";
    } else {
      element.style.color = "#fff";
    }
  });
}

/**
 * Add event listener to input fields with class "amount"
 */
var amountElements = document.getElementsByClassName("amount");
for (var i = 0; i < amountElements.length; i++) {
  amountElements[i].querySelector("input").addEventListener("input", updateTotal);
}

// Add event listener to tax-rate input field
document.getElementById("tax-rate").addEventListener("input", updateTotal);

/**
 * Calculate and update the total value of the invoice
 */
function updateTotal() {
  var total = 0;
  for (var i = 0; i < amountElements.length; i++) {
    var amountValue = parseFloat(amountElements[i].querySelector("input").value) || 0;
    total += amountValue;
  }
  
  var taxRate = parseFloat(document.getElementById("tax-rate").value) || 0;
  var taxTotal = total * taxRate;
  var subtotal = total;
  total += taxTotal;

  document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);
  document.getElementById("tax-total").innerHTML = taxTotal.toFixed(2) + " (" + (taxRate * 100) + "%)";
  document.getElementById("total").innerHTML = total.toFixed(2);
}

// Initialize the total value
updateTotal();

/**
 * Add rows to the table when the "Add Row" button is clicked
 */
function addRow() {
  var table = document.querySelector(".payment-description table");
  var tbody = table.querySelector("tbody");
  var rows = tbody.getElementsByTagName("tr");

  // Create the row
  var row = document.createElement("tr");

  // Add the cells to the row
  var descriptionCell = document.createElement("td");
  var descriptionInput = document.createElement("input");
  descriptionInput.classList.add(rows.length % 2 === 0 ? "pd-input" : "bg-white", "w-100");
  descriptionCell.appendChild(descriptionInput);
  row.appendChild(descriptionCell);

  var quantityCell = document.createElement("td");
  var quantityInput = document.createElement("input");
  quantityInput.classList.add(rows.length % 2 === 0 ? "pd-input" : "bg-white", "w-100", "tc");
  quantityCell.appendChild(quantityInput);
  row.appendChild(quantityCell);

  var priceCell = document.createElement("td");
  var priceInput = document.createElement("input");
  priceInput.classList.add(rows.length % 2 === 0 ? "pd-input" : "bg-white", "w-100", "tc");
  priceCell.appendChild(priceInput);
  row.appendChild(priceCell);

  var amountCell = document.createElement("td");
  var amountInput = document.createElement("input");
  amountInput.classList.add(rows.length % 2 === 0 ? "pd-input" : "bg-white", "w-100", "ts");
  amountCell.appendChild(amountInput);
  amountCell.classList.add("amount"); // add the "amount" class to the TOTAL cell
  row.appendChild(amountCell);

  // Add the row to the tbody
  tbody.appendChild(row);

  // Add event listener to the input field in the new row
  amountInput.addEventListener("input", updateTotal);
}

/**
 * Remove rows from the table when the "Remove Row" button is clicked
 */
function removeRow() {
  var table = document.querySelector(".payment-description table");
  var rowCount = table.rows.length;

  // Remove the last row if there is more than one row
  if (rowCount > 2) {
    table.deleteRow(-1);
  }

  // Update the total amount
  updateTotal();
}

