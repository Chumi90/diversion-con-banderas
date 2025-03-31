/**
# Diversión con banderas

Este es un ejemplo de una aplicación que utiliza la API de REST Countries para obtener información sobre países y 
mostrarla en una interfaz de usuario. 
La aplicación está escrita en JavaScript y utiliza funciones asíncronas para manejar las llamadas a la API.

## Funcionalidades

- Al cargar el DOM, la aplicación tiene que llamar una función que realiza una solicitud a la API para obtener 
información sobre todos los países. Son 250, tarda un poco en renderizar.
- La información se ordena alfabéticamente.
- Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una ventana flotante 
del país seleccionado. La Muestra información detallada sobre el país seleccionado, incluyendo la bandera, la capital, 
la población, el lado de la carretera por el que se circula.
- Tendrá un botón cerrar para hacer desaparecer esa información.

Tendrá este aspecto
![banderas](./img/bandera
s-1.png)

![banderas](./img/banderas-2.png)

## API utilizada

Esta aplicación utiliza la API de REST Countries para obtener información sobre los países. La URL de la API es 
[https://restcountries.com/v3/all](https://restcountries.com/v3/all).


## Notas y pistas

- Los paises se ordenarán en orden alfabético (recuerda el método `sort`). Recuerda que para ordenar no es lo mismo 
mayúsculas que minúsculas. Si comparas que sea lo mismo... pasa los nombres a mayúsculas si te parece más sencillo 
para la comparación.
- La información detallada incluye la bandera del país, la capital, la población y el lado de la carretera donde se 
circula. Este flotante se quedará fijo y centrado hasta que se cierre.
- La aplicación está diseñada con un enfoque simple y utiliza funciones asíncronas para manejar las solicitudes a la 
API. Recuerda que podrás usar fetch, Async/Await...
- Puedes manipular el `HTML` si lo necesitaras. 
- Si necesitas añadir clases a un elemento mediante JS, lo puedes hacer con `elemento.classList.add('clase que 
quieres añadir')` y para eliminar `elemento.classList.remove('clase que quieres añadir')`
 
 */

const URL="https://restcountries.com/v3/all"
const flagsDraw=document.getElementById("countries-list");

//Draw the flags in de HTML
function drawOrderFlags(flagDraw,data){
    flagsDraw.innerHTML=flagDraw;
    loop(data)
}

function drawFlagSeletc(data,flagName){
    console.log(data)
    console.log(flagName)
}

function loop(data){
    const btns=document.querySelectorAll('article[id^="flag"]') //Seleccionamos la bandera que necesitamos
    const flag=btns.forEach((btn) => {
        btn.addEventListener('click', e => {
        const flag =(e.target.id)//Convertir la cadena a un array .split(' ')
        const flagName=(flag.split("flag"))[1] //Sacampos el nombre de la bandela
        //console.log(flagName)
        drawFlagSeletc(data,flagName)
        });
    });
}

//Unify the flags in a register
function getFlags(city,data){
    const contriesList=document.getElementById('countries-list');
    //console.log(contriesList);
    //console.log(city);
    //console.log(data);
    let datas=[];
    city.map((flag)=>{
        data.map((flags)=>{
            if (flag==flags.name.common){
                datas+=`
                <article class="Flag" id="flag${flags.name.common}">
                <img src="${flags.flags[1]}" id="flag${flags.name.common}" alt="flag${flags.name.common}">
                <p id="flag${flags.name.common}"><strong>${flags.name.common}</strong></p>
                </article>                
                `
            }
        })
    })
    //console.log(datas);
    drawOrderFlags(datas,data);
}

//Gets the flags with fetch
const getDatas= async()=>{
    try{
        const response=await fetch(URL);
        if(!response.ok){
            throw new Error ('Hay un error en la descarga',response.status);
        }
    const flags=await response.json();
    //console.log(flags);
    const cities=flags.map((city)=>city.name.common) //obtenemos el nombre de los paises
    //console.log(cities);
    let citesOrder=cities.sort() //Order with the name of citys
    //console.log(citesOrder)
    getFlags(citesOrder,flags)
    }
    catch(error){
        console.log('Error al obtener los datos',error);
    }
}

getDatas()

