//Calculate Tip
function calculateTip()
{
   const billAmt = document.getElementById("billamt").value;
   const serviceQual = document.getElementById("serviceQual").value;
   // FIX: Changed from const to let so we can reassign numOfPeople to 1 if empty
   let numOfPeople = document.getElementById("peopleamt").value;

   //validate input
   if (billAmt === "" || serviceQual == 0)
   {
      alert("Please enter values");
      return;
   }

   //Check to see if this input is empty or less than or equal to 1
   if (numOfPeople === "" || numOfPeople <= 1)
   {
      numOfPeople = 1;
      document.getElementById("each").style.display = "none";
   }
   else
   {
      document.getElementById("each").style.display = "block";
   }

   //Calculate tip
   let total = ((billAmt * serviceQual) / numOfPeople);
   //round to two decimal places
   total = Math.round(total * 100) / 100;
   //next line allows us to always have two digits after decimal point
   total = total.toFixed(2);
   //Display the tip
   document.getElementById("totalTip").style.display = "block";
   document.getElementById("tip").innerHTML = total;
}

//Hide the tip amount on load
document.getElementById("totalTip").style.display = "none";
document.getElementById("each").style.display = "none";

//click to call function
document.getElementById("calculate").onclick = function() {
   calculateTip();
};
