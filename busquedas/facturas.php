<?php

require "../conexion.php";


if(isset($_GET['num_factura'], $_GET['cod_articulo'])){

  $query = "SELECT cantidad, descuento, total_detalle, codigo_persona FROM ventas 
            WHERE numero_factura = {$_GET['num_factura']} AND codigo_articulo = {$_GET['cod_articulo']}";

  try {
    
    $resultado = mysqli_query($conexion, $query);
     if (!($resultado)){

        throw new Exception(mysqli_error($conexion));
      }elseif(mysqli_num_rows($resultado) == 0){

        throw new Exception("No se encontró ningún registro con la combinación Factura: {$_GET['num_factura']} Codigo Articulo: {$_GET['cod_articulo']}");

      }else{

        
        $articulo = mysqli_fetch_assoc($resultado);

      }

      mysqli_close($conexion);

  } catch (Exception $e) {
    
    $articulo = array("error" => $e->GetMessage());

  }

  echo json_encode($articulo);
}
?>