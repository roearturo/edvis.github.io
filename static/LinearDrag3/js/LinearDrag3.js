$(function(){  
    
  //-----------------------------Dibuja escenario -------------------------------//   
    JXG.Options.board.minimizeReflow='none'
    var board = JXG.JSXGraph.initBoard('edvi',{
      boundingbox:[-20,100,5,-5], //xmin,ymax,xmax,ymin
      keepaspectratio:true, 
      axis:false,     
      showCopyright:false,
      
      zoomX:1.2,  //En PC y iPad 1.5 es suficiente
      zoomY:1.2,  //En PC y iPad 1.5 es suficiente
      showNavigation:true,
      needsRegularUpdate: true, 
        fixed: true,
        numberPointsLow:100,
        numberPointsHigh:100, 

      pan: {
        needShift: false,
        needTwoFingers: false,
        enabled: true,
      },

      zoom : {
        factorX : 1.5,   
        factorY : 1.5,   
         wheel: false,
      }
    }); 
    
    
    var boardGraphPlot = JXG.JSXGraph.initBoard('graphPlot',{
      //boundingbox:[-10,10,10,-10], //xmin,ymax,xmax,ymin      
      boundingbox:[-1,25,10,-1], //xmin,ymax,xmax,ymin
      keepaspectratio:true, 
      axis:false,      
      showCopyright:false,

      zoomX:1.2,  //En PC y iPad 1.5 es suficiente
      zoomY:1.2,  //En PC y iPad 1.5 es suficiente

      needsRegularUpdate: true, 
        fixed: false,
        numberPointsLow:100,
        numberPointsHigh:100, 

      pan: {
        needShift: false,
        needTwoFingers: false,
        enabled: true
      },

      zoom : {
        factorX : 1.5,   
        factorY : 1.5,   
         wheel: true,
      }
    }); 

    var ejeY = boardGraphPlot.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: true,            
      name: '$(m/s)$',        
      label: {offset: [-45,150]},
      drawZero:true,        
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true
          }
      });

    var ejeX = boardGraphPlot.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:true,    
      fixed: true,

      withLabel: true,            
      name: '$(s)$',        
      label: {offset: [150,-25]},
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true
          }
      }); 
    

    
    var backgroundUrl= "images/background_long.png";
    var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

    //-----------------------------Dibuja grafica Posición-------------------------------// 

  
    //------------------------Variables Animacion----------------//
    var resolucion=0.001; 
    var animId;
    var t=0;
    var t0;
    var dt;
    
    //------------------------Variables de la tabla--------------//
    var dataX=[];
    var dataY=[];
    //------------------------Variables Escenario----------------//
    
    var veloy=0;
    var pos0=new Vector2D(0,25);
    var velo0= new Vector2D(0,veloy);
    
    var g=9.8;
    var acc= new Vector2D(0,g); 

 
    var TiempoVel2=(-veloy-Math.sqrt((veloy*veloy)+2*g*pos0.y))/g;
    var animTime=-TiempoVel2;  
    

    console.log(animTime);
    
  //  var animTime=Math.sqrt(2*pos0.y/acc.y);   

