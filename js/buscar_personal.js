var xmlHttp;
function MostrarPersona(e){

if (e.keyCode==13){

  if (document.getElementById("cod_persona").value != ""){
    MostrarNombrePersona(document.getElementById("cod_persona").value);
  }
document.getElementById("cantidad").focus(); 
}     
}

function MostrarNombrePersona(persona){  
  xmlHttp=GetXmlHttpObject()
  if (xmlHttp==null)
  {
    alert ("Browser does not support HTTP Request")
    return;
  } 
 var url="buscar_personal.php";
 url=url+"?cod_empleado="+ persona;
 xmlHttp.onreadystatechange=stateChanged_persona;
 xmlHttp.open("GET",url,true);
 xmlHttp.send();
 return false;  
 }
 
function stateChanged_persona() { 
if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete")
{ 
 	document.getElementById('nom_persona').value = xmlHttp.responseText;
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