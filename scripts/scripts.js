
   function generatePDF() {
   const element = document.getElementById('invoice');
   var opt = {
      margin:       1,
      filename:     'html2pdf_example.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    // Choose the element that our invoice is rendered in.
    html2pdf().set(opt).from(element).save();
   }