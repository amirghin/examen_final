<?php

$query = "SELECT vent.numero_factura, vent.fecha_factura, vent.codigo_persona, per.nombre, vent.codigo_articulo, cat.descripcion, vent.cantidad, inv.precio, concat(vent.descuento, '%')  descuento, vent.total_detalle
			FROM examen_ii.ventas vent
			JOIN examen_ii.categorias cat ON vent.codigo_articulo = cat.codigo_categoria
			JOIN examen_ii.inventario inv ON vent.codigo_articulo = inv.codigo_articulo
			JOIN examen_ii.personal per ON per.codigo_empleado = vent.codigo_persona
			WHERE numero_factura = 1 AND fecha_factura = '2015-04-19'";

?>