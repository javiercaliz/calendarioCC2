function ingresarFecha() {
  let inicio = new Date();
  //se toma la fecha del front y se corrige 1 día
  inicio = document.getElementById("fechaIngreso").valueAsDate;
  inicio.setDate(inicio.getDate() + 1);
  if (document.getElementById("eventos") != null) {
    let aux = document.getElementById("eventos");
    aux.parentElement.removeChild(aux);
  }
  crearTabla();
  calcular(inicio);
}

function vacaciones(fecha) {
  //lista donde se van a guardar los días de vacaciones
  var vacaciones = [];
  var validacion = true;

  //vacaciones de 2022
  let inicioVacaciones2022 = new Date("2022-12-24");
  inicioVacaciones2022.setDate(inicioVacaciones2022.getDate() + 1);
  let finVacaciones2022 = new Date("2023-01-16");
  finVacaciones2022.setDate(finVacaciones2022.getDate() + 1);

  //creamos unas fechas auxiliares para poder cambiarlas sin cambiar las originales
  let aux2 = new Date(inicioVacaciones2022);

  //agregamos al conjunto las vacaciones 2022
  while (aux2.getDate() != finVacaciones2022.getDate()) {
    vacaciones.push(new Date(aux2));
    aux2.setDate(aux2.getDate() + 1);
  }

  //analizamos si la fecha está en el conjunto
  for (const x of vacaciones) {
    if (x.getTime() == fecha.getTime()) {
      validacion = false;
    }
  }

  //devolvemos el resultado
  return validacion;
}

function feriados(fecha) {
  //conjunto de feriados
  var feriados = [];
  var validacion = true;
  //carga manual de feriados
  //*****FERIADOS 2021*****
  feriados.push(new Date("2021-10-08")); //Puente
  feriados.push(new Date("2021-10-11")); //Día del respeto a la diversidad cultural
  feriados.push(new Date("2021-11-22")); //Puente
  feriados.push(new Date("2021-12-08")); //Inmaculada concepción de María
  //*****FERIADOS 2022*****
  feriados.push(new Date("2022-02-28")); //Carnaval
  feriados.push(new Date("2022-03-01")); //Carnaval
  feriados.push(new Date("2022-03-24")); //Día Nacional de la Memoria por la Verdad y la Justicia
  feriados.push(new Date("2022-04-14")); //Jueves Santo
  feriados.push(new Date("2022-04-15")); //Viernes Santo
  feriados.push(new Date("2022-05-18")); //Censo Nacional
  feriados.push(new Date("2022-05-25")); //Día de la Revolución de Mayo
  feriados.push(new Date("2022-06-20")); //Día de la Bandera
  feriados.push(new Date("2022-08-15")); //Paso a la Inmortalidad del General José de San Martín
  feriados.push(new Date("2022-10-10")); //Día del Respeto a la Diversidad Cultural
  feriados.push(new Date("2022-11-21")); //Puente
  feriados.push(new Date("2022-12-08")); //Inmaculada concepción de María
  //*****FERIADOS 2023*****
  feriados.push(new Date("2023-02-20")); //Carnaval
  feriados.push(new Date("2023-02-21")); //Carnaval
  feriados.push(new Date("2023-03-24")); //Día Nacional de la Memoria por la Verdad y la Justicia
  feriados.push(new Date("2023-04-06")); //Jueves Santo
  feriados.push(new Date("2023-04-07")); //Viernes Santo
  feriados.push(new Date("2023-05-01")); //Día del Trabajador
  feriados.push(new Date("2023-05-25")); //Día de la Revolución de Mayo
  feriados.push(new Date("2023-06-20")); //Paso a la Inmortalidad del General Manuel Belgrano
  feriados.push(new Date("2023-08-21")); //Paso a la Inmortalidad del General José de San Martín
  feriados.push(new Date("2023-10-16")); //Día del Respeto a la Diversidad Cultural
  feriados.push(new Date("2023-11-20")); //Día de la Soberanía Nacional
  feriados.push(new Date("2023-12-08")); //Inmaculada concepción de María

  feriados.forEach((x) => {
    x.setDate(x.getDate() + 1);
  });

  //analizamos si la fecha está en el conjunto
  for (const x of feriados) {
    if (x.getTime() == fecha.getTime()) {
      validacion = false;
    }
  }

  //devolvemos el resultado
  return validacion;
}

function diaDeCursado(fecha) {
  var aux = new Date();
  aux = fecha;
  if (aux.getDay() == 0 || aux.getDay() == 6 || aux.getDay() == 5) {
    return false;
  } else {
    return true;
  }
}

