
$(function(){

$("#Actividad_1").keypress(function(e) {//Para deshabilitar el uso de la tecla "Enter"
        if (e.which == 13) {
        return false;
        }
});
   
    var data_1;
    var data_2;


    var SketchPad_1 = new SignaturePad(document.getElementById('SketchPad1'), {
        minWidth: 2,
        maxWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(190, 129, 247)'
       
    });

    var SketchPad_2 = new SignaturePad(document.getElementById('SketchPad2'), {
        minWidth: 2,
        maxWidth: 2,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(190, 129, 247)'
       
    });

    $("#clrBtn1").click(function(){
        SketchPad_1.clear();
    })
    $("#clrBtn2").click(function(){
        SketchPad_2.clear();
    })
/*    $("#saveBtn").click(function(){
        data_1 = SketchPad_1.toDataURL('image/png');
        data_2 = SketchPad_2.toDataURL('image/png');
    })*/



// Variable to hold request
var request;

// Bind to the submit event of our form
$("#ideasPrevias").submit(function(event){
    data_1 = SketchPad_1.toDataURL('image/png');
    data_2 = SketchPad_2.toDataURL('image/png');

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
    serializedData=serializedData+"&Sketch_1="+data_1+"&Sketch_2="+data_2;
	console.log(serializedData);
    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    //Reemplazar " " por + para reconocer la imagen 
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwEXM8RzVjYeYFZImBxTJC65gmzSVaFWwvEfevFMzhpH6iP-s1Q/exec",
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