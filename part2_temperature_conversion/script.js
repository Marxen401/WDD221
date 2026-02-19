// Function to convert Fahrenheit to Celsius
function convertTemperature() {
    // Get the input value
    let fahrenheitInput = document.getElementById("fahrenheit").value;
    
    // Get the result div
    let resultDiv = document.getElementById("result");
    
    // Validate input
    if (fahrenheitInput === "") {
        resultDiv.className = "result";
        resultDiv.innerHTML = "Please enter a temperature value!";
        resultDiv.style.backgroundColor = "#ffcccc";
        resultDiv.style.color = "#cc0000";
        return;
    }
    
    // Convert string to number
    let fahrenheit = parseFloat(fahrenheitInput);
    
    // Perform conversion: °C = (°F - 32) × 5/9
    let celsius = (fahrenheit - 32) * (5 / 9);
    
    // Round to 2 decimal places
    celsius = Math.round(celsius * 100) / 100;
    
    // Display result
    resultDiv.className = "result show";
    resultDiv.innerHTML = `${fahrenheit}°F = ${celsius}°C`;
    
    // Log to console
    console.log(`Conversion: ${fahrenheit}°F = ${celsius}°C`);
}

// Allow Enter key to trigger conversion
document.getElementById("fahrenheit").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});

// Optional: Add event listener for real-time conversion as user types
document.getElementById("fahrenheit").addEventListener("input", function() {
    let resultDiv = document.getElementById("result");
    if (this.value !== "") {
        resultDiv.className = "result";
        resultDiv.innerHTML = "Click 'Convert' to see the result";
        resultDiv.style.backgroundColor = "#e9ecef";
        resultDiv.style.color = "#6c757d";
    } else {
        resultDiv.className = "result";
        resultDiv.innerHTML = "";
    }
});
