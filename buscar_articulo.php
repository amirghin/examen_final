<?php

require "conexion.php";


$articulo = "";
$query = "SELECT descripcion FROM inventario WHERE codigo_articulo = '{$_GET['cod_articulo']}'";


try {
	

	$resultado = mysqli_query($conexion, $query);
	 if (!($resultado)){

     	throw new Exception(mysqli_error());
  	}elseif(mysqli_num_rows($resultado) == 0){

  		throw new Exception("El articulo con el codigo {$_GET['cod_articulo']} no existe");

  	}else{

  		$row = mysqli_fetch_assoc($resultado);
  		$articulo = $row['descripcion'];
  		echo $articulo;

  	}

  	mysqli_close($conexion);

} catch (Exception $e) {
	
	$articulo = $e->GetMessage();
	echo $articulo;
}

?>
