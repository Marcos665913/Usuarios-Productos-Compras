const comprasBD = require("./conexion").compras;
const productosBD = require("./conexion").productos;
const buscarProductoPorId = require("../bd/productosBD").buscarPorId;
const buscarUsuarioPorId = require("../bd/usuariosBD").buscarPorId;
const Compra = require("../modelos/compraModelo");

function validarDatos(compra) {
    var valido = false
    if (compra.IdUsuario != undefined && compra.IdProducto != undefined && compra.cantidad != undefined && compra.hora != undefined) {
        valido = true;
    }
    return valido;
}

async function mostrarCompras() {
    const comprasS = await comprasBD.get();
    const comprasValidas = [];

    for (const doc of comprasS.docs) {
        const compra = new Compra({ id: doc.id, ...doc.data() });
        if (validarDatos(compra.getCompra())) {
            const clienteId = compra.IdUsuario;
            const productoId = compra.IdProducto;

            const cliente = await buscarUsuarioPorId(clienteId);
            let nombreUsuario;
            if (cliente) {
                nombreUsuario = cliente.nombre;
            } else {
                nombreUsuario = "No encontrado";
            }

            const producto = await buscarProductoPorId(productoId);
            let nombreProducto;
            if (producto) {
                nombreProducto = producto.nombre;
            } else {
                nombreProducto = "No encontrado";
            }

            comprasValidas.push({
                fecha: compra.fecha,
                hora: compra.hora,
                Cliente: nombreUsuario,
                Producto: nombreProducto,
                cantidad: compra.cantidad,
                status: compra.status
            });
        }

    }
    return comprasValidas;
}

function validarDatosCompra(compra) {
    return compra.IdUsuario !== undefined &&
        compra.IdProducto !== undefined &&
        compra.cantidad !== undefined &&
        compra.fecha !== undefined &&
        compra.hora !== undefined &&
        compra.status !== undefined;
}

async function buscarCompraPorId(id) {
    console.log(id);
    const compraDoc = await comprasBD.doc(id).get();
    if (!compraDoc.exists) {
        throw new Error("CompraNoEcontrada");
    }
    const compra1 = new Compra({ id: compraDoc.id, ...compraDoc.data() });
    let compraValida = [];
    if (validarDatosCompra(compra1.getCompra())) {
        const clienteId = compra1.IdUsuario;
        const productoId = compra1.IdProducto;
        const cliente = await buscarUsuarioPorId(clienteId);
        let nombreUsuario;
        if (cliente) {
            nombreUsuario = cliente.nombre;
        } else {
            nombreUsuario = "ClienteNoEncontrado";
        }

        const producto = await buscarProductoPorId(productoId);
        let nombreProducto;
        if (producto) {
            nombreProducto = producto.nombre;
        } else {
            nombreProducto = "ProductoNoEncontrado";
        }

        compraValida.push({
            fecha: compra1.fecha,
            hora: compra1.hora,
            Cliente: nombreUsuario,
            Producto: nombreProducto,
            cantidad: compra1.cantidad,
            status: compra1.status
        });
    }
    return compraValida;
}

async function nuevaCompra(data) {
    const fechaActual = new Date();

    const zonaHorariaOffset = -30;
    const horaLocal = new Date(fechaActual.getTime() + (zonaHorariaOffset * 60 * 60 * 1000));

    const horaActual = horaLocal.toISOString().split('T')[1].substring(0, 5);
    console.log("Fecha: ", fechaActual.toISOString().split('T')[0]);
    console.log("Hora: ", horaActual);
    const status = "ACTIVA";

    const compra1 = new Compra(data);
    compra1.fecha = fechaActual.toISOString().split('T')[0];
    compra1.hora = horaActual;
    compra1.status = status;

    console.log("Compra inicial: ", compra1);
    let compraValida = false;

    if (validarDatos(compra1.getCompra())) {
        const productoId = compra1.IdProducto;
        const producto = await buscarProductoPorId(productoId);
        if (producto && producto.cantidad >= compra1.cantidad) {
            const nuevaCantidad = producto.cantidad - compra1.cantidad;
            await productosBD.doc(productoId).update({ cantidad: nuevaCantidad });
            await comprasBD.doc().set(compra1.getCompra());
            compraValida = true;
        } else {
            console.log("Insuficiente");
        }
    }
    return compraValida;
}

async function borrarCompra(id) {
    const nuevoEstado = "CANCELADA";
    const compra = await buscarCompraPorId(id);

    if (compra.length > 0) {
        await comprasBD.doc(id).update({ status: nuevoEstado });
        console.log("VENTA_CANCELADA");
        return true;
    } else {
        console.log("ERROR COMPRA");
        return false;
    }
}

module.exports = {
    mostrarCompras,
    buscarCompraPorId,
    nuevaCompra,
    borrarCompra
}
