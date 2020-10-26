let lineas, lista, elemento, aux, error;

let variables = new Array();

const area = document.getElementById('text');
const analizador = document.getElementById('analizador');

area.addEventListener('keydown', function(e) {
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;
    
        this.value = this.value.substring(0, start) +
            "\t" + this.value.substring(end);
    
        this.selectionStart =
            this.selectionEnd = start + 1;
    }
});

function tipoNumerico (array, tabla) {
    tab = array[0].trim();
    if (array.length == 1) {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else if (array[1] == "") {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else {
        aux = analizador.value;
        variables.push([array[1], tab]);
        analizador.value = aux + "" + tabla + "\n";
    }
}

function tipoCaracter (array, tabla) {
    tab = array[0].trim();
    if (array.length == 1) {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else if (array[1] == "") {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else {
        aux = analizador.value;
        variables.push([array[1], tab]);
        analizador.value = aux + "" + tabla + "\n";
    }
}

function tipoBool (array, tabla) {
    tab = array[0].trim();
    if (array.length == 1) {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else if (array[1] == "") {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[1][1] + "\n";
    } else {
        aux = analizador.value;
        variables.push([array[1], tab]);
        analizador.value = aux + "" + tabla + "\n";
    }
}

function asignacion (dato, tabla) {
    let datos = dato.split(" = ");
    let existe = false, tipo, fP = "", mensaje;
    let variable = datos[0].trim();
    
    for (let i = 0; i < variables.length; i++) {
        if (variable == variables[i][0]) {
            tipo = variables[i][1];
            console.log(variables[i][0]);
            existe = true;
        }  
    }

    if (existe) {
        fP = datos[1].replace(/[()"]+/g,"");

        if (tipo == "INT" || tipo == "DOUBLE" || tipo == "FLOAT") {
            if (isNaN(datos[1]) == false) {
                aux = analizador.value;
                analizador.value = aux + "" + tabla + "\n";
            } else {
                aux = analizador.value;
                analizador.value = aux + "Error: " + errores[8][1] + "\n";
            }
        } else if (tab == "STRING" || tab == "CHAR") {
            if (isNaN(datos[1])) {
                aux = analizador.value;
                analizador.value = aux + "" + tabla + "\n";
            } else {
                aux = analizador.value;
                analizador.value = aux + "Error: " + errores[8][1] + "\n";
            }
        } else if (tab == "BOOLEAN") {
            if (datos[1] == "true" || datos[1] == "false") {
                aux = analizador.value;
                analizador.value = aux + "" + tabla + "\n";
            } else {
                aux = analizador.value;
                analizador.value = aux + "Error: " + errores[8][1] + "\n";
            }
        } 
    } else {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[9][1] + "\n";
    }
}

function tipoFuncion (array, tabla) {
    fP = array[1].replace(/[.*+\-?^${}()|[\]\\]/g, " ");
    c = fP.split(",");
    let existe1 = false, existe2 = false, tipo;
    
    if (c[0].trim() == "" || c[1].trim() == "") {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[4][1] + "\n";
    } else {
        if (isNaN(c[0]) == true && isNaN(c[1]) == true) {
            
            for (let j = 0; j < variables.length; j++) {
                if (c[0].trim() == variables[j][0]) {
                    tipo = variables[j][1];
                    existe1 = true;
                    j = variables.length;
                }  
            }
            
            for (let i = 0; i < variables.length; i++) {
                if (c[1].trim() == variables[i][0]) {
                    tipo = variables[i][1];
                    existe2 = true;
                    i = variables.length;
                }  
            }
    
            if (existe1 == true && existe2 == true) {
                aux = analizador.value;
                analizador.value = aux + "" + tabla + "\n";
            } else {
                aux = analizador.value;
                analizador.value = aux + "Error: " + errores[8][1] + "\n";
            }
        } else {
            aux = analizador.value;
            analizador.value = aux + "" + tabla + "\n";
        }
    }
}

function impresion (array, tabla) {
    let mensaje;
    let dimension = array.length-1;
    fP = "";
    console.log();

    if (array[dimension].indexOf(")") >= 0) {
        for (let i = 1; i < array.length; i++) {
            mensaje = fP;
            fP = mensaje + " " + array[i].replace(/[()"]+/g,"");
        }
    
        if (fP.trim() == "" || array.length == 1) {
            aux = analizador.value;
            analizador.value = aux + "Error: " + errores[6][1] + "\n";
        } else {
            aux = analizador.value;
            analizador.value = aux + "" + tabla + "\n";
        }
    } else {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[7][1] + "\n";
    }
}

function contenedor (array, tabla) {
    aux = analizador.value;
    analizador.value = aux + "" + tabla + "\n";
}

function distribucion (dato) {
    let div = dato.split(" ");
    let tab = div[0].trim();
    let cont = 0;


    for (let m = 0; m < tabla.length; m++) {
        if (tab == tabla[m][0]) {
            if (tab == "INICIO" || tab == "FIN") {
                contenedor(tab, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else if (tab == "INT" || tab == "DOUBLE" || tab == "FLOAT") {
                tipoNumerico(div, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else if (tab == "STRING" || tab == "CHAR") {
                tipoCaracter(div, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else if (tab == "BOOLEAN") {
                tipoBool(div, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else if (tab == "SUM" || tab == "RES" || tab == "DIV" || tab == "MUL") {
                tipoFuncion(div, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else if (tab == "IMPRIMIR") {
                impresion(div, tabla[m][1]);
                m = tabla.length;
                cont = 1;
            } else {
                cont = 0;
            }
        } 
    }

    if (dato.indexOf(" = ") > 0) {
        asignacion(dato, tabla[13][1]);
        cont = 1;
    }

    if (cont == 0) {
        aux = analizador.value;
        analizador.value = aux + "Error: " + errores[0][1] + "\n";
    }
}

function Exp (lineas) {
    const array = lineas;
    const s = array.length;

    if (array[0] == "INICIO" && array[s-1] == "FIN") {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < tabla.length; j++) {
                distribucion(array[i]);
                j = tabla.length;
            }
        }
    } else {
        analizador.value = "Error: " + errores[5][1];
    }
}

function Analizar() {
    const texto = document.getElementById("text").value;
    
    lineas = area.value.split("\n");
    
    if (area.value != "") {
        analizador.value = "";
        variables = [];
        Exp(lineas);
    } else {
        analizador.value = "Error: No existe ninguna expresión valida";
    }
}