//---------------------PAD----------------------//

 /*   var slopeCopia = new SignaturePad(document.getElementById('copiaGraphDraw'), {
          backgroundColor: 'rgba(255, 255, 255, 0)',
          penColor: 'rgb(0, 0, 0)'
        });*/

    //-------------------------Objeto en caída libre-------------// 
    
    ball = new Ball('00F8BC',1,0);
    ball.pos2D=pos0;
    ball.velo2D=velo0; 

    points=[];

    
    //-------------------------Gráfica Escenario-----------------//         
    
    var particle=board.create('point',[function(){return ball.x},function(){
      return ball.y;      
      }],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:false, labelColor:'black',label: {offset: [5,0]}});


    var urlHelicopter= "images/helicopter.png";//Imagen y etiquetas del auto    
    var urlCrane= "images/crane.png";//Imagen y etiquetas del auto    

    var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});    
    var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'});         
    

    //-------------------------Animación--------------------------//
    function play(){
      ball.pos2D=pos0;
      t = 0;
      t0 = new Date().getTime();
      animFrame();    
    };

    function animFrame(){
      animId=requestAnimationFrame(animFrame,board);
      onEachStep();
    };
        
    function onEachStep(){
      var t1 = new Date().getTime(); 
      dt = (t1-t0)*resolucion; 
      t0 = t1;
      if (dt>0.2) {dt=0;};                
      t += dt;          
      if (t<animTime){            //Detiene la animación cuando se cumple el tiempo
        move();
      } else stop();      
    }


    function move(){    
      updatePosition();      
      board.update();
    }

    function stop(){      
      cancelAnimationFrame(animId);     
      ball.pos2D = new Vector2D(0,0);
      ball.velo2D=new Vector2D(0,acc.y*(animTime));  
      t=animTime; 
      board.update();
      //generaTabla();
                
    };

    function updatePosition(){                  
      ball.pos2D = pos0.addScaled(velo0,t).addScaled(acc,-0.5*t*t);   
      ball.velo2D = velo0.addScaled(acc,t);  
      
    };

    
    function generarcolor(){
      var colores=["#C39BD3","#7FB3D5","#76D7C4","#7DCEA0","#F8C471","#F0B27A","#239B56","#EC7063","#99A3A4"];
      var randomNumber= Math.floor(Math.random() * colores.length);
      return colores[randomNumber];
    }


    function reset() {                  
      ball.pos2D=pos0;      
      velo0= new Vector2D(0,veloy);
      acc= new Vector2D(0,g);                //vector aceleración gravedad
      
      TiempoVel2=(-veloy-Math.sqrt((veloy*veloy)+2*g*pos0.y))/g;
      animTime=-TiempoVel2; 

      t=0;
      ball.pos2D=pos0;     
      board.update();   
    };

    //-------------------Ecuacion Diferencial-----------------------------//
    var P = boardGraphPlot.create('point',[0,1], {name:'P',visible:false});
    var N=10;
    var g;
    function f(t, x) {
           return [9.8-0.5*x];
    }
    
    function ode() {
       return JXG.Math.Numerics.rungeKutta('heun', [P.Y()], [P.X(), P.X()+N], 200, f);
    }

    function plotFunction() {
        g = boardGraphPlot.create('curve', [[0],[0]], {strokeColor:'red', strokeWidth:'2', visible:false});
        g.updateDataArray = function() {
            var data = ode();
            var h = N/200;
            this.dataX = [];
            this.dataY = [];
            for(var i=0; i<data.length; i++) {
                this.dataX[i] = P.X()+i*h;
                this.dataY[i] = data[i][0];
            }
        };
    }
 

    //---------------------Botones EDVI-----------------------------------//
    
    $('#PlayBtn').click(function() {                     
      play();       
    });

    $('#resetBtn').click(function() {
      reset();
    }); 

    //---------------------Botones Tabla Grafica---------------------------------//    
    $('#resetGraphBtn').click(function() {
      boardGraphPlot.removeObject(tablePoints);
      tablePoints.length = 0;
    }); 


    //----------------------Grid-------------------------------//
    
    generaTabla();  

    //--------------------Crea tabla---------------------------//
    
    
    $('#TableBtn').click(function() {     
      generaTabla();
    });
    
    var rowTable=0;
    var samples=animTime/20;
    var samplesOffset=0;

    
    function generaTabla(){
      colorTablaPuntos=generarcolor();
      
      for (var i=0; i<=21; i=i+3) {
        for (var j = 0; j <=20 ; j=j+3) {
          var table = document.getElementById("tabulacionTable");
          var row = table.insertRow(rowTable);
          $(row).css('background', "#CEE3F6");
          var cell1 = row.insertCell(0);
          var cell2 = row.insertCell(1);
          var cell3 = row.insertCell(2);
          cell1.innerHTML = j;
          cell2.innerHTML = i;
          //cell3.innerHTML = " ";  
          cell3.innerHTML = (9.8-0.5*i).toFixed(2);  
        }

      }
      $('#tabulacionTable').editableTableWidget();

    }    
 

    $('#TableReset').on('click', function() {
      $('#tabulacionTable').remove();
      $('#tableResetBtn').remove();
      dataTable="";
    });

    $('table td').on('change', function(evt, newValue) {
      ploteaPuntos();
      
    });

