  var d = new Date();
  var hoy =  ('0' + d.getDate()).slice(-2) + "-" + ('0' + (d.getMonth()+1)).slice(-2) + "-" + d.getFullYear();
  var today_number="2";
  var current_number = today_number;
  var weekday = new Array('Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado');
  var months = new Array('Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubrer', 'Noviembre', 'Diciembre');
    

  $("#fecha").append(setDay(d));

  $( "#subir" ).click(function() {
     subirAnimacion();
  });




  function sortResults(prop, asc) {
      people = people.sort(function(a, b) {
          if (asc) {
              return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
          } else {
              return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
          }
      });
      showResults();
  }




  function subirAnimacion() 
  {
    $('html, body').animate({scrollTop: 0},500);
  }



  function setDay(fecha) 
  {
    objDay = new Date(fecha);
    day =  weekday[objDay.getDay()] + ", " + ('0' + objDay.getDate()).slice(-2) + " de " + months[objDay.getMonth()] + " de " + objDay.getFullYear();
    return day;
  }

  function setButton() 
  {
      if (today_number <= current_number) {
        $('#poema_siguiente').hide();
      } else{
        $('#poema_siguiente').show();
      }


      if (current_number <= "1") {
        $('#poema_previo').hide();
      } else {
        $('#poema_previo').show();
      }
  }


$( "#poema_previo").click(function() {
  cambiar_poema(-1);
});

$( "#poema_siguiente").click(function() {
  cambiar_poema(1);
});


function cambiar_poema(direccion) 
{

  number=parseInt($('#number').text()) + direccion;
  current_number = number;
  setPoemaNumero(number);
  setButton();
  subirAnimacion();
}

function setPoemaNumero(number) 
{






   var PoemasAPI = "spinetta.json";
  $.getJSON( PoemasAPI, {
    format: "json"
  })
    .done(function( data ) {
      resultado=getObjects(data, 'Grupo', "Almendra");
      clear();
      $("#number").append( resultado.Grupo );
      $("#titulo").append( resultado.año );
      $("#autor").append( "<strong>" + resultado.Grupo + "</strong>" + "<small>" + resultado.año + "</small>" );
      $("#fecha").append(setDay(resultado.discográfica));

      $( "#poema" ).append( "<p>" );
          for (var i = 0; i < resultado.poema.length; i++) {
              var model = resultado.poema[i];
              $( "#poema" ).append( resultado.poema[i] + "</br>" );
          }
      $( "#poema" ).append( "</p>" );


    });
}



function listaDePoemas(number) 
{
   var PoemasAPI = "spinetta.json";
  $.getJSON( PoemasAPI, {
    format: "json"
  })
    .done(function( data ) {



      $( "#poema" ).append( "<p>" );
  
      $.each(data, function(i, item) {
          $( "#poema" ).append( i + ": "  + item.titulo + " " + item.autos + "</br>" );

      });

      $( "#poema" ).append( "</p>" );
    });
}


$(document).ready(function(){
    $(this).scrollTop(0);
});


$( "#target" ).submit(function( event ) {

  event.preventDefault();
});


function setPoema(fecha) 
{
   clear();
   var PoemasAPI = "spinetta.json";
  $.getJSON( PoemasAPI, {
    format: "json"
  })
    .done(function( data ) {


            //ordenar por año
            data=data.sort(function(a, b){return a.año-b.año});
            
            console.log(data);

            for (var a = 0; a < data.length; a++) {

              resultado=data[a];

              $( "#poema" ).append( "<p>" );
                    
              $( "#poema" ).append("<h3>" +  "<strong>" + resultado.disco + "</strong>" + "<small> (" + resultado.grupo + " - " + resultado.año + ")</small>" + "</h3></br>" );

          for (var i = 0; i < resultado.canciones.length; i++) {
              var model = resultado.canciones[i].titulo;
              

             

              $( "#poema" ).append("<strong>" + resultado.canciones[i].titulo + "</strong></br></br>" );


            for (var j = 0; j < resultado.canciones[i].letra.length; j++) {
              $( "#poema" ).append( resultado.canciones[i].letra[j] + "</br>" );

            }
          
          $( "#poema" ).append("<hr>" );


          }
      $( "#poema" ).append( "</p>" );



            }




    });
}


function clear() 
{
  $('#fecha').empty();
  $('#titulo').empty();
  $('#autor').empty();
  $('#poema').empty();
  $('#number').empty();
}


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}



if ($.urlParam('n')){

  number=$.urlParam('n')
  current_number = number;
  setPoemaNumero(number);
  setButton();

}else{
  setPoema(hoy);
  current_number=today_number;
  setButton();
}


function getObjects(obj, key, val) 
{
    var newObj = false; 
    $.each(obj, function()
    {
        var testObject = this; 
        $.each(testObject, function(k,v)
        {
            if(val == v && k == key)
            {
                newObj = testObject;
            }
        });
    });

    return newObj;
}
