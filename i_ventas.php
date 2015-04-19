<?php

require "conexion.php";
require "ventas.php";

$venta = new ventas;

if(isset($_POST['num_factura'], $_POST['cod_articulo'], $_POST['cod_persona'], $_POST['cantidad'], $_POST['total_detalle'], $_POST['descuento'])){

$venta->insertar_venta($_POST['num_factura'], $_POST['cod_articulo'], $_POST['cod_persona'], $_POST['cantidad'], $_POST['total_detalle'], $_POST['descuento'], $conexion);

}

echo $venta->mensaje;

?>

<!DOCTYPE html>
<html>
<head>
	<title>Insertar Ventas</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="js/buscar_articulo.js" type="text/javascript"></script>
	<script src="js/buscar_categoria.js" type="text/javascript"></script>
	<script src="js/buscar_personal.js" type="text/javascript"></script>
	<script src="js/totales.js" type="text/javascript"></script>
	<script src="js/validar_campos.js" type="text/javascript"></script>

</head>
<body>
<form method="post" action="" id="i_ventas">
	<fieldset class="insertar_ventas">
		<div class="filas">
			<label for="num_factura">N&uacute;mero Factura: </label>
			<input type="number" id="num_factura" name="num_factura">
		</div>
		<div class="filas">
			<label for="cod_articulo">C&oacute;digo del Art&iacute;culo: </label>
			<input type="number" id="cod_articulo" name="cod_articulo" onkeypress="MostrarArticulo(event);">
			<input type="text" id="nom_articulo" name="nom_articulo" readonly="true">
		</div>
		<div class="filas">
			<label for="cod_categoria">C&oacute;digo Categoria</label>
			<input type="number" id="cod_categoria" name="cod_categoria" onkeypress="MostrarCategoria(event);">
			<input type="text" id="nom_categoria" name="nom_categoria" readonly="true">
		</div>
		<div class="filas">
			<label for="cod_persona">C&oacute;digo de la persona:</label>
			<input type="number" id="cod_persona" name="cod_persona" onkeypress="MostrarPersona(event);">
			<input type="text" id="nom_persona" name="nom_persona" readonly="true">
		</div>
		<div class="filas">
			<label for="cantidad">Cantidad: </label>
			<input type="number" id="cantidad" name="cantidad" onkeypress="MostrarTotales(event);">
		</div>
		<div class="filas">
			<label for="total_detalle">Total Detalle: </label>
			<input type="number" id="total_detalle" name="total_detalle" readonly="true">
		</div>
		<div class="filas">
			<label for="total_acumulado">Total Acumulado: </label>
			<input type="number" id="total_acumulado" name="total_acumulado" readonly="true">
		</div>
		<div class="filas">
			<label for="descuento">Descuento: </label>
			<input type="number" id="descuento" name="descuento" readonly="true">
		</div>
	</fieldset>

		<div class="filas">
			<input type="button" value="Insertar" id="insertar" name="insertar" class="button" onclick="validarCampos_i_ventas();">
			<input type="button" value="Limpiar" id="limpiar" name="limpiar" class="button" onclick="limpiar_i_ventas();">

			
		</div>

	
</form>
</body>
</html>