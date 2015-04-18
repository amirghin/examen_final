var xmlHttp;
function MostrarArticulo(e){

if (e.keyCode==13){

  if (document.getElementById("cod_articulo").value != ""){
    MostrarNombreArticulo(document.getElementById("cod_articulo").value);
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
 	document.getElementById('nom_articulo').value = xmlHttp.responseText;
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