
# Proyecto Final Angular 17

Este proyecto consiste en crear una aplicacion web funcional utilizando Angular 17 que incluye consumo de API's y un CRUD

Consta de dos carpetas una que engloba toda la parte del Cliente y su contraparte que incluye toda la parte del Servidor



## Inicialización

### Servidor
Para inicializar el Servidor hay que situarse en el directorio padre y ejecutar los siguientes comandos:

```http
cd .\server\
npm i
node .\server.js
```

// Se lanzará en http://localhost:3000

### Cliente
Similar al Servidor hay que situarse en el directorio padre y ejecutar el siguiente comando:


```http
cd .\client\
npm i
ng s
```

// Se lanzará en http://localhost:4200
## Guía

### Sidebar
En el Sidebar se encuentra un menús desplegable. El cual incluye links a 3 API's diferentes:
- **Weather App**: Consiste en una API que recopila información meteorológica. Para usarla solo se tiene que introducir el nombre de un lugar y te devolverá la información correspondiente.

- **PokeAPI**: API que contiene información de todos los Pokemons hasta la fecha. Para su uso se debe introducir el número de un Pokemon.

- **Rick And Morty API**: Devuelve de manera aleatoria un personaje de la serie Rick y Morty.



### Header
En el header se encuentran 2 links, uno redirige al home del proyecto y el otro redirige a la sección del CRUD:
- **CRUD**: Consta de un formulario con dos campos, nombre y comentario, se puede añadir una nota, eliminarla y editarla, ademas de mostrar todas las notas que otros usuarios han puesto. Funciona a través de una BD en MongoDB alojada en Atlas

El header también incluye una barra de búsqueda la cual redirige a una de las páginas si la encuentra, estás son:
- crud
- home
- poke
- clima
- rickymorty
- 404

