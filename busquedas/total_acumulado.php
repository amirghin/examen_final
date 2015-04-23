<?php

require "../conexion.php";


if(isset($_GET['num_factura'])){
  $total_acumulado = "";
  $query = "SELECT IFNULL(SUM(total_detalle), 0) total_acumulado FROM ventas WHERE numero_factura = {$_GET['num_factura']}";


  try {	

  	$resultado = mysqli_query($conexion, $query);
  	 if (!($resultado)){

       	throw new Exception(mysqli_error($conexion));
    	}else{

    		$total_acumulado = mysqli_fetch_assoc($resultado)['total_acumulado'];
    		
    		echo $total_acumulado;

    	}

    	mysqli_close($conexion);

  } catch (Exception $e) {
  	
  	$total_acumulado = $e->GetMessage();
  	echo $total_acumulado;
  }
}
?>
