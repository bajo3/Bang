  // Funciones JavaScript para el carrito de compras
  const productosDisponibles = [
    { nombre: "Chaqueta de Chef Manga Larga", precio: 7000 },
    { nombre: "Chaqueta de Chef Manga Larga Mujer", precio: 7000 },
    { nombre: "Chaqueta de Chef Manga Corta Mujer", precio: 6500 },
    { nombre: "Chaqueta de Chef Manga Cortra Hombre", precio: 6500 },
    { nombre: "Delantal Pechera Clasico con Regulador", precio: 4500 },
    { nombre: "Delantal Jean Negro", precio: 4500 },
    { nombre: "Delantal de Cintura Bengalina", precio: 4800 },
    { nombre: "Delantal de cuero con reguladores", precio: 9500 },
    { nombre: "Micro Soplete a Gas", precio: 10500 },
    { nombre: "Ahumador Lacor Instant", precio: 15500 },
    { nombre: "Balanza Digital", precio: 3500 },
    { nombre: "Funda de cuchillos 17 piezas", precio: 12500 }
  ];

  let carrito = [];
  let totalVenta = 0;

  function agregarAlCarrito() {
    let producto = document.getElementById("producto").value;
    if (!producto) {
      alert("Debe seleccionar un producto");
      return;
    }

    let productoEncontrado = productosDisponibles.find((p) => p.nombre === producto);
    if (!productoEncontrado) {
      alert("Producto no disponible");
      return;
    }
    let cantidad = parseInt(document.getElementById("cantidad").value);
    if (isNaN(cantidad)) {
      alert("Cantidad no válida");
      return;
    }

    carrito.push({ producto: productoEncontrado, cantidad });
    totalVenta += productoEncontrado.precio * cantidad;

    document.getElementById("total").innerHTML = "$" + totalVenta;

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalVenta", JSON.stringify(totalVenta));

    document.getElementById("producto").value = "";
    document.getElementById("cantidad").value = 1;

    mostrarCarrito();
  }

  function mostrarCarrito() {
    let carritoGuardado = localStorage.getItem("carrito");
    let totalVentaGuardado = localStorage.getItem("totalVenta");

    if (carritoGuardado === null || totalVentaGuardado === null) {
      return;
    }

    carrito = JSON.parse(carritoGuardado);
    totalVenta = JSON.parse(totalVentaGuardado);

    if (!carrito || !totalVenta) {
      return;
    }

    document.getElementById("total").innerHTML = "$" + totalVenta;

    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("totalVenta", JSON.stringify(totalVenta));

    let tabla = "<table><tr><th>Producto</th><th>Cantidad</th><th>Precio</th></tr>";
    carrito.forEach((item) => {
      tabla += `<tr><td>${item.producto.nombre}</td><td>${item.cantidad}</td><td>$${item.producto.precio}</td></tr>`;
    });
    tabla += "</table>";
    document.getElementById("carrito").innerHTML = tabla;
  }

  function borrarLocalStorage() {
    localStorage.clear();
    location.reload();
  }

  function cargarDatosExternos() {
    // Hacer una solicitud AJAX utilizando la función fetch
    fetch("../js/datos.json")
      .then((response) => response.json()) // Convertir la respuesta a JSON
      .then((data) => {
        // Manipular los datos obtenidos
        console.log(data);

        // Aquí puedes realizar las operaciones necesarias con los datos obtenidos
        // Por ejemplo, puedes agregar los productos al arreglo productosDisponibles
        productosDisponibles.push(...data);

        // También puedes utilizar los datos para generar la interfaz dinámicamente
        generarInterfaz();

      })
      .catch((error) => {
        // Manejar errores en caso de que la solicitud falle
        console.error("Error al cargar los datos externos:", error);
      });
  }

  function generarInterfaz() {
    // Genera la interfaz dinámica utilizando los datos disponibles
    let selectProducto = document.getElementById("producto");

    productosDisponibles.forEach((producto) => {
      let option = document.createElement("option");
      option.value = producto.nombre;
      option.text = producto.nombre;
      selectProducto.appendChild(option);
    });
  }

  // Evento de carga de la página
  window.onload = function() {
    setTimeout(() => {
      document.getElementsByClassName("loading")[0].style.display = "none";
      document.getElementsByClassName("container")[0].style.display = "block";
    }, 3000);

    mostrarCarrito();

    document.getElementById("botonCargarDatos").addEventListener("click", cargarDatosExternos);
  };