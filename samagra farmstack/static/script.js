console.log("JavaScript code is executing...");

document.addEventListener('DOMContentLoaded', () => {
    // Get the analyze form from the analyze.html
    const analyzeform = document.getElementById('analyzeform');
  
    // Add a submit event liste ner to the analyze form
    analyzeform.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
  
      // Retrieve the selected datasets and tables
      const selectedDatasets = Array.from(document.querySelectorAll('input[name="dataset"]:checked')).map((checkbox) => checkbox.value);
      const selectedTables = Array.from(document.querySelectorAll('input[name="table"]:checked')).map((checkbox) => checkbox.value);
  
      // Check if at least one dataset and one table are selected
      if (selectedDatasets.length === 0 || selectedTables.length === 0) {
        alert('Please select at least one dataset and one table.');
        return;
      }
  
      // Retrieve the selected visualization
      const selectedVisualization = document.getElementById('visualization').value;
  
      // Retrieve the analysis name
      const analysisName = document.getElementById('name').value;
  
      // Create a FormData object to send the form data
      const formData = new FormData();
      formData.append('name', analysisName);
      selectedDatasets.forEach((dataset) => {
        formData.append('dataset', dataset);
      });
      selectedTables.forEach((table) => {
        formData.append('table', table);
      });
      formData.append('visualization', selectedVisualization);
  
      // Send a POST request to the analyze endpoint
      fetch('/analyze', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            // Redirect to the success page
            window.location.href = '/success?analysis_name=' + encodeURIComponent(analysisName);
          } else {
            alert('An error occurred. Please try again.');
          }
        })
        .catch((error) => {
          console.error(error);
          alert('An error occurred. Please try again.');
        });
    });
  });
  