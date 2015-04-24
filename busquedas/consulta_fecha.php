<?php
require "../conexion.php";

$facturas = array();

if(isset($_GET['num_factura'], $_GET['fecha'])){
	$query = "SELECT vent.numero_factura, vent.fecha_factura, vent.codigo_persona, per.nombre, vent.codigo_articulo, inv.descripcion, vent.cantidad, inv.precio, concat(vent.descuento, '%')  descuento, vent.total_detalle
			FROM examen_ii.ventas vent
			JOIN examen_ii.inventario inv ON vent.codigo_articulo = inv.codigo_articulo
			JOIN examen_ii.personal per ON per.codigo_empleado = vent.codigo_persona
			WHERE numero_factura = {$_GET['num_factura']} AND fecha_factura = '{$_GET['fecha']}'";

	try {
    
    $resultado = mysqli_query($conexion, $query);
     if (!($resultado)){

        throw new Exception(mysqli_error($conexion));
      }elseif(mysqli_num_rows($resultado) == 0){

        throw new Exception("No se encontró ningún registro con la combinación Factura: {$_GET['num_factura']} Fecha: {$_GET['fecha']}");

      }else{

        while($row=mysqli_fetch_assoc($resultado))
        $facturas[] = $row;

      }

      mysqli_close($conexion);

  } catch (Exception $e) {
    
    $facturas = array("error" => $e->GetMessage());

  }

  echo '{"facturas":'.json_encode($facturas).'}';
}
?>