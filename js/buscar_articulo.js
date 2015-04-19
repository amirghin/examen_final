var xmlHttp;
var cod_articulo;
function MostrarArticulo(e){

if (e.keyCode==13){

  if (document.getElementById("cod_articulo").value != ""){
    cod_articulo = document.getElementById("cod_articulo").value;
    MostrarNombreArticulo(cod_articulo);
  }
document.getElementById("cod_categoria").focus(); 
}     
}

function MostrarNombreArticulo(articulo)
{  
  xmlHttp=GetXmlHttpObject()
  if (xmlHttp==null)
  {
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="buscar_articulo.php";
 url=url+"?cod_articulo="+ articulo;
 xmlHttp.onreadystatechange=stateChanged_articulo;
 xmlHttp.open("GET",url,true);
 xmlHttp.send();
 return false;  
 }
 
function stateChanged_articulo() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{ 
  var articulo_json = JSON.parse(xmlHttp.responseText);
  if(!articulo_json.descripcion){

    document.getElementById('nom_articulo').value = "El codigo " + cod_articulo + " no existe";
  }else{
 	document.getElementById('nom_articulo').value = articulo_json.descripcion;
  }
} 
} 
function GetXmlHttpObject()
 { 
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