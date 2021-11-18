const listeBP = document.querySelector("#listeBP");
const listeBPChecked = new Array();
const phases = ["Aucune phase", "Administration", "Conception", "Réalisation", "Acquisition", "Déploiement", "Utilisation", "Maintenance", "Fin de vie", "Revalorisation"];

fetch("../../data/data.json")
.then(response => {
   return response.json();
}).then(data => {
    data.forEach(d => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add(d.category)
      div.textContent=d.name;
      if(d.incontournable){
        div.classList.add("incontournable");
        div.classList.add("selected");
        listeBPChecked.push(d);
      }else{
        div.classList.add("contournable");
        div.addEventListener("click", () => {
            if(div.classList.contains("selected")){
                div.classList.remove("selected");
                if(document.querySelector(".active").id=="selected"){
                  filterSelection("selected");
                }
                listeBPChecked.splice(listeBPChecked.indexOf(d), 1);
            }else{
                div.classList.add("selected");
                listeBPChecked.push(d);
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

document.querySelectorAll(".submit").forEach((i) => {
  i.addEventListener("click", () => {
    const divTable = document.querySelector(".table");
    divTable.innerHTML="";
    const table = document.createElement("table");
    phases.forEach((p) => {
      const thead = document.createElement("thead");
      const trhead = document.createElement("tr");
      const thPhase = document.createElement("th");
      const thStep = document.createElement("th");
      const thIndicateur = document.createElement("th");
      

      thPhase.textContent=p;
      thStep.textContent="Étapes clés";
      thIndicateur.textContent="Indicateurs";
      

      trhead.appendChild(thPhase);
      trhead.appendChild(thStep);
      trhead.appendChild(thIndicateur);
      thead.appendChild(trhead);
      table.appendChild(thead);
      const tbody = document.createElement("tbody");
      const listeBPCheckedFilter = listeBPChecked.filter((e) => { return p==e.lifecycle; });
      listeBPCheckedFilter.forEach((i) => {
        const trbody = document.createElement("tr");
        const tdPhase = document.createElement("td");
        const tdStep = document.createElement("td");
        const tdIndicateur = document.createElement("td");
        
        tdPhase.textContent=i.name;
        tdStep.textContent=i.keystep;
        if(i.indicator!=""){
          tdIndicateur.textContent=i.indicator+", x : "+i.indicatorX+", y :"+i.indicatorY;
        }else{
          tdIndicateur.textContent="Aucuns indicateurs";
        }
        
        trbody.appendChild(tdPhase);
        trbody.appendChild(tdStep);
        trbody.appendChild(tdIndicateur);
        tbody.appendChild(trbody);
      });
      table.appendChild(tbody);
    });
    divTable.appendChild(table);
  });
});

/*
    <script>  
        //user-defined function to download CSV file  
        function downloadCSV(csv, filename) {  
            var csvFile;  
            var downloadLink;  
             
            //define the file type to text/csv  
            csvFile = new Blob([csv], {type: 'text/csv'});  
            downloadLink = document.createElement("a");  
            downloadLink.download = filename;  
            downloadLink.href = window.URL.createObjectURL(csvFile);  
            downloadLink.style.display = "none";  
          
            document.body.appendChild(downloadLink);  
            downloadLink.click();  
        }  
          
        //user-defined function to export the data to CSV file format  
        function exportTableToCSV(filename) {  
           //declare a JavaScript variable of array type  
           var csv = [];  
           var rows = document.querySelectorAll("table tr");  
           
           //merge the whole data in tabular form   
           for(var i=0; i<rows.length; i++) {  
            var row = [], cols = rows[i].querySelectorAll("td, th");  
            for( var j=0; j<cols.length; j++)  
               row.push(cols[j].innerText);  
            csv.push(row.join(";"));  
           }   
           //call the function to download the CSV file  
           downloadCSV(csv.join("\n"), filename);  
        }  
        </script>  
          
        <>  
        
        <table>  
        <tr>  
            <th> Name </th>  
            <th> Profession </th>  
            <th> Age </th>  
            <th> Hobby </th>  
        </tr>  
        <tr>  
            <td> Cristiano </td>  
            <td> Hacker </td>  
            <td> 24 </td>  
            <td> Travelling, Sky-diving </td>  
        </tr>  
        <tr>  
            <td> Jenifer </td>  
            <td> Photographer </td>  
            <td> 22 </td>  
            <td> Cooking </td>  
        </tr>  
        <tr>  
            <td> Simon </td>  
            <td> Travelling-guide </td>  
            <td> 35 </td>  
            <td> Dancing, Gardening </td>  
        </tr>  
        <tr>  
            <td> Cristiano Ronaldo </td>  
            <td> Footballer </td>  
            <td> 29 </td>  
            <td> Singing </td>  
        </tr>  
        </table>  
        <p><b> Click the Download CSV button to download the created data </b></p>  
          
        
        <button onclick="exportTableToCSV('person.csv')"> Export HTML table to CSV File </button>   
    */

const btns = document.querySelectorAll("#myBtnContainer .btn");
btns.forEach((b) => {
    b.addEventListener("click", function() {
        const current = document.querySelector(".active");
        current.classList.remove("active");
        this.classList.add("active");
        filterSelection(b.id);
      });
});