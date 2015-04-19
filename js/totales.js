var total_detalle;

function MostrarTotales(e){

if (e.keyCode==13){

  if(document.getElementById("cantidad").value != "" && document.getElementById("cod_articulo").value != "" && document.getElementById("num_factura").value != ""){
    
    BuscarArticulo(document.getElementById("cod_articulo").value);

    
  }else if(document.getElementById("cod_articulo").value == ""){
    alert("Por favor seleccione un codigo de articulo");
  }else if(document.getElementById("num_factura").value == ""){
    alert("Por favor seleccione un numero de factura");
  }

}     
}

function BuscarArticulo(articulo){  
  xmlHttp_buscar_articulo=GetXmlHttpObject()
  if (xmlHttp_buscar_articulo==null)
  {
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="buscar_articulo.php";
 url=url+"?cod_articulo="+ articulo;
 xmlHttp_buscar_articulo.onreadystatechange=stateChanged_buscar_articulo;
 xmlHttp_buscar_articulo.open("GET",url,true);
 xmlHttp_buscar_articulo.send();
 return false;  
 }
 
function stateChanged_buscar_articulo() { 
if (xmlHttp_buscar_articulo.readyState==4 || xmlHttp_buscar_articulo.readyState=="complete"){ 
  var articulo_json = JSON.parse(xmlHttp_buscar_articulo.responseText);
  var cantidad = parseFloat(document.getElementById("cantidad").value);
  var disponible = parseFloat(articulo_json.disponible);
  var precio = parseFloat(articulo_json.precio);

  if (articulo_json.descripcion && disponible >= cantidad){
    var descuento = (parseFloat(articulo_json.descuento) * precio / 100);
    total_detalle = (precio - descuento) * cantidad;
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
  if (xmlHttp_total_acumulado==null)
  {
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="total_acumulado.php";
 url=url+"?num_factura="+ factura;
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

function GetXmlHttpObject(){ 
 var objXMLHttp=null;
 if (window.XMLHttpRequest)
  {
  objXMLHttp=new XMLHttpRequest();
  }
 else if (window.ActiveXObject)
  {
  objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
 return objXMLHttp;
}

