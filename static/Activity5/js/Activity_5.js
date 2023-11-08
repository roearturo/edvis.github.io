function Activity5code(){
	
	//-----------------------------Dibuja escenario -------------------------------// 
	// Para correr en chrome mobile JXG.Options.board.minimizeReflow = 'none';             Mejora frames habrá que activarlo selectivamente
var board = JXG.JSXGraph.initBoard('edvi',{
      boundingbox:[-20,60,10,-15], //xmin,ymax,xmax,ymin
      keepaspectratio:true, 
      axis:false,     
      showCopyright:false,

      zoomX:1.2,  //En PC y iPad 1.5 es suficiente
      zoomY:1.2,  //En PC y iPad 1.5 es suficiente
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
         wheel: true,
      }
    }); 
    
        var ejeY0 = board.create('axis', [[0,0], [0,1]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      fixed: true, 
      withLabel: true,            
      name: '$Height$<br>$\\ \\ \\ (m)$',
      label: {offset: [-65,130]},
              
      });

      ejeY0.removeAllTicks();   
      board.create('ticks', [ejeY0, 10], { // The number here is the distance between Major ticks     
        majorHeight:5, // Need this because the JXG.Options one doesn't apply
        drawLabels:true, // Needed, and only works for equidistant ticks
        label: {offset: [-20, -1]},
        minorTicks:1, // The NUMBER of small ticks between each Major tick
        drawZero:false,
       }
      );
    


    var ejeX0 = board.create('axis', [[0,0], [1,0]], {
      doAdvancedPlot:false, 
      needsRegularUpdate: false, 
      drawZero:true,    
      fixed: true,
      withLabel: true,            
      name: '$Distance \\ (m)$',
      label: {offset: [180,-30]}, 
      }); 
    
      ejeX0.removeAllTicks();   
      board.create('ticks', [ejeX0, 10], { // The number here is the distance between Major ticks     
        //strokeColor:'#BBBBBB',
        majorHeight:5, // Need this because the JXG.Options one doesn't apply
        drawLabels:true, // Needed, and only works for equidistant ticks
        label: {offset: [-8, -10]},
        minorTicks:1, // The NUMBER of small ticks between each Major tick
        drawZero:true,
       }
      );

    

    //position:'top'
    var backgroundUrl= "images/background_long.png";
    var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});

    var campUrl= "images/treeHouse.png";
    var campImg=board.create('image',[campUrl,[50,0],[10,10]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});


		//-----------------------------Dibuja grafica Posición-------------------------------// 
var graph= JXG.JSXGraph.initBoard('graph',{
			boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
			keepaspectratio:false, 
			axis:false,			
			showCopyright:false,
			showNavigation:false,
			needsRegularUpdate: false, 
	  		fixed: true,
	  		numberPointsLow:100,
	  		numberPointsHigh:100,

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
				 wheel: true,
			}
		});
		
		
		var ejeY = graph.create('axis', [[0,0], [0,1]], {
			doAdvancedPlot:false, 
			needsRegularUpdate: true, 
			fixed: true, 
			withLabel: true, 						
			name: '$Height$<br>$\\ \\ \\  (m)$',		  	
			label: {offset: [-80,140]},
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
			drawZero:true,  	
			fixed: true,

			withLabel: true, 						
			name: '$Time \\ (s)$',		  	
			label: {offset: [150,-35]},

			});	

