<?php

require "../conexion.php";



if(isset($_GET['cod_articulo'])){
  $articulo = array();
  $query = "SELECT art.descripcion, art.disponible, art.precio, art.descuento, art.codigo_categoria, cat.descripcion categoria FROM inventario art 
            JOIN categorias cat ON cat.codigo_categoria = art.codigo_categoria
            WHERE codigo_articulo = '{$_GET['cod_articulo']}'";
  try {
    
  	$resultado = mysqli_query($conexion, $query);
  	 if (!($resultado)){

       	throw new Exception(mysqli_error($conexion));
    	}elseif(mysqli_num_rows($resultado) == 0){

        throw new Exception(false);

    	}else{

    		
    		$articulo = mysqli_fetch_assoc($resultado);

    	}

    	mysqli_close($conexion);

  } catch (Exception $e) {
  	
  	$articulo = array("descripcion" => $e->GetMessage());

  }

  echo json_encode($articulo);
}
?>
