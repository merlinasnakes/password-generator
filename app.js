(function(){
// --------------------------------
// Variables y Objetos Generales
// --------------------------------

    var app = document.getElementById('app');
    var inputCaracteres = document.getElementById('numero-caracteres');
    var configuracion = { 
        caracteres: parseInt(inputCaracteres.value),
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true,
    }

    var caracteres = {
        numeros:  '0 1 2 3 4 5 6 7 8 9',
        simbolos: '! @ # $ % ^ & * ( ) _ - = { [ } ] ; : < , > . ? /',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z',
    }

// --------------------------------
// Eventos
// --------------------------------

// Evento para evitar que la pagina haga submit y se recargue al tocar cualquier botón
app.addEventListener('submit',function(e){
    e.preventDefault();
});

app.elements.namedItem('btn-mas-uno').addEventListener('click', function(){
    configuracion.caracteres++;
    inputCaracteres.value = configuracion.caracteres;
})

app.elements.namedItem('btn-menos-uno').addEventListener('click', function(){
    if(configuracion.caracteres > 1) {
        configuracion.caracteres--;
        inputCaracteres.value = configuracion.caracteres;
    }

});

var tipos = ['simbolos', 'numeros', 'mayusculas'];
for (var index = 0; index < tipos.length; index++) {
    const tipo = tipos[index];
    
    app.elements.namedItem('btn-'+ tipo).addEventListener('click', function(){
        configuracion[tipo] = !configuracion[tipo];
        console.log('Estado de '+ tipo + ': ' + configuracion[tipo]);
        btnToggle(this);
    })
}

// app.elements.namedItem('btn-simbolos').addEventListener('click', function(){
//     configuracion.simbolos = !configuracion.simbolos;
//     console.log('Estado de simbolos: ' + configuracion.simbolos);
//     btnToggle(this);
// })

// app.elements.namedItem('btn-numeros').addEventListener('click', function(){
//     configuracion.numeros = !configuracion.numeros;
//     console.log('Estado de numeros: ' + configuracion.numeros);
//     btnToggle(this);
// })

// app.elements.namedItem('btn-mayusculas').addEventListener('click', function(){
//     configuracion.mayusculas = !configuracion.mayusculas;
//     console.log('Estado de mayusculas: ' + configuracion.mayusculas);
//     btnToggle(this);
// })

function btnToggle(elemento) {
    console.log(elemento);
    console.log(elemento.children);
    elemento.classList.toggle('false');
    elemento.children[0].classList.toggle('fa-check');
    elemento.children[0].classList.toggle('fa-times');
}

app.elements.namedItem('btn-generar').addEventListener('click', function(){
    generarPassword();
});

app.elements.namedItem('input-password').addEventListener('click', function(){
    copiarPassword()
})

// --------------------------------
// Funciones
// --------------------------------
    
    function generarPassword() {
        var caracteresFinales = '';
        var password = '';

        for (propiedad in configuracion) {
            if(configuracion[propiedad] === true) {
                caracteresFinales += caracteres[propiedad] + ' ';
                //console.log(caracteresFinales)
            }
        }
        caracteresFinales = caracteresFinales.trim();        
        caracteresFinales = caracteresFinales.split(' ');

        for (var i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
        }

        //console.log(password);
        app.elements.namedItem('input-password').value = password;
    }
    
    function copiarPassword() {
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alerta-copiado').classList.add('active');

        setTimeout(function() {
        document.getElementById('alerta-copiado').classList.remove('active');
        }, 2000)
    }

    generarPassword()

}())