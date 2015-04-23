<?php 
class ventas{
	public $mensaje = "";
	public $error = "";
	function insertar_venta($num_factura, $cod_articulo, $cod_persona, $cantidad, $total_detalle, $descuento, $conexion){

		try{
			$insert = "INSERT INTO ventas (numero_factura, codigo_articulo, codigo_persona, cantidad, total_detalle, descuento, fecha_factura)
			           VALUES ({$num_factura}, {$cod_articulo}, {$cod_persona}, {$cantidad}, {$total_detalle}, {$descuento}, CURDATE())";	

			$resultado = mysqli_query($conexion, $insert);

			if(!$resultado){

				throw new Exception(mysqli_error($conexion));
			}else{

				$this->mensaje = "Se insertó la venta con éxito";
			}
				
		}catch(Exception $e){
			$this->error = $e->GetMessage();

		}
	}


	function modificar_venta($num_factura, $cod_articulo, $cod_persona, $cantidad, $total_detalle, $descuento, $conexion){

			try{
			$update = "UPDATE ventas
						SET cantidad = {$cantidad}, descuento = {$descuento}, total_detalle = {$total_detalle}, codigo_persona = {$cod_persona}
						WHERE numero_factura = {$num_factura} AND codigo_articulo = {$cod_articulo}";	

			$resultado = mysqli_query($conexion, $update);

			if(!$resultado){

				throw new Exception(mysqli_error($conexion));
			}else{

				$this->mensaje = "Se modificó la venta con éxito";
			}
				
		}catch(Exception $e){
			$this->error = $e->GetMessage();

		}

	}

		function borrar_venta($num_factura, $cod_articulo,$conexion){

			try{
			$update = "DELETE FROM ventas
						WHERE numero_factura = {$num_factura} AND codigo_articulo = {$cod_articulo}";	

			$resultado = mysqli_query($conexion, $update);

			if(!$resultado){

				throw new Exception(mysqli_error($conexion));
			}else{

				$this->mensaje = "Se borró la venta con éxito";
			}
				
		}catch(Exception $e){
			$this->error = $e->GetMessage();

		}

	}
}
?>