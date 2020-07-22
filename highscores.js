const inputInitials = document.getElementById("inputInitials");
const inputScore = document.getElementById("inputScore");
const enterScore = document.getElementById("enterScore");
const lsOutput = document.getElementById("isOutput");


enterScore.onclick = function() {
  const key = inputInitials.value;
  const value = inputScore.value;

  if (key && value) {
    localStorage.setItem(key, value);
    location.reload();
  }
};

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    lsOutput.innerHTML += `${key}: ${value}<br />`;
   
}