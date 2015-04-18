var xmlHttp;
function MostrarCategoria(e){

if (e.keyCode==13){

  if (document.getElementById("cod_categoria").value != ""){
    MostrarNombreCategoria(document.getElementById("cod_categoria").value);
  }
document.getElementById("cod_persona").focus(); 
}     
}

function MostrarNombreCategoria(categoria)
{  
  xmlHttp=GetXmlHttpObject()
  if (xmlHttp==null)
  {
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="buscar_categoria.php";
 url=url+"?cod_categoria="+ categoria;
 xmlHttp.onreadystatechange=stateChanged_categoria;
 xmlHttp.open("GET",url,true);
 xmlHttp.send();
 return false;  
 }
 
function stateChanged_categoria() 
{ 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{ 
 	document.getElementById('nom_categoria').value = xmlHttp.responseText;
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