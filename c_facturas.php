<!DOCTYPE html>
<html>
<head>
	<title>Consultar Factura por Fecha</title>
	<link rel="stylesheet" type="text/css" href="css/estilos.css">
	<script src="js/ventas.js" type="text/javascript"></script>
</head>
<body>
	<section class="Busqueda">
		<form name="consultar_factura" id="consultar_factura" method="POST" action="">
			<h1> Busqueda de Facturas</h1>
			<fieldset>
				<table>
					<tr>
						<td><label for="num_factura">Número de Factura</label></td>
						<td><input type="number" name="num_factura" id="num_factura" min="0"></td>
						<td><label for="fecha">Fecha</label></td>
						<td><input type="date" name="fecha" id="fecha"></td>
						<td><input type="button" name="buscar" id="buscar" value="Buscar" onclick="BuscarFacturaFecha();"></td>
					</tr>
				</table>
			</fieldset>
			<fieldset>
				<div class="TablaBusqueda" id="tabla_busqueda"></div>
			</fieldset>
		</form>
	</section>
</body>
</html>