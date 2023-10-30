
$(function(){

$("#Actividad_1").keypress(function(e) {//Para deshabilitar el uso de la tecla "Enter"
        if (e.which == 13) {
        return false;
        }
});


   
 
// Variable to hold request
var request;

// Bind to the submit event of our form
$("#Actividad_1").submit(function(event){
    var dataArr = [];
    $("td").each(function(){
        dataArr.push($(this).html());
    });
    console.log(dataArr);
   
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea, canvas");

    // Serialize the data in the form
    var serializedData = $form.serialize();    
    serializedData=serializedData+"&Tabla="+dataArr+"&Cuanta ayuda="+cuantaAyuda;
	console.log(serializedData);
    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    //Reemplazar " " por + para reconocer la imagen 
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycby2hHRhs0EILRqwNe69cOMhRgloUivSeIh9v6eN6YWnSqpcrCc/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        alert("¡El envio de tus respuestas fue correcto!");
        console.log("Hooray, it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
        $("#btnNexAct").show();
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        alert("Hubo problemas al enviar tus respuestas, intenta de nuevo!");
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

    // Prevent default posting of form
    event.preventDefault();
});

});