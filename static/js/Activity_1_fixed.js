$(function(){ 
  
  //-----------------------------Dibuja escenario -------------------------------// 

    JXG.Options.text.useMathJax = true;
    var board = JXG.JSXGraph.initBoard('edvi',{
        boundingbox:[-20,60,10,-15], //xmin,ymax,xmax,ymin
        keepaspectratio:true, 
        axis:false,     
        showCopyright:false,
        zoomX:1.2,  
        zoomY:1.2,         
        showNavigation:false,
        needsRegularUpdate: true, 
          fixed: true,
          numberPointsLow:100,
          numberPointsHigh:100, 

        pan: {
          needShift: false,
          needTwoFingers: false,
          enabled: false
        },

        zoom : {
          factorX : 1.5,   
          factorY : 1.5,   
           wheel: false,
        }
      }); 
    
    //-----------------------------Dibuja ejes y fondo del escenario----------------------//
    var ejeY0 = board.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: true,            
      name: '$Height$<br>$\\ \\ \\ (m)$',
      label: {offset: [-70,220]},
      straightFirst:false, 
      straightLast:true,               
      });

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
      name: '$Distance \\ (m)$',
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

    //-----------------------------Dibuja grafica-------------------------------// 
    var graph= JXG.JSXGraph.initBoard('graph',{
          boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
          keepaspectratio:false, 
          axis:false,     
          showCopyright:false,
          showNavigation:false,
          needsRegularUpdate: false, 
            fixed: true,
            numberPointsLow:100,
            numberPointsHigh:300,

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
    
    var ejeY = graph.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: true,            
      name: '$H. Speed$<br>$\\ \\ \\ \\ \\  (m/s)$',        
      label: {offset: [-90,140]},
      drawZero:true,        
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true
          }
    });

    var ejeX = graph.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:false,    
      fixed: true,

      withLabel: true,            
      name: '$Time \\ (s)$',        
      label: {offset: [150,-35]},
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true
          }
      }); 
    board.addChild(graph);
  
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
    
    var pos0=new Vector2D(0,35);    
    var velo0= new Vector2D(20,0);

    var g=9.8;
    var acc= new Vector2D(0,g);          //vector aceleración gravedad
     
    var animTime=100/velo0.x;    
    var vIni=20;                        //Velocidad inicial    
          
    var delay= -4/vIni;
    var k=0.5;
    
    var dropD=50;

    //-------------------------Objeto en caída libre-------------// 
    
    ball = new Ball('00F8BC',1,0);
    ball.pos2D=pos0;
    ball.velo2D=velo0;    
    
    //-------------------------Gráfica Escenario-----------------//         
    
    var particle=board.create('point',[function(){return ball.x},function(){
      return ball.y;      
      }],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:true, labelColor:'black',label: {offset: [5,0]}});

    var target=board.create('arrow',[[50,-9],[50, -3]],{name:' ', color: 'blue', fixed:true});

    var urlHelicopter= "images/helicopter.png";
    var urlCrane= "images/crane.png";

    var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});    
    var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'});         
    
    //--------------------------Gráfica Posición-----------------//
    var curves1 =[];
    var points1 =[];
    var color="black";
    var GraphType="Time vs Horizontal Speed";       
    var selectionX="Time";
    var selectionY="Horizontal Speed";  

    var graficapoint= graph.create('point',[
      function(){
      if (selectionX=="Time") return t;      
      },
      function(){
      if (selectionY=="Horizontal Speed") return ball.vx;      
      if (selectionY=="Horizontal Distance") return ball.x;
    }],
    {name:'', strokeColor:'green', fillColor: 'green', size:2});

    var graphTrace = graph.create('functiongraph', [function(x){
    if (GraphType=="Time vs Horizontal Speed") return ball.vx;
    if (GraphType=="Time vs Horizontal Distance") return ball.vx*x;
    },
    0,
    function(){return t;}],     
    {visible:true,strokeWidth:2,strokeColor: color, highlight:false, frozen: true});


  


    function addCurve(acel,posini,veloini,td){                          
      
      if (GraphType=="Time vs Horizontal Distance"){
          
          graf=graph.create('functiongraph', [function(x){return veloini*x},0,function(){return 100/veloini}], {visible:true,strokeWidth:2,strokeColor: color,highlight:false});
          punt=graph.create('point', [0,0], {
            name: function(){
              if(this.X()>-0.01 && this.X()<0.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*0) +")";
              if(this.X()> 0.99 && this.X()<1.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*1) +")";
              if(this.X()> 1.99 && this.X()<2.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*2) +")";
              if(this.X()> 2.99 && this.X()<3.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*3) +")";
              if(this.X()> 3.99 && this.X()<4.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*4) +")";
              if(this.X()> 4.99 && this.X()<5.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*5) +")";
              if(this.X()> 5.99 && this.X()<6.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*6) +")";                            
              else return "(" + this.X().toFixed(2) + "," + toFixed(veloini*this.X(),2)  + ")";         
            }, 
            attractors: [graf], 
            attractorDistance:0.5, 
            snatchDistance: 2,
            showInfobox: false,
            label: {offset: [0,0],fixed:false},
            strokeColor: color,
            fillColor: color,
          });

          punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});          
          
          curves1.push(graf);
          points1.push(punt);

      }

      if (GraphType=="Time vs Horizontal Speed"){

          
          graf=graph.create('functiongraph', [function(x){return veloini},0,function(){return 100/veloini}], {visible:true,strokeWidth:2,strokeColor: color,highlight:false})
          punt=graph.create('point', [0,veloini], {
            name: function(){
              /*if(this.X()>-0.05 && this.X()<0.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 0.95 && this.X()<1.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 1.95 && this.X()<2.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 2.95 && this.X()<3.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 3.95 && this.X()<4.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 4.95 && this.X()<5.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";
              if(this.X()> 5.95 && this.X()<6.05 ) return "(" + this.X().toFixed(1).toString() + "," + (veloini).toFixed(1).toString() +")";                            
              else*/ 
                return "(" + this.X().toFixed(2).toString() + "," + this.Y().toFixed(2).toString()+ ")";         
            }, 
            attractors: [graf], 
            attractorDistance:0.5, 
            snatchDistance: 2,
            showInfobox: false,
            label: {offset: [-10,20],fixed:false},
            strokeColor: color,
            fillColor: color,
          }); 


          curves1.push(graf);
          points1.push(punt);
          
      }

    };

    function toFixed( number, precision ) {
    var multiplier = Math.pow( 10, precision );
    return Math.round( number * multiplier ) / multiplier;
    };

    //-------------------------Animación--------------------------//
    function play(){
      graficapoint.setAttribute({visible: true});
      graphTrace.setAttribute({visible: true});
      ball.pos2D=pos0;
      t = 0;    
      t0 = new Date().getTime();        
      animFrame();
      color=generarcolor();   
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
      if (t<animTime){            //Detiene la animación cuando se cumple la distancia
        move();
      } else stop();      
    }

    function move(){    
      updatePosition()      
      board.update();
        
    };

    function stop(){      
      cancelAnimationFrame(animId);
      ball.pos2D = new Vector2D(100,pos0.y);                 
      t=animTime;
      //ball.pos2D=pos0;
      addCurve(acc.y,pos0.y,velo0.x);
      graficapoint.setAttribute({visible: false});
      graphTrace.setAttribute({visible: false});
      //  graficapoint.clearTrace();          
      board.update();

    };

    function updatePosition(){                        
        ball.pos2D = pos0.addScaled(velo0,t);
        ball.velo2D = velo0;            
    };

    function generarcolor(){
      long=6;
      var caracteres = "0123456789ABCDEF";
      var color = "";
      for (i=0; i<long; i++) color += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
      color="#"+color;
      return color;
    }

    function round(value,decimals) {
      //return Math.round(value*Math.pow(10, decimals))/Math.pow(10, decimals); 
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
             
    //---------------------Botones-----------------------------------//
    
    $('#StartBtn').click(function() {                     
      play();       
    });

    $('#ResetBtn').click(function() {                 
      reset();
    }); 
    
    function reset() {                  
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);                //vector aceleración gravedad
      animTime=100/velo0.x;
      t=0;
      ball.pos2D=pos0;
      graph.removeObject(curves1);
      graph.removeObject(points1);      
      curves1.length = 0;
      points1.length = 0;
      graphTrace.setAttribute({visible: false});   
      board.update();   
    };

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
    
    $("#sliderH").bind( "change", function(event, ui) {           
      var h0=$(this).val();         //Buscar si se puede converir el valor directamente a un número.      
      $("#spanH").text("Height: " + $(this).val());
      pos0=new Vector2D(0,h0*1);      
      ball.pos2D=pos0;                                        
      t=0;
      animTime=100/velo0.x; ;                 
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      board.update();     
    });

    $("#sliderG").bind( "change", function(event, ui) {           
      g=$(this).val();          //Buscar si se puede converir el valor directamente a un número.            
      $("#spanG").text("Free fall acceleration: " + $(this).val());
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;      
      animTime=100/velo0.x;   //Tiempo de caida mas el recorrido          
      console.log("Gravity: "+ acc.y);
      console.log("Anitime: "+ animTime);
      board.update(); 
    });

    $("#sliderV").bind( "change", function(event, ui) {           
      vIni=$(this).val()*1;         //Buscar si se puede converir el valor directamente a un número.            
      $("#spanV").text("Horizontal Constant Speed: " + $(this).val());
      ball.pos2D=pos0;
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      t=0;                  
      ball.pos2D=pos0;
      animTime=100/velo0.x;   //Tiempo de caida mas el recorrido                        
      console.log("Vini "+vIni);                  
      board.update();   
    });

    $("#sliderD").bind( "change", function(event, ui) {           
      distance=$(this).val();           //Buscar si se puede converir el valor directamente a un número.                  
      dropD=distance*1;
      $("#spanD").text("Distance to drop the crane: " + $(this).val());           
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;            
      animTime=100/velo0.x;   //Tiempo de caida mas el recorrido            
      console.log("DistanceX: "+ dropD);
      console.log("Nuevo Anitime: "+ animTime);
      console.log("estoy moviendo la barra");
      board.update(); 
      
    });

    //--------------------------Dialogo Graph------------------------------
    $('#rtimeY').attr('disabled','disabled').checkboxradio('refresh');
    $('#rHeightX').attr('disabled','disabled').checkboxradio('refresh');
    $("input[type='radio']").bind( "change", function(event, ui) {
      $('#rTimeY').attr('disabled','disabled').checkboxradio('refresh');  
    
    selectionX=$('.sEjeX:checked').val();
    selectionY=$('.sEjeY:checked').val();
    reset();
     
      switch(selectionX) {          
          case "Height":
              $('#rHeightY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');
              ejeX.setAttribute({name: function() { 
              return '$Height \\ (m)$';
            }});              
              break;
          case "Vertical Speed":
             $('#rdioSpdY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');             
              ejeX.setAttribute({name: function() { 
              return '$Vertical \\ Speed \\ (m/s)$';
            }});        
              break;
          case "Vertical Acceleration":
              $('#rdioAccY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdY').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');              
              ejeX.setAttribute({name: function() { 
              return '$Vertical \\ Acceleration \\ (m/s^2)$';
            }});
              break;
          case "Horizontal Acceleration":
              $('#rdioAccYH').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdY').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');              
              ejeX.setAttribute({name: function() { 
              return '$Horizontal \\ Acceleration \\ (m/s^2)$';
            }});
              break;
          case "Horizontal Speed":
              $('#rdioSpdYH').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdY').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');              
              ejeX.setAttribute({name: function() { 
              return '$Horizontal \\ Speed(m/s)$';
            }});
              break;
          case "Horizontal Distance":
              $('#rdioDistanceY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rdioSpdY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rdioAccYH').attr('disabled','disabled').checkboxradio('refresh');
              $('#rdioSpdYH').attr('disabled','disabled').checkboxradio('refresh');
              ejeX.setAttribute({name: function() { 
              return '$Horizontal$<br>$Distance(m)$';
            }});
              break;
          default:
              $('#rtimeY').attr('disabled','disabled').checkboxradio('refresh');
              $('#rdioAccY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdY').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightY').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdYH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceY').removeAttr("disabled").checkboxradio('refresh');
              ejeX.setAttribute({name: function() { 
              return '$Time \\ (s)$';
            }});
              break;
      }

      switch(selectionY) {          
          case "Height":
              $('#rHeightX').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Height$<br>$\\ \\ \\  (m)$';
            }});                                  
              break;
          case "Vertical Speed":
             $('#rdioSpdX').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Vertical$<br>$Speed(m/s)$';
            }});            
              break;
          case "Vertical Acceleration":
              $('#rdioAccX').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Vertical$<br>$Acceleration$<br>$(m/s^2)$';
            }});
              break;
          case "Horizontal Acceleration":
              $('#rdioAccXH').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Horizontal$<br>$Acceleration$<br>$(m/s^2)$';
            }});
              break;
          case "Horizontal Speed":
              $('#rdioSpdXH').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Horizontal$<br>$Speed(m/s)$';
            }});  
              break;
        case "Horizontal Distance":
              $('#rdioDistanceX').attr('disabled','disabled').checkboxradio('refresh');
              $('#rtimeX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Horizontal$<br>$Distance(m)$';
            }});  
              break;              
          default:
              $('#rtimeX').attr('disabled','disabled').checkboxradio('refresh');
              $('#rdioAccX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdX').removeAttr("disabled").checkboxradio('refresh');
              $('#rHeightX').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioAccXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioSpdXH').removeAttr("disabled").checkboxradio('refresh');
              $('#rdioDistanceX').removeAttr("disabled").checkboxradio('refresh');
              ejeY.setAttribute({name: function() { 
              return '$Time \\ (s)$';
            }});
              break;
      }

      GraphType=selectionX+" vs "+selectionY;
      console.log("Grafica tipo: "+ GraphType);
      
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
      if ($('#pwtext').val() != 'speed') {
          $("#pwtext").css("background-color", "#ffff76");
          $("#pwtext").attr("placeholder", "Password required!");
          return false;
      }
     if ($('#pwtext').val() == 'speed') {
          $("#nextAct").css("display", "block");
          return false;
          }
    });

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
        path: 'bundle/Activity1/',
        mode: 'both',
        language: lang,
        callback: function() {
          $("#headerTitle").text(msg_headerTitle);
          $("#headerInstructions .ui-collapsible-heading-toggle").text(msg_headerInstructions);
          $("#pInstructions").text(msg_pInstructions);
          $("#hsTitle").text(msg_hsTitle);
          $("#edviSetHeader").text(msg_edviSetHeader);
          $("#spanH").text(msg_spanH);
          $("#spanV").text(msg_spanV);
          $("#btnClose").text(msg_btnClose);
          $("#graphSetHeader").text(msg_graphSetHeader);
          $("#gsTitle").text(msg_gsTitle);
          $("#axisXHeader").text(msg_axisXHeader);
          $("#lblTime").text(msg_lblTime);
          $("#axisYHeader").text(msg_axisYHeader);
          $("#lblHS").text(msg_lblHS);
          $("#lblHD").text(msg_lblHD);
          $("#btnGClose").text(msg_btnGClose);
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

    
  