$(function(){ 
  
  //-----------------------------Dibuja escenario -------------------------------// 
JXG.Options.board.minimizeReflow = 'none';         

var board = JXG.JSXGraph.initBoard('edvi',{
      boundingbox:[-10,60,10,-15], //xmin,ymax,xmax,ymin
      keepaspectratio:true, 
      axis:false,     
      showCopyright:false,

      zoomX:1.1,  //En PC y iPad 1.5 es suficiente
      zoomY:1.1,  //En PC y iPad 1.5 es suficiente
      showNavigation:true,
      needsRegularUpdate: true, 
        fixed: true,
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
         wheel: false,
      }
    }); 
    
      var ejeY0 = board.create('axis', [[0,0], [0,1]], {
        doAdvancedPlot:false, 
        needsRegularUpdate: false, 
        fixed: true, 
        withLabel: false,            
        
        
        straightFirst:false, 
        straightLast:true,               
    });
var ejeYLbl = board.create('text', [-10,30,'$altura$\\ \\ \\ \\$(m)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

        ejeY0.removeAllTicks();   
        board.create('ticks', [ejeY0, 10], { // The number here is the distance between Major ticks     
            majorHeight:5, // Need this because the JXG.Options one doesn't apply
            drawLabels:true, // Needed, and only works for equidistant ticks
            label: {offset: [-20, -1]},
            minorTicks:1, // The NUMBER of small ticks between each Major tick
            drawZero:false,
            doAdvancedPlot:false, 
            needsRegularUpdate: false,
           }
        );

    var ejeX0 = board.create('axis', [[0,0], [1,0]], {
        doAdvancedPlot:false, 
        needsRegularUpdate: false, 
        drawZero:true,    
        fixed: true,
        withLabel: true,            
        name: '$distancia \\ (m)$',
        label: {offset: [280,-30]},
        straightFirst:false, 
        straightLast:true, 
      }); 
    
      ejeX0.removeAllTicks();   
      board.create('ticks', [ejeX0, 10], { // The number here is the distance between Major ticks     
          //strokeColor:'#BBBBBB',
          majorHeight:5, // Need this because the JXG.Options one doesn't apply
          drawLabels:true, // Needed, and only works for equidistant ticks
          label: {offset: [-8, -10]},
          minorTicks:1, // The NUMBER of small ticks between each Major tick
          drawZero:true,
          doAdvancedPlot:false, 
          needsRegularUpdate: false,
       }
      );

    var backgroundUrl= "images/background_long.png";
    var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

    var campUrl= "images/treeHouse.png";
    var campImg=board.create('image',[campUrl,[50,0],[10,10]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

  
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
    
    var pos0=new Vector2D(0,25);
    var pos1=new Vector2D(0,25);
    
    var velo0= new Vector2D(10,0);
    var velo1= new Vector2D(8,0);
    var velo2= new Vector2D(0,0);
    
    var g=9.8;
    var acc= new Vector2D(0,g);                //vector aceleración gravedad
    
    var tDrop=1;                       //Tiempo para soltar la cajita
    var animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;   
    
    var vIni=10;                        //Velocidad inicial    
          

    var delay= -4/vIni;
    var k=0.5;
    
    var dropD=10;

    //-------------------------Objeto en caída libre-------------// 
    
    ball = new Ball('00F8BC',1,0);
    ball.pos2D=pos0;
    ball.velo2D=velo0;    
    
    //-------------------------Gráfica Escenario-----------------//         
    
    var particle=board.create('point',[function(){return ball.x},function(){
      return ball.y;      
      }],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:true, labelColor:'black', label: {offset: [6.5,10]}});
    var target=board.create('point',[50,0],{name:' ', face:'x', size:8, color: 'black'});

    var urlHelicopter= "images/helicopter.png";//Imagen y etiquetas del auto    
    var urlCrane= "images/crane.png";//Imagen y etiquetas del auto    

    var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});    
    var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'});         
    
    //-------------------------Animación--------------------------//
    function play(){
      if(vIni>0 && tDrop==0) { 
        ball.pos2D=new Vector2D(-4,pos0.y); 
        t= -4/vIni;
      }
      else {
        ball.pos2D=pos0;
        t = 0;
      }
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
      updatePosition()      
      board.update();
      console.log(t,ball.y);      
    };

    function stop(){      
      cancelAnimationFrame(animId);     
      ball.pos2D = new Vector2D(dropD+vIni*Math.sqrt(2*pos0.y/acc.y),0);
      if (vIni==0) {ball.velo2D=new Vector2D(animTime,acc.y*animTime);}
      if (vIni>0) {ball.velo2D=new Vector2D(animTime,acc.y*(animTime-tDrop));}      
      t=animTime;     
      board.update();     
                
    };

    function updatePosition(){                  
       if(vIni!=0){
        if (ball.x<dropD){
        ball.pos2D = pos0.addScaled(velo0,t);
        ball.velo2D = velo0;
        dataX.push(t.toFixed(2));     
        dataY.push(ball.pos2D.y.toFixed(2));        
        }     
        else{       
          ball.pos2D = pos0.addScaled(velo0,(t-tDrop)).addScaled(acc,-0.5*(t-tDrop)*(t-tDrop)).add(new Vector2D(dropD,0));      
          ball.velo2D = velo0.addScaled(acc,(t-tDrop));
          dataX.push(t.toFixed(2));     
          dataY.push(ball.pos2D.y.toFixed(2));        
        }
       }
       if (vIni==0){
        if (ball.x<dropD){
        ball.pos2D = pos0.addScaled(velo1,t);
        ball.velo2D = velo1;
        dataX.push(t.toFixed(2));     
        dataY.push(ball.pos2D.y.toFixed(2));        
        }     
        else{       
          ball.pos2D = pos0.addScaled(velo2,(t-tDrop)).addScaled(acc,-0.5*(t-tDrop)*(t-tDrop)).add(new Vector2D(dropD,0));      
          ball.velo2D = velo2.addScaled(acc,(t-tDrop));
          dataX.push(t.toFixed(2));     
          dataY.push(ball.pos2D.y.toFixed(2));        
        }
        
        }   
      
    };

        $('#tabulacionTable').editableTableWidget();        
    //---------------------Botones-----------------------------------//
    
    $('#StartBtn').click(function() {               
      
      play();       
    });

    $('#ResetBtn').click(function() {                 
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);                //vector aceleración gravedad
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;
      t=0;
      ball.pos2D=pos0;      
      board.update();   
    }); 
    

    $('#TableBtn').click(function() { 
    var dataTable= "<table data-role='table' overflow-y:'auto' class='ui-responsive ui-shadow' id='myTable' style='width:90%;display:block;margin-left:auto;margin-right:auto;'><thead><tr><th>Time (s)</th><th>Position (m)</th></tr></thead>";        
      for (var i=0; i<=dataX.length; i++) {                 
          dataTable+="<tbody><tr><td>" + dataX[i] + "</td><td>" + dataY[i] + "</td></tr>";
        } 
      $('#panelTabla').append(dataTable);   
      dataTable+= "</tbody></table>";
      $('#panelData').panel("open");        
    });
    
    //------------Recupera el valor de los sliders------------------//
    
    $("#sliderH").bind( "input change", function(event, ui) {           
      var h0=$(this).val();         //Buscar si se puede converir el valor directamente a un número.      
      $("#spanH").text($(this).val());
      pos0=new Vector2D(0,h0*1);      
      ball.pos2D=pos0;                                        
      t=0;
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;                 
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      board.update();     
    });

    $("#sliderG").bind( "input change", function(event, ui) {           
      g=$(this).val();          //Buscar si se puede converir el valor directamente a un número.            
      $("#spanG").text("Free fall acceleration: " + $(this).val());
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;      
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;   //Tiempo de caida mas el recorrido          
      console.log("Gravity: "+ acc.y);
      console.log("Anitime: "+ animTime);
      board.update(); 
    });

    $("#sliderV").bind( "input change", function(event, ui) {           
      vIni=$(this).val()*1;         //Buscar si se puede converir el valor directamente a un número.            
      $("#spanV").text($(this).val());      
      ball.pos2D=pos0;
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      t=0;      
            
      if(dropD>0 && vIni>0)
        tDrop=dropD/vIni;     
      else tDrop=0;

      if(dropD>0 && vIni==0) {
        
        tDrop=dropD/8;              
      }
        
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;   //Tiempo de caida mas el recorrido                        
      console.log("Vini "+vIni);                  
      board.update();   
    });

    $("#sliderD").bind( "input change", function(event, ui) {           
      distance=$(this).val();           //Buscar si se puede converir el valor directamente a un número.                  
      dropD=distance*1;
      $("#spanD").text($(this).val());            
      if(dropD>0 && vIni>0)
        tDrop=dropD/vIni;
      else tDrop=0;
                  
      if(dropD>0 && vIni==0) {
        
        tDrop=dropD/8;
      }

      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;            
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;   //Tiempo de caida mas el recorrido  
            
      console.log("DistanceX: "+ dropD);
      console.log("Nuevo DropTime: "+ tDrop);
      console.log("Nuevo Anitime: "+ animTime);
      
      board.update(); 
      
    });

    //------------------------Validación------------------------------

    $("#login").submit(function() {
 
      var emptyFields = $(":input.required").filter(function() {            
          return !$.trim(this.value).length;
      });
     
      if(emptyFields.length) {        
            $("#pwtext").css("background-color", "#ffff76");
            $("#pwtext").attr("placeholder", "Password required!");
          return false;
      }
      if ($('#pwtext').val() != 'distance') {
          $("#pwtext").css("background-color", "#ffff76");
          $("#pwtext").attr("placeholder", "Password required!");
          return false;
      }
      if ($('#pwtext').val() == 'distance') {
           $("#nextAct").css("display", "block");
          //<input type="submit" data-ajax="true"  id="passBtn"/>

          return false;
      }
  });

    $(document).ready(function() {
      loadBundles($.i18n.browserLang());
      // configure language combo box
      $(".dropdown-menu li a").click(function(){
      var selection = $(this).text();
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selection+' <span class="caret"></span>');
      console.log(selection);
      loadBundles(selection !== 'browser' ? selection : $.i18n.browserLang());
        });
      
    });

    function loadBundles(lang) {
      $.i18n.properties({
        name: 'Messages',
        path: 'bundle/Activity3/',
        mode: 'both',
        language: lang,
        callback: function() {
          $("#headerTitle").text(msg_headerTitle);
          $("#headerInstructions .ui-collapsible-heading-toggle").text(msg_headerInstructions);
          $("#pInstructions").text(msg_pInstructions);
          $("#hsTitle .ui-collapsible-heading-toggle").text(msg_hsTitle);
          $("#edviSetHeader").text(msg_edviSetHeader);
          $("#lblH").text(msg_spanH);
          $("#lblV").text(msg_spanV);
          $("#lblD").text(msg_spanD);          
          $("#StartBtn").text(msg_StartBtn);
          $("#ResetBtn").text(msg_ResetBtn);
          $("#passTitle .ui-collapsible-heading-toggle").text(msg_passTitle);
          $("#passInstructions").text(msg_passInstructions);
          $("#btnNexAct").text(msg_btnNexAct);          
          
          ejeX0.setAttribute({name: function() { 
                        return msg_ejeX0;
                      }});
          ejeY0.setAttribute({name: function() { 
                        return msg_ejeY0;
                      }});
/*           $("#pAbout").text(msg_pAbout);
          

         ejeX.setAttribute({name: function() { 
                        return msg_ejeX;
                      }});
          ejeY.setAttribute({name: function() { 
                        return msg_ejeY;
                      }});*/

            }          
          });
      }


});

    
  