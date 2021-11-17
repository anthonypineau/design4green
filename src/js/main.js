const listeBP = document.querySelector("#listeBP");
fetch("../../data/data.json")
.then(response => {
   return response.json();
}).then(data => {
    data.forEach(d => {
        const div = document.createElement("div");
        div.classList.add("card");
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

        div.addEventListener("click", () => {
            if(divCorner.classList.contains("color")){
                divCorner.classList.remove("color");
                divArrow.textContent="X";
            }else{
                divCorner.classList.add("color");
                divArrow.textContent="V";
            }
            
        });

        listeBP.appendChild(div);
    });
});