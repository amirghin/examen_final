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

				$this->mensaje = "Se inserto la venta con exito";
			}
				
		}catch(Exception $e){
			$this->error = $e->GetMessage();

		}
	}
}
?>