function BuscarFacturaFecha(){

  var factura = document.getElementById("num_factura").value;
  var fecha  = document.getElementById("fecha").value;

  if(factura != "" && fecha != ""){

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
    if(document.getElementById("consulta_fecha"))tableDelete();
    
    var body = document.body,
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