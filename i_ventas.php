<?php

require "conexion.php";
require "class/ventas.php";

$venta = new ventas;

if(isset($_POST['num_factura'], $_POST['cod_articulo'], $_POST['cod_persona'], $_POST['cantidad'], $_POST['total_detalle'], $_POST['descuento'])){

	$venta->insertar_venta($_POST['num_factura'], $_POST['cod_articulo'], $_POST['cod_persona'], $_POST['cantidad'], $_POST['total_detalle'], $_POST['descuento'], $conexion);

}

?>

<!DOCTYPE html>
<html>
<head>
	<title>Insertar Ventas</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="js/ventas.js" type="text/javascript"></script>

</head>
<body>
	<section class="Formulario">
		<form method="post" action="" id="i_ventas">
			<fieldset>
				 <h1>Insertar Ventas</h1>
				 <table>
					<tr>
						<td><label for="num_factura">N&uacute;mero Factura: </label></td>
						<td><input type="number" id="num_factura" name="num_factura" min="0"></td>
					</tr>
					<tr>		 
						<td><label for="cod_articulo">C&oacute;digo del Art&iacute;culo: </label></td>
						<td><input type="number" id="cod_articulo" name="cod_articulo" onkeypress="MostrarArticulo(event);" min="0"></td>
						<td><input type="text" id="nom_articulo" name="nom_articulo" readonly="true"></td>
					</tr>
					<tr>	 
						<td><label for="cod_categoria">C&oacute;digo Categoria</label></td>
						<td><input type="number" id="cod_categoria" name="cod_categoria" readonly="true"></td>
						<td><input type="text" id="nom_categoria" name="nom_categoria" readonly="true"></td>
					</tr>
					<tr>
						<td><label for="cod_persona">C&oacute;digo de la persona:</label>
						<td><input type="number" id="cod_persona" name="cod_persona" onkeypress="MostrarPersona(event);" min="0"></td>
						<td><input type="text" id="nom_persona" name="nom_persona" readonly="true"></td>
					</tr>
					<tr>
						<td><label for="cantidad">Cantidad: </label></td>
						<td><input type="number" id="cantidad" name="cantidad" onkeypress="MostrarTotales(event);" min="0"></td>
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

			<fieldset> 
				<input type="button" value="Insertar" id="insertar" name="insertar" onclick="validarCampos('i_ventas');">
				<input type="button" value="Limpiar" id="limpiar" name="limpiar" onclick="limpiar_pantalla('i_ventas');">
				<input type="hidden" name="disponible" id="disponible">
				<input type="hidden" name="h_precio" id="h_precio">	
				<p class="mensaje"><?php echo $venta->mensaje;?></p>
				<p class="error"><?php echo $venta->error;?></p>
			</fieldset>
			 
		</form>
	</section>
</body>
</html>