//--------------Plot slopes---------------//
    var tablePoints=[];
    var tableSegments=[];

    function ploteaPuntos(){
      boardGraphPlot.removeObject(tablePoints);
      tablePoints.length = 0;
      boardGraphPlot.removeObject(tableSegments);
      tableSegments.length = 0;
      board.update();   
      
      var table = document.getElementById("tabulacionTable"); 
      var totalRows = document.getElementById("tabulacionTable").rows.length;
      var totalCol = 1;

      var length=1;


      for (var i = 1; i < totalRows; i++)
          { 
            m=parseFloat(table.rows[i].cells[2].innerHTML);
            tetha=Math.atan(m);

            tablePoints.push(boardGraphPlot.create('point',
              [parseFloat(table.rows[i].cells[0].innerHTML),
               parseFloat(table.rows[i].cells[1].innerHTML)],
               {fixed: true, color:'#85C1E9', name:""})
            );


            tablePoints.push(
            boardGraphPlot.create('segment', [
              [parseFloat(table.rows[i].cells[0].innerHTML)+length*Math.cos(tetha),parseFloat(table.rows[i].cells[1].innerHTML)+length*Math.sin(tetha)],
              [parseFloat(table.rows[i].cells[0].innerHTML)-length*Math.cos(tetha),parseFloat(table.rows[i].cells[1].innerHTML)-length*Math.sin(tetha)]
            ], {fixed: true, color:"#1A5276"})
            );
          }
          plotFunction();
         
    }




    //------------Copia------------//
    var slopeCopia;
    var repetido=false;
    $('#copiarBtn').click(function() {
        if(!repetido){
          var GraphDraw="<div id='panelDraw' class='wrapper' style='margin: 0 auto; text-align: center; width:90%'>"
          GraphDraw+="<div id='copiaGraph'></div>"
          GraphDraw+="<canvas id='copiaGraphDraw' class='signature-pad' height=353 width=650></canvas>"
          GraphDraw+="</div>"
          GraphDraw+="<div class='btn-group inline btn-group-justified' style='margin: 0 auto; text-align: center; width:90%' >"
          GraphDraw+="<a id='clrBtn' class='btn btn-success' role='button'>Borrar</a>"
          GraphDraw+="</div>" 
          repetido=true; 
        }

        /*GraphDraw+="<button id='clrBtn' type='button' class='btn btn-success btn-lg btn-block'>Borra</button>"   */

      $('#GraphDraw').append(GraphDraw);
         
      slopeCopia = new SignaturePad(document.getElementById('copiaGraphDraw'), {
            minWidth: 2,
            maxWidth: 2,
            backgroundColor: 'rgba(255, 255, 255, 0)',
            penColor: 'rgb(190, 129, 247)'
          });    



      var svg = new XMLSerializer().serializeToString(boardGraphPlot.renderer.svgRoot);
      var copiaGraph = document.getElementById("copiaGraph");
      copiaGraph.innerHTML = svg;
      console.log(svg);
    });

    //------------Limpia copia--------//
   $('#GraphDraw').on('click', '#clrBtn', function(){
      slopeCopia.clear();
    });

   $('#revealBtn').click(function(){
      
      //if((pos0.y==1)&&(veloy=-10)){
         P.setAttribute({
          visible: true
         });

        g.setAttribute({
            visible: true
        });
     //}
     //else alert("    (ಠ__ಠ)   Trampa. De la onomat. tramp, gemela de trap. 6. f. Contravención disimulada a una ley, convenio o regla, o manera de eludirla, con miras al provecho propio.       ¡No hagas trampa!");

         
   });


    //-------------Dibuja sobre----------------//

    
    
    //------------Recupera el valor de los sliders------------------//
    
    $("#sliderH").bind( "change", function(event, ui) {           
      var h0=$(this).val();          
      $("#spanH").text("Height: " + $(this).val());
      pos0=new Vector2D(0,h0*1);      
      ball.pos2D=pos0;                                        
      t=0;
      
      TiempoVel2=(-veloy-Math.sqrt((veloy*veloy)+2*g*pos0.y))/g;
      animTime=-TiempoVel2;

      velo0= new Vector2D(0,veloy);
      acc= new Vector2D(0,g);      
      board.update();     
    });

    $("#sliderG").bind( "change", function(event, ui) {           
      g=$(this).val();           
      $("#spanG").text("Acceleration: " + $(this).val());
      velo0= new Vector2D(0,veloy);
      acc= new Vector2D(0,g*1);
      ball.pos2D=pos0;            
      
      t=0;      
      
      TiempoVel2=(-veloy-Math.sqrt((veloy*veloy)+2*g*pos0.y))/g;
      animTime=-TiempoVel2;
      
      console.log("Gravity: "+ acc.y);
      console.log("Anitime: "+ animTime);
      board.update(); 
    });


    $("#sliderV").bind( "change", function(event, ui) { 
      veloy=$(this).val();
      veloy=1*veloy;           
      $("#spanV").text("Vertical constant speed: " + $(this).val());
      velo0= new Vector2D(0,veloy);
      acc= new Vector2D(0,g);
      ball.pos2D=pos0;            
      
      t=0;      
      
      TiempoVel2=(-veloy-Math.sqrt((veloy*veloy)+2*g*pos0.y))/g;
      animTime=-TiempoVel2;
      
      console.log("Gravity: "+ acc.y);
      console.log("Anitime: "+ animTime);
      board.update();          
     
    });    


    //--------------------------Dialogo Graph------------------------------

    $(document).ready(function() {
                loadBundles($.i18n.browserLang());
                // configure language combo box
                $('#lang').change(function() {
                    var selection = $('#lang option:selected').val();
                    loadBundles(selection !== 'browser' ? selection : $.i18n.browserLang());
                });
            });

    function loadBundles(lang) {
      $.i18n.properties({
        name: 'Messages',
        path: 'bundle/Fase_2/',
        mode: 'both',
        language: lang,
        callback: function() {
          $("#headerTitle").text(msg_headerTitle);
          $("#headerInstructions .ui-collapsible-heading-toggle").text(msg_headerInstructions);
          $("#pInstructions_1").text(msg_pInstructions_1);
    
          $("#hsTitle").text(msg_hsTitle);
          $("#edviSetHeader").text(msg_edviSetHeader);
          $("#spanH").text(msg_spanH);
          $("#edviSetClose").text(msg_edviSetClose);

          
          $("#startBtn").text(msg_startBtn);
          $("#resetBtn").text(msg_resetBtn);
          $("#passTitle .ui-collapsible-heading-toggle").text(msg_passTitle);
          $("#passInstructions").text(msg_passInstructions);
          $("#btnNexAct").text(msg_btnNexAct);          
        
            }          
          });
      }


//--Plotea--//
var tablePoints=[];
 
$('#ploteaBtn').click(function() {
   
    for (var i = 0; i < points.length; i++)
        { 
          tablePoints.push(boardGraphPlot.create('point',
            [points[i].X,points[i].Y],  
            {color: points[i].color, name:"", })
             
          );
        }

});
      

 

});

    
  