var cod_articulo;
var total_detalle = 0;

function MostrarTotales(e){

  if (e.keyCode==13){

    if(document.getElementById("cantidad").value != "" && parseFloat(document.getElementById("cantidad").value) > 0 && document.getElementById("cod_articulo").value != "" && document.getElementById("num_factura").value != ""){
      BuscarArticulo(document.getElementById("cod_articulo").value);
    }else if(document.getElementById("cod_articulo").value == ""){
      alert("Por favor seleccione un codigo de articulo");
      document.getElementById("cod_articulo").focus();
    }else if(document.getElementById("num_factura").value == ""){
      alert("Por favor seleccione un numero de factura");
      document.getElementById("num_factura").focus();
    }else if(parseFloat(document.getElementById("cantidad").value) <= 0){
      alert("El campo cantidad tiene que ser mayor a 0");
      document.getElementById("cantidad").focus();

    }
  }     
}

function BuscarArticulo(articulo){  
  xmlHttp_buscar_articulo=GetXmlHttpObject()
  if (xmlHttp_buscar_articulo==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
  var url="busquedas/articulos.php?cod_articulo="+ articulo;
  xmlHttp_buscar_articulo.onreadystatechange=stateChanged_buscar_articulo;
  xmlHttp_buscar_articulo.open("GET",url,true);
  xmlHttp_buscar_articulo.send();
  return false;  
}

function TotalDetalle(descuento, precio, cantidad){

  var descuento = (descuento * precio / 100);
  var total_detalle = (precio - descuento) * cantidad;
  return total_detalle;

}

function stateChanged_buscar_articulo() { 
  if (xmlHttp_buscar_articulo.readyState==4 || xmlHttp_buscar_articulo.readyState=="complete"){ 
    var articulo_json = JSON.parse(xmlHttp_buscar_articulo.responseText);
    var cantidad = parseFloat(document.getElementById("cantidad").value);
    var disponible = parseFloat(articulo_json.disponible);
    var precio = parseFloat(articulo_json.precio);
    var descuento = parseFloat(articulo_json.descuento);

    if (articulo_json.descripcion && disponible >= cantidad){
      
      total_detalle = TotalDetalle(descuento, precio, cantidad);
      document.getElementById("total_detalle").value = total_detalle;
      document.getElementById("descuento").value = articulo_json.descuento; 
      TotalAcumulado(document.getElementById("num_factura").value);
    }else if(!articulo_json.descripcion){
      alert("El codigo del articulo no existe");
    }else if(cantidad > disponible){
      alert("No hay suficientes articulos en inventario, solo quedan " + disponible + " disponibles");
    }
  } 
} 

function TotalAcumulado(factura){  
  xmlHttp_total_acumulado=GetXmlHttpObject()
  if (xmlHttp_total_acumulado==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
  var url="busquedas/total_acumulado.php?num_factura="+ factura;
  xmlHttp_total_acumulado.onreadystatechange=stateChanged_total_acumulado;
  xmlHttp_total_acumulado.open("GET",url,true);
  xmlHttp_total_acumulado.send();
  return false;  
}

function stateChanged_total_acumulado() { 
  if (xmlHttp_total_acumulado.readyState==4 || xmlHttp_total_acumulado.readyState=="complete"){ 
    document.getElementById('total_acumulado').value = parseFloat(xmlHttp_total_acumulado.responseText) + total_detalle;
  } 
}


function MostrarArticulo(e){
  if (e.keyCode==13){
    if (document.getElementById("cod_articulo").value != ""){
      cod_articulo = document.getElementById("cod_articulo").value;
      MostrarNombreArticulo(cod_articulo);
    }
    document.getElementById("cod_persona").focus(); 
  }     
}

function MostrarNombreArticulo(articulo){  
  xmlHttp_mostrar_nombre_articulo=GetXmlHttpObject()
  if (xmlHttp_mostrar_nombre_articulo==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
  var url="busquedas/articulos.php?cod_articulo="+ articulo;
  xmlHttp_mostrar_nombre_articulo.onreadystatechange=stateChanged_articulo;
  xmlHttp_mostrar_nombre_articulo.open("GET",url,true);
  xmlHttp_mostrar_nombre_articulo.send();
  return false;  
}

function stateChanged_articulo() { 
  if (xmlHttp_mostrar_nombre_articulo.readyState==4 || xmlHttp_mostrar_nombre_articulo.readyState=="complete"){ 
    var articulo_json = JSON.parse(xmlHttp_mostrar_nombre_articulo.responseText);
    if(!articulo_json.descripcion){
      document.getElementById('nom_articulo').value = "El codigo " + cod_articulo + " no existe";
    }else{
      document.getElementById('nom_articulo').value = articulo_json.descripcion;
      document.getElementById('cod_categoria').value = articulo_json.codigo_categoria;
      document.getElementById('nom_categoria').value = articulo_json.categoria;
      document.getElementById("disponible").value = articulo_json.disponible;
      document.getElementById("h_precio").value = articulo_json.precio;

    }
  } 
} 

function MostrarPersona(e){

  if(e.keyCode==13){

    if (document.getElementById("cod_persona").value != ""){
      MostrarNombrePersona(document.getElementById("cod_persona").value);
  }
  document.getElementById("cantidad").focus(); 
}     
}

function MostrarNombrePersona(persona){  
  xmlHttp_mostrar_nombre_persona=GetXmlHttpObject()
  if (xmlHttp_mostrar_nombre_persona==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="busquedas/personal.php?cod_empleado="+ persona;
 xmlHttp_mostrar_nombre_persona.onreadystatechange=stateChanged_persona;
 xmlHttp_mostrar_nombre_persona.open("GET",url,true);
 xmlHttp_mostrar_nombre_persona.send();
 return false;  
 }
 
function stateChanged_persona() { 
  if(xmlHttp_mostrar_nombre_persona.readyState==4 || xmlHttp_mostrar_nombre_persona.readyState=="complete"){ 
  document.getElementById('nom_persona').value = xmlHttp_mostrar_nombre_persona.responseText;
  } 
}

function TotalAcumuladoModificar(e){
  
  if (e.keyCode==13){


    var cantidad = document.getElementById("h_cantidad").value;
    var nueva_cantidad = document.getElementById("cantidad").value;
    var total_detalle = parseFloat(document.getElementById("total_detalle").value);
    var descuento = parseFloat(document.getElementById("descuento").value);
    var total_acumulado = parseFloat(document.getElementById("total_acumulado").value);
    var precio = parseFloat(document.getElementById("h_precio").value);
    
    if(nueva_cantidad <= 0){
      alert("La cantidad tiene que ser mayor que 0");
    }else if(validarDisponibilidad()){
      nuevo_total_detalle = TotalDetalle(descuento, precio, nueva_cantidad);
      document.getElementById("total_detalle").value = nuevo_total_detalle;
      document.getElementById("total_acumulado").value = total_acumulado - total_detalle + nuevo_total_detalle;
    }

  }
}



function validarDisponibilidad(){

  var disponible = parseFloat(document.getElementById("disponible").value);
  var cantidad = parseFloat(document.getElementById("cantidad").value);
  if(disponible >= cantidad){

    return true;

  }else{
    alert("No hay suficientes articulos en inventario, solo quedan " + disponible + " disponibles");
  }

}

function BuscarFactura(){

  var num_factura = document.getElementById("num_factura").value 
  var cod_articulo = document.getElementById("cod_articulo").value
  if( num_factura != "" &&  cod_articulo != ""){

    MostrarFactura(num_factura, cod_articulo);

  }else{

    alert("Por favor digite el número de la factura y el código de la categoria");
  }
}


function MostrarFactura(num_factura, cod_articulo){  
  xmlHttp_mostrar_factura=GetXmlHttpObject()
  if (xmlHttp_mostrar_factura==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="busquedas/facturas.php?cod_articulo="+ cod_articulo + "&num_factura="+num_factura;
 xmlHttp_mostrar_factura.onreadystatechange=stateChanged_mostrarFactura;
 xmlHttp_mostrar_factura.open("GET",url,true);
 xmlHttp_mostrar_factura.send();
 return false;  
 }
 
function stateChanged_mostrarFactura() { 
  if(xmlHttp_mostrar_factura.readyState==4 || xmlHttp_mostrar_factura.readyState=="complete"){ 
  var factura_json = JSON.parse(xmlHttp_mostrar_factura.responseText);
  console.log(factura_json);

  if(factura_json.error){

    alert(factura_json.error);
  }else{

    document.getElementById("num_factura").readOnly = true;
    document.getElementById("cod_articulo").readOnly = true;
    MostrarNombreArticulo(document.getElementById("cod_articulo").value);
    document.getElementById("cod_persona").value = factura_json.codigo_persona;
    MostrarNombrePersona(factura_json.codigo_persona);
    document.getElementById("cantidad").value = factura_json.cantidad;
    document.getElementById("h_cantidad").value = factura_json.cantidad;
    document.getElementById("total_detalle").value = factura_json.total_detalle;
    document.getElementById("descuento").value = factura_json.descuento;
    TotalAcumulado(document.getElementById("num_factura").value);

    
  }

  } 
}
function BuscarFacturaFecha(){

  var factura = document.getElementById("num_factura").value;
  var fecha  = document.getElementById("fecha").value;

  if(factura != "" && fecha != ""){

    if(document.getElementById("consulta_fecha"))tableDelete();
    FacturaFecha(factura, fecha);


  }else{

    alert("Todos los campos son obligatorios");
  }

}

function FacturaFecha(factura, fecha){  
  xmlHttp_factura_fecha=GetXmlHttpObject()
  if (xmlHttp_factura_fecha==null){
    alert ("Browser does not support HTTP Request")
    return;
  } 
  var url="busquedas/consulta_fecha.php?num_factura="+ factura + "&fecha=" + fecha;
  xmlHttp_factura_fecha.onreadystatechange=stateChanged_buscar_factura_fecha;
  xmlHttp_factura_fecha.open("GET",url,true);
  xmlHttp_factura_fecha.send();
  return false;  
}

function stateChanged_buscar_factura_fecha() { 
  if (xmlHttp_factura_fecha.readyState==4 || xmlHttp_factura_fecha.readyState=="complete"){ 
    var factura_json = JSON.parse(xmlHttp_factura_fecha.responseText);

    if (!factura_json.facturas.error){
    tableCreate(factura_json.facturas);
    }else{

      alert(factura_json.facturas.error);
    }
  } 
}


function tableDelete(){
  var table = document.getElementById("consulta_fecha");
   table.parentNode.removeChild(table);
}

function tableCreate(facturas){
    
    var body = document.getElementById("tabla_busqueda"),
        tbl  = document.createElement('table');
        tbl.id = "consulta_fecha";

    var t_headers = tbl.insertRow(0);
    var headers = ["Numero Factura", "Fecha Factura", "Codigo Personal", "Nombre Vendedor", "Codigo Articulo", "Descripción", "Cantidad", "Precio", 
                  "Descuento", "Total Detalle"];

    for(var i = 0; i < headers.length; ++i){
        t_headers.insertCell(i).innerHTML = headers[i];
    };
    
    for(var j = 0; j < facturas.length; j++){

      p = j + 1;
      var t_body = tbl.insertRow(p);
      t_body.insertCell(0).innerHTML = facturas[j].numero_factura;
      t_body.insertCell(1).innerHTML = facturas[j].fecha_factura;
      t_body.insertCell(2).innerHTML = facturas[j].codigo_persona;
      t_body.insertCell(3).innerHTML = facturas[j].nombre;
      t_body.insertCell(4).innerHTML = facturas[j].codigo_articulo;
      t_body.insertCell(5).innerHTML = facturas[j].descripcion;
      t_body.insertCell(6).innerHTML = facturas[j].cantidad;
      t_body.insertCell(7).innerHTML = facturas[j].precio;
      t_body.insertCell(8).innerHTML = facturas[j].descuento;
      t_body.insertCell(9).innerHTML = facturas[j].total_detalle;
    };

    body.appendChild(tbl);
}

function GetXmlHttpObject(){ 
 var objXMLHttp=null;
 if (window.XMLHttpRequest){
  objXMLHttp=new XMLHttpRequest();
  }
 else if (window.ActiveXObject){
  objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 return objXMLHttp;
}

function validarCampos(form_name){

  if(document.getElementById("num_factura").value == ""){
    alert("El campo Numero Factura es requerido");
    document.getElementById("num_factura").focus();

  }else if(document.getElementById("cod_articulo").value == ""){
    alert("El campo Codigo Articulos es requerido");
    document.getElementById("cod_articulo").focus();

  }else if(document.getElementById("cod_categoria").value == ""){
    alert("El campo Codigo Categoria es requerido");
    document.getElementById("cod_categoria").focus();

  }else if(document.getElementById("cod_persona").value == ""){
    alert("El campo Codigo Persona es requerido");
    document.getElementById("cod_persona").focus();

  }else if(document.getElementById("cantidad").value == ""){
    alert("El campo Cantidad es requerido");
    document.getElementById("cantidad").focus();

  }else if(document.getElementById("total_detalle").value == ""){
    alert("El campo total detalle es requerido, por favor calcule el monto utilizando el campo cantidad");
    document.getElementById("cantidad").focus();
  }else if(parseFloat(document.getElementById("cantidad").value) <= 0){
    alert("El campo cantidad tiene que ser mayor a 0");
    document.getElementById("cantidad").focus();

  }else if(!validarDisponibilidad()){

    console.log("No hay disponible");

  }else{

    document.getElementById(form_name).submit();

  }
}

function limpiar_pantalla(pantalla){
  parent.location=pantalla+'.php';
}