function calcular(inicio) {
  var finCurso = new Date();
  finCurso = inicio;

  var clases = 1;

  while (clases <= 176) {
    if (diaDeCursado(finCurso)) {
      if (feriados(finCurso)) {
        if (vacaciones(finCurso)) {
          informe(clases, finCurso);
          clases++;
        }
      }
    }
    finCurso.setDate(finCurso.getDate() + 1);
  }
}

function crearFila(tabla, clases, fecha, contenido) {
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1;
  var anio = fecha.getFullYear();
  var row = tabla.insertRow(-1);
  var row2 = tabla.insertRow(-1);
  var celdaa = row2.insertCell(0);
  var celdab = row2.insertCell(1);
  var celdac = row2.insertCell(2);
  var celda1 = row.insertCell(0);
  var celda2 = row.insertCell(1);
  var celda3 = row.insertCell(2);
  celda1.innerHTML = clases;
  celda2.innerHTML = dia + "/" + mes + "/" + anio;
  celda3.innerHTML = contenido;
}

function crearTabla() {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let tr = document.createElement("tr");
  let th1 = document.createElement("th");
  let th2 = document.createElement("th");
  let th3 = document.createElement("th");

  document.getElementById("informe").appendChild(table);
  table.append(thead);
  table.append(tbody);
  thead.append(tr);
  tr.append(th1);
  tr.append(th2);
  tr.append(th3);
  th1.appendChild(document.createTextNode("Día"));
  th2.appendChild(document.createTextNode("Fecha"));
  th3.appendChild(document.createTextNode("Contenido"));
  table.className = "table table-dark table-striped table-hover";
  table.id = "eventos";
}

function informe(clases, fecha) {
  var tabla = document.getElementById("eventos");
  switch (clases) {
    case 1:
      crearFila(tabla, clases, fecha, "Primer Día");
      break;
    case 3:
      crearFila(tabla, clases, fecha, "Repaso Guía 1");
      break;
    case 11:
      crearFila(tabla, clases, fecha, "Repaso Guía 2");
      break;
    case 17:
      crearFila(tabla, clases, fecha, "Repaso Guía 3");
      break;
    case 26:
      crearFila(tabla, clases, fecha, "Repaso PseInt");
      break;
    case 27:
      crearFila(tabla, clases, fecha, "Integrador PseInt");
      break;
    case 28:
      crearFila(tabla, clases, fecha, "Git Individual");
      break;
    case 38:
      crearFila(tabla, clases, fecha, "Repaso Java Intro");
      break;
    case 47:
      crearFila(tabla, clases, fecha, "Repaso POO 1º Parte");
      break;
    case 58:
      crearFila(tabla, clases, fecha, "Repaso POO 2ºParte");
      break;
    case 67:
      crearFila(tabla, clases, fecha, "Repaso Colecciones");
      break;
    case 76:
      crearFila(tabla, clases, fecha, "Repaso Relaciones");
      break;
    case 85:
      crearFila(tabla, clases, fecha, "Repaso Herencia");
      break;
    case 88:
      crearFila(tabla, clases, fecha, "Repaso Excepciones");
      break;
    case 97:
      crearFila(tabla, clases, fecha, "Repaso MySQL");
      break;
    case 98:
      crearFila(tabla, clases, fecha, "Integrador Java + MySQL");
      break;
    case 106:
      crearFila(tabla, clases, fecha, "Repaso JDBC");
      break;
    case 114:
      crearFila(tabla, clases, fecha, "Repaso JPA");
      break;
    case 115:
      crearFila(tabla, clases, fecha, "Git grupal");
      break;
    case 124:
      crearFila(tabla, clases, fecha, "Repaso HTML");
      break;
    case 132:
      crearFila(tabla, clases, fecha, "Repaso JavaScript");
      break;
    case 139:
      crearFila(tabla, clases, fecha, "Repaso 1 de Spring");
      break;
    case 146:
      crearFila(tabla, clases, fecha, "Repaso 2 de Spring");
      break;
    case 153:
      crearFila(tabla, clases, fecha, "Repaso 3 de Spring");
      break;
    case 171:
      crearFila(tabla, clases, fecha, "Repaso React");
      break;
    case 172:
      crearFila(tabla, clases, fecha, "Inicio Repaso de Curso");
      break;
    case 176:
      crearFila(tabla, clases, fecha, "Integrador Final");
      break;
    default:
      break;
  }
}
