<?php

require "conexion.php";


$empleado = "";
$query = "SELECT nombre FROM personal WHERE codigo_empleado = '{$_GET['cod_empleado']}'";


try {
	

	$resultado = mysqli_query($conexion, $query);
	 if (!($resultado)){

     	throw new Exception(mysqli_error());
  	}elseif(mysqli_num_rows($resultado) == 0){

  		throw new Exception("El empleado con el codigo {$_GET['cod_empleado']} no existe");

  	}else{

  		$row = mysqli_fetch_assoc($resultado);
  		$empleado = $row['nombre'];
  		echo $empleado;

  	}

  	mysqli_close($conexion);

} catch (Exception $e) {
	
	$empleado = $e->GetMessage();
	echo $empleado;
}

?>