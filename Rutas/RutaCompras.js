var rutas = require("express").Router();
var { mostrarCompras, nuevaCompra, buscarCompraPorId, borrarCompra } = require("../bd/comprasBD");

rutas.get("/mostrarCompras", async (req, res) => {
    try {
        var comprasValidas = await mostrarCompras();
        res.json(comprasValidas);
    } catch (error) {
        console.error("Error al mostrar compras:", error);
        res.status(500).json({ error: "Error al mostrar compras" });
    }
});

rutas.get("/buscarCompraPorId/:id", async (req, res) => {
    try {
        var compraValida = await buscarCompraPorId(req.params.id);
        if (compraValida.length > 0) {
            res.json(compraValida);
        } else {
            res.status(404).json({ error: "Compra no encontrada" });
        }
    } catch (error) {
        console.error("Error al buscar compra:", error);
        res.status(500).json({ error: "Error al buscar compra" });
    }
});

rutas.get("/borrarCompra/:id", async (req, res) => {
    try {
        var compraBorrada = await borrarCompra(req.params.id);
        if (compraBorrada) {
            res.json({ message: "Compra cancelada exitosamente" });
        } else {
            res.status(404).json({ error: "Compra no encontrada o no se pudo cancelar" });
        }
    } catch (error) {
        console.error("Error al borrar compra:", error);
        res.status(500).json({ error: "Error al borrar compra" });
    }
});

rutas.post("/nuevaCompra", async (req, res) => {
    try {
        var compraValida = await nuevaCompra(req.body);
        if (compraValida) {
            res.json({ message: "Compra registrada exitosamente" });
        } else {
            res.status(400).json({ error: "Error en los datos de la compra" });
        }
    } catch (error) {
        console.error("Error al crear nueva compra:", error);
        res.status(500).json({ error: "Error al crear nueva compra" });
    }
});

module.exports = rutas;
