<!DOCTYPE html>
<html>
<head>
	<title>Insertar Ventas</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="js/buscar_articulo.js" type="text/javascript"></script>
	<script src="js/buscar_categoria.js" type="text/javascript"></script>
	<script src="js/buscar_personal.js" type="text/javascript"></script>
	<script src="js/totales.js" type="text/javascript"></script>

</head>
<body>
<form method="post" action="">
	<fieldset class="insertar_ventas">
		<div class="filas">
			<label for="num_factura">N&uacute;mero Factura: </label>
			<input type="number" id="num_factura" name="num_factura">
		</div>
		<div class="filas">
			<label for="cod_articulo">C&oacute;digo del Art&iacute;culo: </label>
			<input type="text" id="cod_articulo" name="cod_articulo" onkeypress="MostrarArticulo(event);">
			<input type="text" id="nom_articulo" name="nom_articulo" disabled="true">
		</div>
		<div class="filas">
			<label for="cod_categoria">C&oacute;digo Categoria</label>
			<input type="text" id="cod_categoria" name="cod_categoria" onkeypress="MostrarCategoria(event);">
			<input type="text" id="nom_categoria" name="nom_categoria" disabled="true">
		</div>
		<div class="filas">
			<label for="cod_persona">C&oacute;digo de la persona:</label>
			<input type="text" id="cod_persona" name="cod_persona" onkeypress="MostrarPersona(event);">
			<input type="text" id="nom_persona" name="nom_persona" disabled="true">
		</div>
		<div class="filas">
			<label for="cantidad">Cantidad: </label>
			<input type="number" id="cantidad" name="cantidad" onkeypress="MostrarTotales(event);">
		</div>
		<div class="filas">
			<label for="total_detalle">Total Detalle: </label>
			<input type="number" id="total_detalle" name="total_detalle" disabled="true">
		</div>
		<div class="filas">
			<label for="total_acumulado">Total Acumulado: </label>
			<input type="number" id="total_acumulado" name="total_acumulado" disabled="true">
		</div>
		<div class="filas">
			<label for="descuento">Descuento: </label>
			<input type="number" id="descuento" name="descuento" disabled="true">
		</div>
	</fieldset>

		<div class="filas">
			<input type="button" value="Insertar" id="insertar" name="insertar" class="button">
		</div>

	
</form>
</body>
</html>