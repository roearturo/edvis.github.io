var cuantaAyuda=[];
jQuery(function( $ ) {	

  JXG.Options.board.minimizeReflow='none'   
  //-----------------------------Dibuja escenario -------------------------------// 

    JXG.Options.text.useMathJax = true;
    var board = JXG.JSXGraph.initBoard('edvi',{
        boundingbox:[-10,60,20,-15], //xmin,ymax,xmax,ymin
        keepaspectratio:true, 
        axis:false,     
        showCopyright:false,
        showNavigation:true,
        zoomX:1.1,  
        zoomY:1.1,         
        showNavigation:false,
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
          showNavigation:true,
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
            wheel: false,
          }
    });
    
    var ejeY = graph.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: false,            
      drawZero:true,        
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-20, -1]},
          }
    });
    var ejeYLbl = graph.create('text', [-2,30,'$desplazamiento$\\ \\ \\ \\$(m)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

    var ejeX = graph.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:false,    
      fixed: true,
      withLabel: true,            
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-3, -15]}
          }
      });
    var ejeXLbl = graph.create('text', [4,-10,'$tiempo$\\ \\ \\ \\$(s)$']); 
    board.addChild(graph);

//----------------------------boardGraphPlot-------------------------//

    var boardGraphPlot = JXG.JSXGraph.initBoard('graphPlot',{
      boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
      keepaspectratio:false, 
      axis:false,      
      showCopyright:false,
      showNavigation:true,

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
         wheel: false,
      }
    }); 

    var ejeY1 = boardGraphPlot.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: false,               
      drawZero:true,        
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-20, -1]}, 
          }
    });
    var ejeY1Lbl = boardGraphPlot.create('text', [-2,30,'$desplazamiento$\\ \\ \\ \\$(m)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

    var ejeX1 = boardGraphPlot.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:false,    
      fixed: true,
      withLabel: false,            
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-3, -15]},
          }
      });
    var ejeX1Lbl = boardGraphPlot.create('text', [4,-10,'$tiempo$\\ \\ \\ \\$(s)$']);

    //-----------------------------Graphplothelp------------------//
    var graphPlotHelp;
    $('#myModal').on('shown.bs.modal', function() {
          graphPlotHelp = JXG.JSXGraph.initBoard('graphPlotHelp',{
          boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
          keepaspectratio:false, 
          axis:false,      
          showCopyright:false,
          showNavigation:true,

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
             wheel: false,
          }
        }); 

        var ejeY2 = graphPlotHelp.create('axis', [[0,0], [0,1]], {
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true, 
          withLabel: false,               
          drawZero:true,        
          ticks:{
              doAdvancedPlot:false, 
              needsRegularUpdate: false, 
              fixed: true,
              label: {offset: [-20, -1]}, 
              }
        });
        var ejeY2Lbl = graphPlotHelp.create('text', [-2,30,'Desplazamiento (m)'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

        var ejeX2 = graphPlotHelp.create('axis', [[0,0], [1,0]], {
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          drawZero:false,    
          fixed: true,
          withLabel: false,            
          ticks:{
              doAdvancedPlot:false, 
              needsRegularUpdate: false, 
              fixed: true,
              label: {offset: [-3, -15]},
              }
          });
        var ejeX2Lbl = graphPlotHelp.create('text', [4,-9,'tiempo (s)']);

    });
  
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
    var velo0= new Vector2D(25,0);

    var g=9.8;
    var acc= new Vector2D(0,g);          //vector aceleración gravedad
     
    var animTime=90/velo0.x;    
    var vIni=20;                        //Velocidad inicial    
          
    var delay= -4/vIni;
    var k=0.5;
    
    var dropD=50;

    //-------------------------Objeto en caída libre-------------// 
    
    ball = new Ball('00F8BC',1,0);
    ball.pos2D=pos0;
    ball.velo2D=velo0;    
    
             
    var v_t=ball.mass*acc.y/k;
    var tao=ball.mass/k;    
    
    var pos= function(x) {
      return pos0.y-(v_t*x+velo0.y*tao*(1-Math.exp(-x/tao))+v_t*tao*(Math.exp(-x/tao)-1));
    };

    var vel= function(x) {
      return velo0.y*Math.exp(-x/tao)+v_t*(1-Math.exp(-x/tao));
    };
  
    //animTime = JXG.Math.Numerics.fzero(pos,[0.4,20]);   
    console.log("tiempo final:" + animTime);
    //-------------------------Escenario-----------------//         
    
    var particle=board.create('point',[function(){return ball.x},function(){
      return ball.y;      
      }],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:true, labelColor:'black',label: {offset: [5,0]}});

    var target=board.create('arrow',[[50,-9],[50, -3]],{color: 'blue', fixed:true});
    var txtTarget = board.create('text',[43,-6,"$50 m$"]);

    var urlHelicopter= "images/helicopter.png";
    var urlCrane= "images/crane.png";

    var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});    
    var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'});         
    

    //--------------------------Gráfica-----------------//
    var curves1 =[];
    var points1 =[];
    var areas1  =[];
    
    var color="black";
    var GraphType="Time vs Horizontal Distance";       
    var Xselected="Time";
    var Yselected="Horizontal Distance";  

    var graficapoint= graph.create('point',[
      function(){
      if (Xselected=="Time") return t;      
      },
      function(){
      if (Yselected=="Horizontal Speed") return ball.vx;      
      if (Yselected=="Horizontal Distance") return ball.x;
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
          color=generarcolor();
          graf=graph.create('functiongraph', [function(x){return veloini*x},0,function(){return 90/veloini}], {visible:true,strokeWidth:2,strokeColor: color,highlight:false});
          punt=graph.create('point', [0,0], {
            name: function(){
              if(this.X()>-0.01 && this.X()<0.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*0) +")";
              if(this.X()> 0.99 && this.X()<1.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*1) +")";
              if(this.X()> 1.99 && this.X()<2.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*2) +")";
              if(this.X()> 2.99 && this.X()<3.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*3) +")";
              if(this.X()> 3.99 && this.X()<4.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*4) +")";
              if(this.X()> 4.99 && this.X()<5.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*5) +")";
              if(this.X()> 5.99 && this.X()<6.01 ) return "(" + this.X().toFixed(2)+ "," + (veloini.toFixed(2)*6) +")";                            
              else return "(" + toFixed(this.X(),2) + "," + toFixed(veloini*this.X(),2)  + ")";         
            }, 
            attractors: [graf], 
            attractorDistance:0.5, 
            snatchDistance: 2,
            showInfobox: false,
            label: {offset: [0,0],fixed:false,color:color},
            strokeColor: color,
            fillColor: color,
            snapToGrid: true,snapSizeX: 0.1,snapSizeY: 0.1
          });
                              
          curves1.push(graf);
          points1.push(punt);          
      }

      if (GraphType=="Time vs Horizontal Speed"){
          
          graf=graph.create('functiongraph', [function(x){return veloini},0,function(){return 90/veloini}], {visible:true,strokeWidth:2,strokeColor: color,highlight:false})
          punt=graph.create('glider', [0.01,veloini,graf], {
          //punt=graph.create('point', [0,veloini], {          
            name: function(){              
                return "(" + this.X().toFixed(2).toString() + "," + this.Y().toFixed(2).toString()+ ")";         
            }, 
            /*attractors: [graf], 
            attractorDistance:0.5, 
            snatchDistance: 2,*/
            showInfobox: false,
            label: {offset: [-10,20],fixed:false},
            strokeColor: color,
            fillColor: color,
            snapToGrid: true,snapSizeX: 0.01,snapSizeY: 0.01
          });          
        
          paralela=graph.create('parallel',[ejeY,punt], {visible:false});
        
      /*  area = graph.create('polygon', [
          graph.create('point',[0,0],{fixed:true, visible:false}),
          graph.create('point',[0,vIni],{fixed:true, visible:false}), 
          punt, 
          graph.create('intersection',[ejeX,paralela],{visible:false})
        ], {withLines:false, fillColor: color});*/
              
        curves1.push(graf);
        points1.push(punt);
        /*areas1.push(area);*/
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
      ball.pos2D = new Vector2D(90,pos0.y);                 
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
      var colores=["#C39BD3","#7FB3D5","#76D7C4","#7DCEA0","#F8C471","#F0B27A","#239B56","#EC7063","#99A3A4","#A82F16","#B3847A","#5D5A7C","#009898"];
      var randomNumber= Math.floor(Math.random() * colores.length);
      return colores[randomNumber];
    }

    function round(value,decimals) {
      //return Math.round(value*Math.pow(10, decimals))/Math.pow(10, decimals); 
      return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
    }
    $('#tabulacionTable').editableTableWidget();
             
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
      animTime=90/velo0.x;
      t=0;
      ball.pos2D=pos0;
      graph.removeObject(curves1);
      graph.removeObject(points1);      
      curves1.length = 0;
      points1.length = 0;
      areas1.length = 0;
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
    
    $("#sliderH").bind( "input change", function(event, ui) {           
      var h0=$(this).val();         //Buscar si se puede converir el valor directamente a un número.      
      $("#spanH").text("Altura del helicóptero y la caja: " + $(this).val());
      pos0=new Vector2D(0,h0*1);      
      ball.pos2D=pos0;                                        
      t=0;
      animTime=90/velo0.x; ;                 
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      board.update();     
    });

    $("#sliderG").bind( "input change", function(event, ui) {           
      g=$(this).val();          //Buscar si se puede converir el valor directamente a un número.            
      $("#spanG").text("Aceleración en caída libre: " + $(this).val());
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;      
      animTime=90/velo0.x;   //Tiempo de caida mas el recorrido          
      console.log("Gravity: "+ acc.y);
      console.log("Anitime: "+ animTime);
      board.update(); 
    });

    $("#sliderV").bind( "input change", function(event, ui) {           
      vIni=$(this).val()*1;         //Buscar si se puede converir el valor directamente a un número.            
      $("#spanV").text("Velocidad horizontal constante del helicóptero y la caja: " + $(this).val());
      ball.pos2D=pos0;
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g);
      t=0;                  
      ball.pos2D=pos0;
      animTime=90/velo0.x;   //Tiempo de caida mas el recorrido                        
      console.log("Vini "+vIni);                  
      board.update();   
    });

    $("#sliderD").bind( "input change", function(event, ui) {           
      distance=$(this).val();           //Buscar si se puede converir el valor directamente a un número.                  
      dropD=distance*1;
      $("#spanD").text("Distancia para soltar la caja: " + $(this).val());           
      ball.pos2D=pos0;      
      velo0= new Vector2D(vIni,0);
      acc= new Vector2D(0,g*1);
      t=0;            
      animTime=90/velo0.x;   //Tiempo de caida mas el recorrido            
      console.log("DistanceX: "+ dropD);
      console.log("Nuevo Anitime: "+ animTime);
      console.log("estoy moviendo la barra");
      board.update(); 
      
    });


     

    //--------------------------Dialogo Graph------------------------------

    var Yunits;

    $('.Yaxis-select').change(function () { 
      Xselected=$('.Xaxis-select option:selected').val();
      Yselected=$('.Yaxis-select option:selected').val();
      XselectedText=$('.Xaxis-select option:selected').text();
      YselectedText=$('.Yaxis-select option:selected').text(); 
      GraphType=Xselected+" vs "+Yselected;
      //console.log(GraphType);

      if(Yselected=="Horizontal Speed") {Yunits="m/s";}
      if(Yselected=="Horizontal Distance") {Yunits="m";}

      ejeY.setAttribute({name: function() { 
              return '$('+Yunits+')$';
            }});  
      reset(); 
    });
    
 //-----------------------Plotea puntos------------
    //PloteaPuntos
    var tablePoints=[];

    $('tr').on('change', function(evt, newValue) {                
      var currentRow=$(this);    
      var x=parseFloat(currentRow.find("td:eq(0)").text());
      var y=parseFloat(currentRow.find("td:eq(1)").text());
      ploteaPuntos();
/*      ploteaPuntos(x,y);
      console.log("x: " + x);
      console.log("y: " + y);*/
       
    });



    function ploteaPuntos(){
      boardGraphPlot.removeObject(tablePoints);
      tablePoints.length = 0;
      //board.update();   
      
      var table = document.getElementById("tabulacionTable"); 
      var totalRows = document.getElementById("tabulacionTable").rows.length;
      var totalCol = 1;

      for (var i = 1; i < totalRows; i++)
          { 

            tablePoints.push(

              boardGraphPlot.create('point',
              [parseFloat(table.rows[i].cells[0].innerHTML),
               parseFloat(table.rows[i].cells[1].innerHTML)],
                {
                  fixed: true, 
                  color:'#5882FA', 
                  name: function(){
                    return "(" + toFixed(this.X(),2) + "," + toFixed(this.Y(),2)  + ")";
                  }
                })
            );
                
          }
    }
  
  var testGrafica=[];
  $('#checkFunction').click(function() { 
    boardGraphPlot.removeObject(testGrafica);
    testGrafica.length = 0;
    f= $("#funcionLineal").val();
    console.log(f);
    f= f.replace("x", "*");
    f= f.replace("t", "x");
    
    testGrafica.push(curve = boardGraphPlot.create('functiongraph',[f,0,
                    function(){ 
                      var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
                      return c.usrCoords[1];
                    }
                  ], {strokeColor:'#8181F7',strokeWidth:3})
    )


  })
 




  //----------------------Plotea funcion---------------------//

  //-----------------------graficaHelp--------------//

  var curvasAyuda=[];
  
  
  $('#funcionAyudaGraficarBtn').click(function() { 
    
    f= $("#funcionAyuda").val();
    console.log(f);
    var f = f.replace(/x/g,"*"); 
        f = f.replace(/t/g, "x");
    color=generarcolor();
    cuantaAyuda.push(f);
    console.log(cuantaAyuda);    
    curvasAyuda.push(curve = graphPlotHelp.create('functiongraph',[f,0,
                    function(){ 
                      var c = new JXG.Coords(JXG.COORDS_BY_SCREEN,[board.canvasWidth,0],board);
                      return c.usrCoords[1];
                    }
                  ],{strokeColor:color,strokeWidth:3})
    );

  });

  $('#funcionAyudaBorrarBtn').click(function() { 
      graphPlotHelp.removeObject(curvasAyuda);      
      funcionAyuda.length = 0;

  });

     


   

    //------------------------Lang------------------------------

/*    $(document).ready(function() {
      loadBundles($.i18n.browserLang());
      // configure language combo box
      $(".dropdown-menu li a").click(function(){
      var selection = $(this).text();
      $(this).parents('.btn-group').find('.dropdown-toggle').html(selection+' <span class="caret"></span>');
      console.log(selection);
      loadBundles(selection !== 'browser' ? selection : $.i18n.browserLang());
        });
      
    });*/

/*    function loadBundles(lang) {
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
          

            }          
          });
      }*/




});

    
  