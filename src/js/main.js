const listeBP = document.querySelector("#listeBP");
fetch("../../data/data.json")
.then(response => {
   return response.json();
}).then(data => {
    data.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(d.category)
        const p = document.createElement("p");
        p.textContent=d.name;
        const divCorner = document.createElement("div");
        divCorner.classList.add("go-corner");

        const divArrow = document.createElement("div");
        divArrow.classList.add("go-arrow");
        divArrow.textContent="X";//➞

        divCorner.appendChild(divArrow);

        div.appendChild(p);
        div.appendChild(divCorner);

        
        if(d.incontournable){
            divCorner.classList.add("color");
            divArrow.textContent="✔";
            div.classList.add("selected");
        }else{
            div.addEventListener("click", () => {
                if(divCorner.classList.contains("color")){
                    divCorner.classList.remove("color");
                    divArrow.textContent="X";
                    div.classList.re7("selected");
                }else{
                    divCorner.classList.add("color");
                    divArrow.textContent="✔";
                    div.classList.add("selected");
                }
                
            });
        }

        listeBP.appendChild(div);
    });
    filterSelection("all");
});


function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("card");
  if (c == "all") c = "";
  // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current control button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}