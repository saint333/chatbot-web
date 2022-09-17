/* baseDatos es la variable que almacena un array de objetos y dentro de los objetos las preguntas y respuestas */
let baseDatos = [];

/*   */

document.addEventListener("DOMContentLoaded", async () => {
  /* primero se hace la consulta a la base de datos y lo guardamos las respuesta y preguntas */
  response = await getData();
  baseDatos = response.items.map((item) => item.item);

  $("#agregar-datos").click(function () {
    $("#seccion-1").removeClass("active");
    $("#seccion-2").addClass("active");
  });

  $("#ir-chat").click(async function () {
    $("#seccion-1").removeClass("active");
    $("#seccion-3").addClass("active");
    response = await getData();
    baseDatos = response.items.map((item) => item.item);
  });

  $(".cerrar-ventana").click(function () {
    $("#seccion-3").removeClass("active");
    $("#seccion-1").addClass("active");
  })

  $(".registro").click(async function () {
    $("#seccion-2").removeClass("active");
    $("#seccion-3").addClass("active");
    response = await getData();
    baseDatos = response.items.map((item) => item.item);
  })

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

  $("#agregar-item").submit(function (e) {
    e.preventDefault();
    let valor_busqueda = $("#mensaje").val();
    let respuesta = searchQuestion(valor_busqueda);
    let content = document.getElementById("agregar-textos");
    if (valor_busqueda !== " " && respuesta !== undefined) {
      let pregunta = document.createElement("div");
      pregunta.innerHTML = `<p>${valor_busqueda}</p>`;
      pregunta.setAttribute("class", "mensaje-humano");
      content.append(pregunta);
      let mensaje = document.createElement("div");
      mensaje.innerHTML = `<p>${respuesta}</p>`;
      mensaje.setAttribute("class", "mensaje-bot");
      content.append(mensaje);
      e.target.reset();
      if (content.scrollHeight > 400) {
        content.style.overflowY = "scroll";
        content.scroll(0, content.scrollHeight);
      }
    } else {
      let pregunta = document.createElement("div");
      pregunta.innerHTML = `<p>${valor_busqueda}</p>`;
      pregunta.setAttribute("class", "mensaje-humano");
      content.append(pregunta);
      let mensaje = document.createElement("div");
      mensaje.innerHTML = `<p>Lo siento no logro entenderte</p>`;
      mensaje.setAttribute("class", "mensaje-bot");
      content.append(mensaje);
      e.target.reset();
    }
  });
});

/* obtener todas las preguntas y respuestas */

async function getData() {
  response = await fetch(
    "https://62a77a8fbedc4ca6d7c9aac4.mockapi.io/api/v1/chatbot/"
  );
  data = await response;
  return data.json();
}

/* agregar nuevos datos a la base de datos */

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
    $(".registro").removeClass("d-none")
    setTimeout(() => {
      $(".mensaje-guardar").addClass("d-none");
    }, 1500);
  }
}

/* busca la pregunta ingresada y devuelve la respuesta o undefined para saber si existe o no */

function searchQuestion(pregunta) {
  respuesta = baseDatos.find((item) => item.pregunta.toLocaleLowerCase().includes(pregunta) === true);
  if (respuesta !== undefined) {
    return respuesta.respuesta;
  } else {
    return undefined;
  }
}
