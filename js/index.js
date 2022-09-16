let baseDatos = [];

document.addEventListener("DOMContentLoaded", async () => {
  response = await getData();
  baseDatos = response.items.map((item) => item.item);
  let busqueda = searchQuestion("hola3");

  console.log(baseDatos, response);

  $("#agregar-datos").click(function () {
    $("#seccion-1").removeClass("active");
    $("#seccion-2").addClass("active");
  });

  $("#ir-chat").click(function () {
    $("#seccion-1").removeClass("active");
    $("#seccion-3").addClass("active");
  });

  $("#form-data").submit(function (e) {
    e.preventDefault();
    let prueba = {
      pregunta: $("#pregunta").val(),
      respuesta: $("#respuesta").val(),
    };
    addData(prueba);
    e.target.reset();
    $(".mensaje-guardar").removeClass("d-none");
  });
});

async function getData() {
  response = await fetch(
    "https://62a77a8fbedc4ca6d7c9aac4.mockapi.io/api/v1/chatbot/"
  );
  data = await response;
  return data.json();
}

async function addData(datos) {
  response = await fetch(
    "https://62a77a8fbedc4ca6d7c9aac4.mockapi.io/api/v1/chatbot",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: datos }),
    }
  );
  if (response.ok) {
    $(".mensaje-guardar").removeClass("d-none");
    setTimeout(() => {
        $(".mensaje-guardar").addClass("d-none");
    }, 1500);
  }
}

function searchQuestion(pregunta) {
  respuesta = baseDatos.find((item) => item.pregunta === pregunta);
  if (respuesta !== undefined) {
    return respuesta.respuesta;
  }
}
