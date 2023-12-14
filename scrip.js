
const loadAllTable =()=>{
  fetch("https://starwars-developuptc.vercel.app/")
  .then((info) => info.json())
  .then((datos) => {

    datos.data.forEach((element) => {
      const select = document.createElement("option");
      select.innerHTML = `
        <option value=${element._id}>${element.homeworld}</option>
        `;
      document.getElementById("select1").appendChild(select);
      const bt = document.createElement("button")
      const row = document.createElement("tr");

      bt.type = "button";
      bt.classList.add("col", "btn", "btn-primary");
      bt.textContent = "mostrar todas";
      // Agrega un ID al botón
      const buttonId = `btn_${element._id}`;
      bt.id = buttonId;

      
      row.innerHTML = `
        <th scope="row style="color: red;">${element._id}</th>
        <td>${element.name}</td>
        <td>${element.height}</td>
        <td>${element.mass}</td>
        `;
        //agregar boton a la fila
        const tdWithButton = document.createElement("td");
        tdWithButton.appendChild(bt);
        row.appendChild(tdWithButton);

        if (element.mass == undefined || element.mass == null) {
          row.classList.add("table-danger");
        }
      document.getElementById("tbody").appendChild(row);
    });
  })
  .catch((error) => console.log(error));
}


document.getElementById("select1").addEventListener("change", () => {
  const valor = document.getElementById("select1").value;
  fetch("https://starwars-developuptc.vercel.app/")
    .then((info) => info.json())
    .then((datos) => {
      //actualizarTabla(datos.data, valor);
      callSelectTwo(datos.data,valor)
    })
    .catch((err) => console.log(err));
});

const actualizarTabla = (datos) => {
  const map = [datos]
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  map.forEach(element=>{
    const row = document.createElement("tr");
      row.innerHTML = `
        <th scope="row style="color: red;">${element._id}</th>
        <td>${element.name}</td>
        <td>${element.height}</td>
        <td>${element.mass}</td>
        `;
        document.getElementById("tbody").appendChild(row);
  })
};


const callSelectTwo = (data,filtro) => {
    const select2 = document.getElementById('select2')
    select2.innerHTML = '<option selected>Seleccione el origen</option>'
    //<option selected>Seleccione el origen</option>
  


    data.filter((element)=>element.homeworld==filtro).forEach(element=>{
        const option = document.createElement('option')
        option.value = element._id;
        option.textContent = element.homeworld;
  
        // Agrega la opción al select con id "select1"
        document.getElementById("select1").appendChild(option);



        option.innerHTML = `
        <option value=${element._id}>${element.name}</option>
        `
        select2.appendChild(option)

    })
}

document.getElementById("select2").addEventListener("change",()=>{
  const valor = document.getElementById("select2").value
  fetch(`https://starwars-developuptc.vercel.app/${valor}`)
  .then((response)=>response.json())
  .then(r=>{
    actualizarTabla(r.data)
  })
  .catch((err)=>console.error(err))

})

document.getElementById("button").addEventListener('click',()=>{
  loadAllTable();
})
loadAllTable();