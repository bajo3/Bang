function obtenerHoraActual() {
    fetch('https://worldtimeapi.org/api/ip"')
      .then((response) => response.json())
      .then((data) => {
        const fechaHora = new Date(data.datetime);
        const hora = fechaHora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        document.getElementById('hora').innerHTML = `Hora actual: ${hora}`;
      })
      .catch((error) => {
        console.error('Error al obtener la hora actual:', error);
      });
  }
  
  // Llama a la función obtenerHoraActual para obtener y mostrar la hora actual
  obtenerHoraActual();
  