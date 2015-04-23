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

  }else{

    document.getElementById(form_name).submit();

  }
}

function limpiar_pantalla(pantalla){
  parent.location=pantalla+'.php';
}