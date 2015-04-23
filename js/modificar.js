function TotalAcumuladoModificar(e){
  
  if (e.keyCode==13){


    var cantidad = document.getElementById("h_cantidad").value;
    var nueva_cantidad = document.getElementById("cantidad").value;
    var total_detalle = parseFloat(document.getElementById("total_detalle").value);
    var descuento = parseFloat(document.getElementById("descuento").value);
    var total_acumulado = parseFloat(document.getElementById("total_acumulado").value);
    var precio = total_detalle/cantidad;
    
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