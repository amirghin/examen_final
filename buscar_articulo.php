<?php

require "conexion.php";


$articulo = array();
$query = "SELECT descripcion, disponible, precio FROM inventario WHERE codigo_articulo = '{$_GET['cod_articulo']}'";


try {
	

	$resultado = mysqli_query($conexion, $query);
	 if (!($resultado)){

     	throw new Exception(mysqli_error());
  	}elseif(mysqli_num_rows($resultado) == 0){

  		throw new Exception("El articulo con el codigo {$_GET['cod_articulo']} no existe");

  	}else{

  		
  		$articulo = mysqli_fetch_assoc($resultado);

  	}

  	mysqli_close($conexion);

} catch (Exception $e) {
	
	$articulo = array("descripcion" => $e->GetMessage());

}

echo json_encode($articulo);
?>
