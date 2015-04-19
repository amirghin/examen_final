function validarCampos_i_ventas(){

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
}else{

	document.getElementById("i_ventas").submit();

}
}

function limpiar_i_ventas(){

	parent.location='i_ventas.php';
}