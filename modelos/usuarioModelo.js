class Usuario {
    constructor(data) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.usuario = data.usuario;
        this.password = data.password;
        this.salt = data.salt;
        this.tipoUsuario = data.tipoUsuario;
    }

    set id(id) {
        this._id = id;
    }

    set nombre(nombre) {
        console.log("Validando nombre:", nombre); // Añadir este log
        var regexNombre = /^[A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}([ ][A-ZÁÉÍÓÚÑ'][a-záéíóúñ']{1,}){0,}$/;
        if (regexNombre.test(nombre)) {
            this._nombre = nombre;
        } else {
            throw new Error("Nombre no válido");
        }
    }
    

    set usuario(usuario) {
        this._usuario = usuario;
    }

    set password(password) {
        if (password && password.length >= 6) {
            this._password = password;
        } else {
            console.log('Contraseña recibida:', password);
            throw new Error("Contraseña no válida " + password);
        }
    }


    set salt(salt) {
        this._salt = salt;
    }

    set tipoUsuario(tipoUsuario) {
        this._tipoUsuario = tipoUsuario;
    }

    get id() {
        return this._id;
    }

    get nombre() {
        return this._nombre;
    }

    get usuario() {
        return this._usuario;
    }

    get password() {
        return this._password;
    }

    get salt() {
        return this._salt;
    }

    get tipoUsuario() {
        return this._tipoUsuario;
    }

    getUsuario() {
        const conId = {
            id: this.id,
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };

        const sinId = {
            nombre: this.nombre,
            usuario: this.usuario,
            password: this.password,
            salt: this.salt,
            tipoUsuario: this.tipoUsuario
        };

        if (this.id == undefined) {
            return sinId;
        } else {
            return conId;
        }
    }

}

module.exports = Usuario;
