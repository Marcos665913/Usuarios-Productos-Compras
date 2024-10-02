function saludar() {
    console.log("Hola");
}
saludar();

function saludar2(nombre="anonimo") {
    console.log("Hola " + nombre);
}
saludar2("Juan Perez");

function saludar3(nombre="anonimo") {
    var s="Hola " + nombre;
    return s;
}
console.log(saludar3("Juancho"));

var saludo=()=>{
    console.log("Hola");
}

saludo();

var saludo2=(nombre)=>{
    console.log("Hola "+nombre);
}

saludo2("Menganito");

var saludo3=(nombre)=>{
    console.log("Hola "+nombre);
}

saludo3("Fulanito");

var saludo4=(nombre)=>{
    var s= "Hola "+nombre;
    return s;
}

console.log(saludo4("Lolita"));

var saludo5=(nombre)=>{
    return "Hola "+nombre;
}

console.log(saludo5("Monica"));

var saludo6=nombre=>"Hola "+nombre;
console.log(saludo6("Carlos"));

console.log(nombre=>"Hola "+nombre);

var saludo7 = function(){
    console.log("hola");
    
}
saludo7();

var saludo111=()=>{
    console.log("Saludo111");
}
saludo111();

var saludo222=(nombre, s)=>{
    console.log("Hola"+nombre);
    s();
}
saludo222("Bethoven", saludo111);