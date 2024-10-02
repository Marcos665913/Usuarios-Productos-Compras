class Compra {
    constructor(data) {
        console.log("Datos recibidos en Compra:", data);
        this.id = data.id;
        this._fecha = data.fecha;
        this._hora = data.hora;
        this._cantidad = data.cantidad;
        this._status = data.status;
        this.IdUsuario = data.IdUsuario;
        this.IdProducto = data.IdProducto;
    }

    set id(id) { this._id = id; }
    set IdUsuario(IdUsuario) {
        console.log("Validando IdUsuario:", IdUsuario);
        if (typeof IdUsuario === 'string' && IdUsuario.trim() !== '') this._IdUsuario = IdUsuario;
        else throw new Error("ErrorCliente");
    }
    set IdProducto(IdProducto) {
        console.log("Validando IdProducto:", IdProducto);
        if (typeof IdProducto === 'string' && IdProducto.trim() !== '') this._IdProducto = IdProducto;
        else throw new Error("ErrorProducto");
    }
    set fecha(fecha) {
        if (fecha) this._fecha = fecha;
        else throw new Error("ErrorFecha");
    }

    set hora(hora) {
        // ("HH:MM")
        const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (regex.test(hora)) {
            this._hora = hora;
        } else {
            throw new Error("ErrorHora: formato inválido. Debe ser HH:MM.");
        }
    }

    set cantidad(cantidad) {
        let cantidadNumerica = parseInt(cantidad, 10);
        if (!isNaN(cantidadNumerica) && cantidadNumerica > 0) this._cantidad = cantidadNumerica;
        else throw new Error("ErrorCantidad");
    }
    set status(status) {
        const statusValidos = ["ACTIVA", "CANCELADA", "COMPLETADA"];
        if (statusValidos.includes(status)) this._status = status;
        else throw new Error('El status no es valido');
    }

    get id() { return this._id; }
    get fecha() { return this._fecha; }
    get hora() { return this._hora; }
    get cantidad() { return this._cantidad; }
    get status() { return this._status; }
    get IdUsuario() { return this._IdUsuario; }
    get IdProducto() { return this._IdProducto; }

    getCompra() {
        const conId = {
            id: this.id,
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            status: this.status,
            IdUsuario: this.IdUsuario,
            IdProducto: this.IdProducto
        };
        const sinId = {
            fecha: this.fecha,
            hora: this.hora,
            cantidad: this.cantidad,
            status: this.status,
            IdUsuario: this.IdUsuario,
            IdProducto: this.IdProducto
        };

        return this.id == undefined ? sinId : conId;
    }
}

module.exports = Compra;
