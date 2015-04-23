<?php
require "conexion.php";
require "class/ventas.php";

$venta = new ventas;

if(isset($_POST['num_factura'], $_POST['cod_articulo'])){

	$venta->borrar_venta($_POST['num_factura'], $_POST['cod_articulo'], $conexion);
}

?>


<!DOCTYPE html>
<html>
<head>
	<title>Borrar Ventas</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="js/ventas.js" type="text/javascript"></script>
	<script src="js/modificar.js" type="text/javascript"></script>

</head>
<body>
	<form method="post" action="" id="d_ventas">
		<fieldset>
			 <table>
				<tr>
					<td><label for="num_factura">N&uacute;mero Factura: </label></td>
					<td><input type="number" id="num_factura" name="num_factura"></td>
				</tr>
				<tr>		 
					<td><label for="cod_articulo">C&oacute;digo del Art&iacute;culo: </label></td>
					<td><input type="number" id="cod_articulo" name="cod_articulo" onkeypress="MostrarArticulo(event);"></td>
					<td><input type="text" id="nom_articulo" name="nom_articulo" readonly="true"></td>
				</tr>
				<tr>	 
					<td><label for="cod_categoria">C&oacute;digo Categoria</label></td>
					<td><input type="number" id="cod_categoria" name="cod_categoria" readonly="true"></td>
					<td><input type="text" id="nom_categoria" name="nom_categoria" readonly="true"></td>
				</tr>
				<tr>
					<td><label for="cod_persona">C&oacute;digo de la persona:</label>
					<td><input type="number" id="cod_persona" name="cod_persona" readonly="true"></td>
					<td><input type="text" id="nom_persona" name="nom_persona" readonly="true"></td>
				</tr>
				<tr>
					<td><label for="cantidad">Cantidad: </label></td>
					<td><input type="number" id="cantidad" name="cantidad" readonly="true"></td>
				</tr>
				<tr>
					<td><label for="total_detalle">Total Detalle: </label></td>
					<td><input type="number" id="total_detalle" name="total_detalle" readonly="true"></td>
				</tr>
				<tr>
					<td><label for="total_acumulado">Total Acumulado: </label></td>
					<td><input type="number" id="total_acumulado" name="total_acumulado" readonly="true"></td>
				</tr>
				<tr>
					<td><label for="descuento">Descuento: </label></td>
					<td><input type="number" id="descuento" name="descuento" readonly="true"></td>
				</tr>
			</table>
		</fieldset>
		 	
		 	<input type="button" value="Buscar" id="buscar" name="buscar" onclick="BuscarFactura();">
			<input type="button" value="Borrar" id="borrar" name="borrar" onclick="validarCampos('d_ventas');">
			<input type="button" value="Cancelar" id="cancelar" name="cancelar" onclick="limpiar_pantalla('d_ventas');">
			<input type="hidden" name="disponible" id="disponible">
			<input type="hidden" name="h_cantidad" id="h_cantidad">
			<p><?php echo $venta->mensaje;?></p>
			<p><?php echo $venta->error;?></p>
	</form>
</body>
</html>