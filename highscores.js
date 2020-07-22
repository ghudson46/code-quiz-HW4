const inputInitials = document.getElementById("inputInitials");
const inputScore = document.getElementById("inputScore");
const enterScore = document.getElementById("enterScore");
const isOutput = document.getElementById("isOutput");

enterScore.onclick = function() {
  const initial = inputInitials.value;
  const score = inputScore.value;

  if ( initial && score) {
    localStorage.setItem(initial, score);
    location.reload();
  }
};



for (let i = 0; i < localStorage.length; i++) {
  const initial = localStorage.initial(i);
  const score = localStorage.getItem(initial);

  isOutput.innerHTML += `${initial}: ${score}<br />`;
}