var graph2= JXG.JSXGraph.initBoard('graph2',{
			boundingbox:[-2,60,8,-15], //xmin,ymax,xmax,ymin
			keepaspectratio:false, 
			axis:false,			
			showCopyright:false,
			
			showNavigation:false,
			needsRegularUpdate: false, 
	  		fixed: true,
	  		numberPointsLow:100,
	  		numberPointsHigh:100,

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
				 wheel: true,
			}
		});
		
		
		var ejeY2 = graph2.create('axis', [[0,0], [0,1]], {
			doAdvancedPlot:false, 
			needsRegularUpdate: true, 
			fixed: true, 
			withLabel: true, 						
			name: "$vertical$<br>$speed (m/s)$",
			label: {offset: [-70,140]},
			drawZero:true,  			
			ticks:{
					doAdvancedPlot:false, 
					needsRegularUpdate: false, 
					fixed: true
				  }
			});

		var ejeX2 = graph2.create('axis', [[0,0], [1,0]], {
			doAdvancedPlot:false, 
			needsRegularUpdate: false, 
			drawZero:true,  	
			fixed: true,
			withLabel: true, 						
			name: "$time (s)$",
			label: {offset: [150,-25]},

			});	

		board.addChild(graph);
		board.addChild(graph2);
	
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
		var acc= new Vector2D(0,g);								 //vector aceleración gravedad
		
		var tDrop=1;											 //Tiempo para soltar la cajita
		var animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;		
		
		var vIni=10;												 //Velocidad inicial		
					

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
			}],{name: function() { return "(" + ball.x.toFixed(1) + ","+ ball.y.toFixed(1)+")"  }, withLabel:true, labelColor:'black', label: {offset: [-65,0]}});
		var target=board.create('point',[50,0],{name:' ', face:'x', size:8, color: 'black', fixed:true});

		var urlHelicopter= "images/helicopter.png";//Imagen y etiquetas del auto		
 		var urlCrane= "images/crane.png";//Imagen y etiquetas del auto		

 		var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});		
 		var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'}); 				
		
		//--------------------------Gráfica 1-----------------//
		var curves1 =[];
		var GraphType="Time vs Height";		
		//var type="position";	
		var selectionX="Time";
		var selectionY="Height";	

		var graficapoint= graph.create('point',[
			function(){
			if (selectionX=="Time") return t;
			if (selectionX=="Horizontal Speed") return ball.vx;
			if (selectionX=="Horizontal Distance") return ball.x;
			},
			function(){
			if (selectionY=="Time") return t;
			if (selectionY=="Height") return ball.y;
			if (selectionY=="Vertical Speed") return ball.vy;
			if (selectionY=="Vertical Acceleration"){
				if(t<tDrop) return 0;					
				else return acc.y;					
			}			 
			if (selectionY=="Horizontal Speed") return ball.vx;
			if (selectionY=="Horizontal Acceleration") {
				return 0; 
			};
			if (selectionY=="Horizontal Distance") return ball.x;


		}],
		{name:'', trace:true, size:0.1,strokeColor: 'blue'});

		//--------------------------Gráfica 2-----------------//
		var curves2 =[];
		var GraphType2="Time vs Vertical Speed";		
		//var type2="position";	
		var selectionX2="Time";
		var selectionY2="Vertical Speed";	

		var graficapoint2= graph2.create('point',[
			function(){
			if (selectionX2=="Time") return t;
			if (selectionX2=="Horizontal Speed") return ball.vx;
			if (selectionX2=="Horizontal Distance") return ball.x;
			},
			function(){
			if (selectionY2=="Time") return t;
			if (selectionY2=="Height") return ball.y;
			if (selectionY2=="Vertical Speed") return ball.vy;
			if (selectionY2=="Vertical Acceleration"){
				if(t<tDrop) return 0;					
				else return acc.y;					
			}			 
			if (selectionY2=="Horizontal Speed") return ball.vx;
			if (selectionY2=="Horizontal Acceleration") {
				return 0; 
			};
			if (selectionY2=="Horizontal Distance") return ball.x;


		}],
		{name:'', trace:true, size:0.1,strokeColor: 'blue'});
		
		//--------------------------Add curves Gráfica 1-----------------//
		function addCurve(acel,posini,veloini,td){													
			
			if (GraphType=="Time vs Height"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return posini-0.5*acel*x*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));			
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return posini},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves1.push(graph.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));	
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return posini},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves1.push(graph.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));								
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return posini},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves1.push(graph.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));													
					}
				}
			}

			if (GraphType=="Time vs Vertical Speed"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return acel*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
						curves1.push(graph.create('functiongraph', [function(x){return acel*x-acel*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return 0},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					 	curves1.push(graph.create('functiongraph', [function(x){return acel*x},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					 	curves1.push(graph.create('functiongraph', [function(x){return acel*x-acel*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}
				}
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
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return 0},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					 	curves1.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					 	curves1.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}
				}
			}

			if (GraphType=="Time vs Horizontal Speed"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return 8},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
						curves1.push(graph.create('functiongraph', [function(x){return 0},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return veloini},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					 	
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return veloini},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					 	
					}
				}
			}

			if (GraphType=="Time vs Horizontal Acceleration"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 				
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return 0},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 	
					}else{//dDop!=0
					curves1.push(graph.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					
					}
				}
			}

			if (GraphType=="Time vs Horizontal Distance"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));						
					}else{//dDop!=0						
						curves1.push(graph.create('functiongraph', [function(x){return 8*x},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
						curves1.push(graph.create('functiongraph', [function(x){return 8*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return veloini*x},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));									
						//curves1.push(graph.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));									
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));											
					}
				}
			}

			if (GraphType=="Horizontal Distance vs Height"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves1.push(graph.create('line',[[0,0],[0,posini]], {straightFirst:false, straightLast:false, strokeWidth:2, fixed:true}));
						//curves1.push(graph.create('functiongraph', [function(x){return 0},0,0], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));						
					}else{//dDop!=0						
						curves1.push(graph.create('functiongraph', [function(x){return posini},0,8*td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
						curves1.push(graph.create('line',[[8*td,posini],[8*td,0]], {straightFirst:false, straightLast:false, strokeWidth:2, fixed:true}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves1.push(graph.create('functiongraph', [function(x){return posini},-4,0], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));													
						curves1.push(graph.createElement('curve', [
				            function(t){return veloini*t;}, 
				            function(t){return 25-0.5*acel*(t-td)*(t-td);},td,animTime
				            ], 
				            {strokeWidth:2}
				          ));
					}else{//dDop!=0
						curves1.push(graph.create('functiongraph', [function(x){return posini},0,veloini*td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));													
						curves1.push(graph.createElement('curve', [
				            function(t){return veloini*t;}, 
				            function(t){return 25-0.5*acel*(t-td)*(t-td);},td,animTime
				            ], 
				            {strokeWidth:2}
				          ));
					}
				}
			}


		};


		//----------------------AddCurve 2----------------------------//

		function addCurve2(acel,posini,veloini,td){													
			
			if (GraphType2=="Time vs Height"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return posini-0.5*acel*x*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));			
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return posini},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves2.push(graph2.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));	
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return posini},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves2.push(graph2.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));								
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return posini},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					 	curves2.push(graph2.create('functiongraph', [function(x){return posini-0.5*acel*(x-td)*(x-td)},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));													
					}
				}
			}

			if (GraphType2=="Time vs Vertical Speed"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return acel*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
						curves2.push(graph2.create('functiongraph', [function(x){return acel*x-acel*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue'}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					 	curves2.push(graph2.create('functiongraph', [function(x){return acel*x},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					 	curves2.push(graph2.create('functiongraph', [function(x){return acel*x-acel*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}
				}
			}

			if (GraphType2=="Time vs Vertical Acceleration"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return acel},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
						curves2.push(graph2.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 						
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},-4/veloini,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					 	curves2.push(graph.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					 	curves2.push(graph2.create('functiongraph', [function(x){return acel},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}
				}
			}

			if (GraphType2=="Time vs Horizontal Speed"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 8},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
						curves2.push(graph2.create('functiongraph', [function(x){return 0},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return veloini},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					 	
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return veloini},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					 	
					}
				}
			}

			if (GraphType2=="Time vs Horizontal Acceleration"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 				
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return 0},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 	
					}else{//dDop!=0
					curves2.push(graph2.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));								 					
					}
				}
			}

			if (GraphType2=="Time vs Horizontal Distance"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));						
					}else{//dDop!=0						
						curves2.push(graph2.create('functiongraph', [function(x){return 8*x},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
						curves2.push(graph2.create('functiongraph', [function(x){return 8*td},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return veloini*x},-4/veloini,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));									
						//curves2.push(graph.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));									
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));											
					}
				}
			}

			if (GraphType2=="Horizontal Distance vs Height"){
				if (vIni==0){//vIni==0
					if(dropD==0){//dDop==0
						curves2.push(graph2.create('line',[[0,0],[0,posini]], {straightFirst:false, straightLast:false, strokeWidth:2, fixed:true}));
						//curves2.push(graph.create('functiongraph', [function(x){return 0},0,0], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));						
					}else{//dDop!=0						
						curves2.push(graph2.create('functiongraph', [function(x){return posini},0,8*td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));							
						curves2.push(graph2.create('line',[[8*td,posini],[8*td,0]], {straightFirst:false, straightLast:false, strokeWidth:2, fixed:true}));
					}
				}else{//vIni!=0
					if(dropD==0){	//dDop==0
						curves2.push(graph2.create('functiongraph', [function(x){return posini},-4,0], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));													
						curves2.push(graph2.createElement('curve', [
				            function(t){return veloini*t;}, 
				            function(t){return 25-0.5*acel*(t-td)*(t-td);},td,animTime
				            ], 
				            {strokeWidth:2}
				          ));
					}else{//dDop!=0
						curves2.push(graph2.create('functiongraph', [function(x){return posini},0,veloini*td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));													
						curves2.push(graph2.createElement('curve', [
				            function(t){return veloini*t;}, 
				            function(t){return 25-0.5*acel*(t-td)*(t-td);},td,animTime
				            ], 
				            {strokeWidth:2}
				          ));
					}
				}
			}


		};//hasta aqui---------------------------------------

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
			if (t<animTime){						//Detiene la animación cuando se cumple el tiempo
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
			if (vIni==0) {
				if (dropD<0) ball.velo2D=new Vector2D(vIni,acc.y*animTime);
				else {ball.velo2D=new Vector2D(vIni,acc.y*(animTime-tDrop))
				};
			}
			if (vIni>0) {ball.velo2D=new Vector2D(vIni,acc.y*(animTime-tDrop));} 			
			t=animTime;	
			addCurve(acc.y,pos0.y,velo0.x,tDrop);			//Agrega la curva al historial		
			addCurve2(acc.y,pos0.y,velo0.x,tDrop);			//Agrega la curva al historial		
			graficapoint.clearTrace();
			graficapoint2.clearTrace();
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
			acc= new Vector2D(0,g);								 //vector aceleración gravedad
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;
			t=0;
			ball.pos2D=pos0;
			graph.removeObject(curves1);
			graph2.removeObject(curves2);
			curves1.length = 0;			
			graficapoint.clearTrace();
			graficapoint2.clearTrace();
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
			var h0=$(this).val();					//Buscar si se puede converir el valor directamente a un número.			
			$("#spanH").text("Height: " + $(this).val());
			pos0=new Vector2D(0,h0*1);			
			ball.pos2D=pos0;																				
			t=0;
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;									
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g);
			board.update();			
		});

		$("#sliderG").bind( "change", function(event, ui) {  		  		
			g=$(this).val();					//Buscar si se puede converir el valor directamente a un número.						
			$("#spanG").text("Free fall acceleration: " + $(this).val());
			ball.pos2D=pos0;			
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g*1);
			t=0;			
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;		//Tiempo de caida mas el recorrido					
			console.log("Gravity: "+ acc.y);
			console.log("Anitime: "+ animTime);
			board.update();	
		});

		$("#sliderV").bind( "change", function(event, ui) {  		  		
			vIni=$(this).val()*1;					//Buscar si se puede converir el valor directamente a un número.						
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

			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;		//Tiempo de caida mas el recorrido												
			console.log("Vini "+vIni);									
			board.update();		
		});

		$("#sliderD").bind( "change", function(event, ui) {  		  		
			distance=$(this).val();						//Buscar si se puede converir el valor directamente a un número.									
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
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;		//Tiempo de caida mas el recorrido	
						
			console.log("DistanceX: "+ dropD);
			console.log("Nuevo DropTime: "+ tDrop);
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

//--------------------------Dialogo Graph 2------------------------------
		$('#rtimeY2').attr('disabled','disabled').checkboxradio('refresh');
		$('#rHeightX2').attr('disabled','disabled').checkboxradio('refresh');
		$("input[type='radio']").bind( "change", function(event, ui) {
  		$('#rTimeY2').attr('disabled','disabled').checkboxradio('refresh');	
		
		selectionX2=$('.sEjeX2:checked').val();
		selectionY2=$('.sEjeY2:checked').val();
		reset();
		 
		 	switch(selectionX2) {			    
			    case "Height":
			        $('#rHeightY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');
			        ejeX2.setAttribute({name: function() { 
		    			return '$Height \\ (m)$';
		  			}});			        
			        break;
			    case "Vertical Speed":
			       $('#rdioSpdY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');			       
			        ejeX2.setAttribute({name: function() { 
		    			return '$Vertical \\ Speed \\ (m/s)$';
		  			}});			  
			        break;
			    case "Vertical Acceleration":
			        $('#rdioAccY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');			        
			        ejeX2.setAttribute({name: function() { 
		    			return '$Vertical \\ Acceleration \\ (m/s^2)$';
		  			}});
			        break;
			    case "Horizontal Acceleration":
			        $('#rdioAccYH2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');			        
			        ejeX2.setAttribute({name: function() { 
		    			return '$Horizontal \\ Acceleration \\ (m/s^2)$';
		  			}});
			        break;
			    case "Horizontal Speed":
			        $('#rdioSpdYH2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');			        
			        ejeX2.setAttribute({name: function() { 
		    			return '$Horizontal \\ Speed(m/s)$';
		  			}});
			        break;
			    case "Horizontal Distance":
			        $('#rdioDistanceY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rdioSpdY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rdioAccYH2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rdioSpdYH2').attr('disabled','disabled').checkboxradio('refresh');
			        ejeX2.setAttribute({name: function() { 
		    			return '$Horizontal$<br>$Distance(m)$';
		  			}});
			        break;
			    default:
			        $('#rtimeY2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rdioAccY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightY2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdYH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceY2').removeAttr("disabled").checkboxradio('refresh');
			        ejeX2.setAttribute({name: function() { 
		    			return '$Time \\ (s)$';
		  			}});
			        break;
			}

			switch(selectionY2) {			    
			    case "Height":
			        $('#rHeightX2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Height$<br>$\\ \\ \\  (m)$';
		  			}});													        
			        break;
			    case "Vertical Speed":
			       $('#rdioSpdX2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Vertical$<br>$Speed(m/s)$';
		  			}});		  			
			        break;
			    case "Vertical Acceleration":
			        $('#rdioAccX2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Vertical$<br>$Acceleration$<br>$(m/s^2)$';
		  			}});
			        break;
			    case "Horizontal Acceleration":
			        $('#rdioAccXH2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Horizontal$<br>$Acceleration$<br>$(m/s^2)$';
		  			}});
			        break;
			    case "Horizontal Speed":
			        $('#rdioSpdXH2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Horizontal$<br>$Speed(m/s)$';
		  			}});	
			        break;
				case "Horizontal Distance":
			        $('#rdioDistanceX2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rtimeX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Horizontal$<br>$Distance(m)$';
		  			}});	
			        break;			        
			    default:
			        $('#rtimeX2').attr('disabled','disabled').checkboxradio('refresh');
			        $('#rdioAccX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rHeightX2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioAccXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioSpdXH2').removeAttr("disabled").checkboxradio('refresh');
			        $('#rdioDistanceX2').removeAttr("disabled").checkboxradio('refresh');
			        ejeY2.setAttribute({name: function() { 
		    			return '$Time \\ (s)$';
		  			}});
			        break;
			}

			GraphType2=selectionX2+" vs "+selectionY2;
			console.log("Grafica 2 tipo: "+ GraphType2);
			
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
	    if ($('#pwtext').val() != 'force') {
	        $("#pwtext").css("background-color", "#ffff76");
	        $("#pwtext").attr("placeholder", "Password required!");
	        return false;
	    }
	    if ($('#pwtext').val() == 'force') {
	        $("#GridButton").append('<a href="page4.html" data-ajax="true" class="ui-btn ui-corner-all ui-btn ui-mini ui-btn-c"data-theme="c">Next Activity</a>');
	        //<input type="submit" data-ajax="true"  id="passBtn"/>

	        return false;
	    }
	});
};

		
	