const listeBP = document.querySelector("#listeBP");
fetch("../../data/data.json")
.then(response => {
   return response.json();
}).then(data => {
    data.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.classList.add(d.category)
        div.textContent=d.name;
        const divCorner = document.createElement("div");
        divCorner.classList.add("corner");
        divCorner.textContent="X";
        div.appendChild(divCorner);

        if(d.incontournable){
            divCorner.classList.add("color");
            divCorner.textContent="✔";
            div.classList.add("selected");
        }else{
            div.addEventListener("click", () => {
                if(divCorner.classList.contains("color")){
                    divCorner.classList.remove("color");
                    divCorner.textContent="X";
                    div.classList.remove("selected");
                    if(document.querySelector(".active").id=="selected"){
                      filterSelection("selected");
                    }
                }else{
                    divCorner.classList.add("color");
                    divCorner.textContent="✔";
                    div.classList.add("selected");
                }
                
            });
        }

        listeBP.appendChild(div);
    });
    filterSelection("all");
});

function filterSelection(filter) {
  const cards = document.querySelectorAll(".card");
  if (filter == "all") filter = "card";
  cards.forEach((c) => {
    c.classList.remove("show");
    if (c.classList.contains(filter)){
      c.classList.add("show");
    }
  });
}

const btns = document.querySelectorAll("#myBtnContainer .btn");
btns.forEach((b) => {
    b.addEventListener("click", function() {
        const current = document.querySelector(".active");
        current.classList.remove("active");
        this.classList.add("active");
        filterSelection(b.id);
      });
});