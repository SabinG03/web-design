function increaseCounter(segmentIndex)
{
  var counterDisplay = document.getElementById('counter-display-' + segmentIndex);
  var currentValue = parseInt(counterDisplay.textContent);
  currentValue++;
  counterDisplay.textContent = currentValue;
}

function decreaseCounter(segmentIndex)
{
  var counterDisplay = document.getElementById('counter-display-' + segmentIndex);
  var currentValue = parseInt(counterDisplay.textContent);
  if (currentValue > 0) 
  {
    currentValue--;
    counterDisplay.textContent = currentValue;
  }
}
