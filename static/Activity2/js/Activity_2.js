var cuantaAyuda=[];
$(function(){ 
    JXG.Options.board.minimizeReflow='none'
    var board = JXG.JSXGraph.initBoard('edvi',{
      boundingbox:[-20,100,5,-5], //xmin,ymax,xmax,ymin
      keepaspectratio:true, 
      axis:false,     
      showCopyright:false,
      showNavigation:true,
      
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
    


    var backgroundUrl= "images/background_long.png";
    var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

    var campUrl= "images/treeHouse.png";
    var campImg=board.create('image',[campUrl,[50,0],[10,10]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

    //-----------------------------Dibuja grafica-------------------------------// 
    var graph= JXG.JSXGraph.initBoard('graph',{
      boundingbox:[-2,100,8,-15], //xmin,ymax,xmax,ymin
      keepaspectratio:false, 
      axis:false,     
      showCopyright:false,
      showNavigation:true,
      needsRegularUpdate: false, 
        fixed: true,
        numberPointsLow:100,
        numberPointsHigh:400,
        zoomX:1.2,  //En PC y iPad 1.5 es suficiente
        zoomY:1.2,  //En PC y iPad 1.5 es suficiente

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
      withLabel: true,            
      drawZero:true,        
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-20, -1]},
          }
      });
    var ejeYLbl = graph.create('text', [-1.5,30,'$velocidad$\\ \\ \\ \\$(m/s)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

    var ejeX = graph.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:true,    
      fixed: true,      
      label: {offset: [180,25]},
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false, 
          fixed: true,
          label: {offset: [-3, -15]}
          }
      }); 
var ejeXLbl = graph.create('text', [5.5,-7,'$tiempo$\\ \\ \\ \\$(s)$']);     
    board.addChild(graph);

//----------------------------boardGraphPlot-------------------------//

       var boardGraphPlot = JXG.JSXGraph.initBoard('graphPlot',{
      //boundingbox:[-10,10,10,-10], //xmin,ymax,xmax,ymin      
      boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
      keepaspectratio:false, 
      axis:false,      
      showCopyright:false,
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
    var ejeY1Lbl = boardGraphPlot.create('text', [-2,30,'$velocidad$\\ \\ \\ \\$(m/s)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});
    
    var ejeX1 = boardGraphPlot.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:false,    
      fixed: true,

      withLabel: false,            
      
      ticks:{
          doAdvancedPlot:false, 
          needsRegularUpdate: false,
          label: {offset: [-3, -15]}, 
          fixed: true
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
    
    var pos0=new Vector2D(0,25);
    
    var velo0= new Vector2D(0,0);
    var velo1= new Vector2D(8,0);
    var velo2= new Vector2D(0,0);
    
    var g=9.8;
    var acc= new Vector2D(0,g);                //vector aceleración gravedad
    
    var tDrop=0;                       //Tiempo para soltar la cajita
    var animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;   
    
    var vIni=0;                        //Velocidad inicial    
          

    var delay= -4/vIni;
    var k=0.5;
    
    var dropD=0;

    //-------------------------Objeto en caída libre-------------// 
    
    ball = new Ball('00F8BC',1,0);
    ball.pos2D=pos0;
    ball.velo2D=velo0;    
    
    //-------------------------Escenario-----------------//         
    
    var particle=board.create('point',[function(){return ball.x},function(){
      return ball.y;      
      }],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:true, labelColor:'black',label: {offset: [5,0]}});

    var target=board.create('point',[50,0],{name:' ', face:'x', size:8, color: 'black', fixed:true});

    var urlHelicopter= "images/helicopter.png";//Imagen y etiquetas del auto    
    var urlCrane= "images/crane.png";//Imagen y etiquetas del auto    

    var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});    
    var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'});         
    
    //--------------------------Gráfica Posición-----------------//
    var curves1 =[];
    var points1 =[];
    var color="black";
    var GraphType="Time vs Vertical Speed";       
    var Xselected="Time";
    var Yselected="Vertical Speed"; 

    var graficapoint= graph.create('point',[
      function(){
      if (Xselected=="Time") return t;
      },
      function(){
      if (Yselected=="Time") return t;
      if (Yselected=="Vertical Distance") return -ball.y+pos0.y;
      if (Yselected=="Height") return ball.y;
      if (Yselected=="Vertical Speed") return ball.vy;
      if (Yselected=="Vertical Acceleration"){
        if(t<tDrop) return 0;         
        else return acc.y;          
      }      
      if (Yselected=="Horizontal Speed") return ball.vx;
      if (Yselected=="Horizontal Acceleration") {
        return 0; 
      };
      if (Yselected=="Horizontal Distance") return ball.x;
    }],
    {name:'', strokeColor:'green', fillColor: 'green', size:2});

    var graphTrace = graph.create('functiongraph', [function(x){
    if (GraphType=="Time vs Vertical Speed") return g*x;
    if (GraphType=="Time vs Vertical Distance") return 0.5*g*x*x;
    if (GraphType=="Time vs Height") return pos0.y-0.5*g*x*x;
    },
    0,
    function(){return t;}],     
    {visible:true,strokeWidth:2,strokeColor: color, highlight:false});

    
    function addCurve(acel,posini,veloini,td){                          
      color=generarcolor();

      if (GraphType=="Time vs Height"){
            graf=graph.create('functiongraph', [function(x){return posini-0.5*acel*x*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: color});            
            punt=graph.create('point', [0,posini], {
              name: function(){
                if(this.X()>-0.0 && this.X()<0.05 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*0).toFixed(1).toString() +")";
                if(this.X()> 0.45 && this.X()<0.55 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*0.25).toFixed(1).toString() +")";
                if(this.X()> 0.95 && this.X()<1.05 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*1).toFixed(1).toString() +")";
                if(this.X()> 1.45 && this.X()<1.55 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*2.25).toFixed(1).toString() +")";
                if(this.X()> 1.95 && this.X()<2.05 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*4).toFixed(1).toString() +")";
                if(this.X()> 2.45 && this.X()<2.55 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*20.25).toFixed(1).toString() +")";
                if(this.X()> 2.95 && this.X()<3.05 ) return "(" + this.X().toFixed(1).toString() + "," + (posini-0.5*acel*9).toFixed(1).toString() +")";                            
                else 
                return "(" + this.X().toFixed(2).toString() + "," + (posini-0.5*acel*Math.pow(this.X().toFixed(2), 2)).toFixed(2).toString()+ ")";         
                //else return "(" + this.X().toFixed(2).toString() + "," + this.Y().toFixed(2).toString()+ ")";         
              }, 
              attractors: [graf], 
              attractorDistance:0.5, 
              snatchDistance: 2,
              showInfobox: false,
              label: {offset: [10,10],fixed:false},
              strokeColor: color,
              fillColor: color,
            });                      
            curves1.push(graf);
            points1.push(punt); 
      }

    if (GraphType=="Time vs Vertical Distance"){
            graf=graph.create('functiongraph', [function(x){return 0.5*acel*x*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: color});
                punt=graph.create('point', [0,0], {
                  name: function(){
                    if(this.X()>-0.05 && this.X()<0.05 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*0).toFixed(1).toString() +")";
                    if(this.X()> 0.45 && this.X()<0.55 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*0.25).toFixed(1).toString() +")";
                    if(this.X()> 0.95 && this.X()<1.05 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*1).toFixed(1).toString() +")";
                    if(this.X()> 1.45 && this.X()<1.55 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*2.25).toFixed(1).toString() +")";
                    if(this.X()> 1.95 && this.X()<2.05 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*4).toFixed(1).toString() +")";
                    if(this.X()> 2.45 && this.X()<2.55 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*20.25).toFixed(1).toString() +")";
                    if(this.X()> 2.95 && this.X()<3.05 ) return "(" + this.X().toFixed(1).toString() + "," + (0.5*acel*9).toFixed(1).toString() +")";                            
                    else 
                    return "(" + this.X().toFixed(2).toString() + "," + (4.9*Math.pow(this.X().toFixed(2), 2)).toFixed(2).toString()+ ")";         
                    
                  }, 
                  attractors: [graf], 
                  attractorDistance:0.5, 
                  snatchDistance: 2,
                  showInfobox: false,
                  label: {offset: [-50,20],fixed:false},
                  strokeColor: color,
                  fillColor: color,
                });                      
                curves1.push(graf);
                points1.push(punt);
          }


      if (GraphType=="Time vs Vertical Speed"){
        graf=graph.create('functiongraph', [function(x){return acel*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: color});
              punt=graph.create('point', [0,0], {
                name: function(){
                  if(this.X()>-0.05 && this.X()<0.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*0).toFixed(1).toString() +")";
                  if(this.X()> 0.95 && this.X()<1.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*1).toFixed(1).toString() +")";
                  if(this.X()> 1.95 && this.X()<2.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*2).toFixed(1).toString() +")";
                  if(this.X()> 2.95 && this.X()<3.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*3).toFixed(1).toString() +")";
                  if(this.X()> 3.95 && this.X()<4.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*4).toFixed(1).toString() +")";
                  if(this.X()> 4.95 && this.X()<5.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*5).toFixed(1).toString() +")";
                  if(this.X()> 5.95 && this.X()<6.05 ) return "(" + this.X().toFixed(1).toString() + "," + (acel*6).toFixed(1).toString() +")";                            
                  else 
                  return "(" + this.X().toFixed(2).toString() + "," + (acel*this.X()).toFixed(2).toString()+ ")";             
                  
                }, 
                attractors: [graf], 
                attractorDistance:0.5, 
                snatchDistance: 2,
                showInfobox: false,
                label: {offset: [-50,20],fixed:false},
                strokeColor: color,
                fillColor: color,
              });
                                               
              curves1.push(graf);
              points1.push(punt);
        }

      if (GraphType=="Time vs Vertical Acceleration"){
        if (vIni==0){//vIni==0
          if(dropD==0){//dDop==0
            curves1.push(graph.create('functiongraph', [function(x){return acel},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
          }else{//dDop!=0
            curves1.push(graph.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                 
            curves1.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                            
          }
        }else{//vIni!=0
          if(dropD==0){ //dDop==0
            curves1.push(graph.create('functiongraph', [function(x){return 0},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                
            curves1.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                 
          }else{//dDop!=0
            curves1.push(graph.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                 
            curves1.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));                 
          }
        }
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
      if (t<animTime){            //Detiene la animación cuando se cumple el tiempo
        move();
      } else stop();      
    }

    function move(){    
      updatePosition()      
      board.update();
      //console.log(t,ball.y);      
    };

    function stop(){      
      cancelAnimationFrame(animId);     
      ball.pos2D = new Vector2D(dropD+vIni*Math.sqrt(2*pos0.y/acc.y),0);      
      t=animTime; 
      addCurve(acc.y,pos0.y,velo0.x,tDrop);     //Agrega la curva al historial    
      graficapoint.setAttribute({visible: false});
      graphTrace.setAttribute({visible: false});
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

    function generarcolor(){
      var colores=["#C39BD3","#7FB3D5","#76D7C4","#7DCEA0","#F8C471","#F0B27A","#239B56","#EC7063","#99A3A4","#A82F16","#B3847A","#5D5A7C","#009898"];
      var randomNumber= Math.floor(Math.random() * colores.length);
      return colores[randomNumber];
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
      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;
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
    
    $("#sliderH").bind( "input change", function(event, ui) {           
      var h0=$(this).val();         //Buscar si se puede converir el valor directamente a un número.      
      $("#spanH").text("Altura: " + $(this).val());
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
      $("#spanV").text("Constant Speed at drop: " + $(this).val());
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
        
      if(vIni>0 && tDrop==0) { 
        ball.pos2D=new Vector2D(-4,pos0.y); 
        delay= -4/vIni;
      }
      else ball.pos2D=pos0;

      animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;   //Tiempo de caida mas el recorrido                        
      console.log("Vini "+vIni);                  
      board.update();   
    });

    $("#sliderD").bind( "input change", function(event, ui) {           
      distance=$(this).val();           //Buscar si se puede converir el valor directamente a un número.                  
      dropD=distance*1;
      $("#spanD").text("Distance to drop the crane: " + $(this).val());     
      
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

      if(Yselected=="Vertical Speed") {Yunits="m/s";}
      if(Yselected=="Vertical Distance") {Yunits="m";}
      if(Yselected=="Height") {Yunits="m";}

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

 
});

    
  