<?php

require "conexion.php";


$categoria = "";
$query = "SELECT descripcion FROM categorias WHERE codigo_categoria= '{$_GET['cod_categoria']}'";


try {
	

	$resultado = mysqli_query($conexion, $query);
	 if (!($resultado)){

     	throw new Exception(mysqli_error($conexion));
  	}elseif(mysqli_num_rows($resultado) == 0){

  		throw new Exception("La categoria con el codigo {$_GET['cod_categoria']} no existe");

  	}else{

  		$row = mysqli_fetch_assoc($resultado);
  		$categoria = $row['descripcion'];
  		echo $categoria;

  	}

  	mysqli_close($conexion);

} catch (Exception $e) {
	
	$categoria = $e->GetMessage();
	echo $categoria;
}

?>