function Activity4code(){
    JXG.Options.board.minimizeReflow='none'   

		
	JXG.Options.text.useMathJax = true;
	var board = JXG.JSXGraph.initBoard('edvi',{
		boundingbox:[-13,60,10,-10], //xmin,ymax,xmax,ymin
		keepaspectratio:true,
		showNavigation:true, 
		axis:false,			
		showCopyright:false,			
		zoomX:1,  //En PC y iPad 1.5 es suficiente
		zoomY:1,  //En PC y iPad 1.5 es suficiente
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
		
	//-----------------------------Dibuja ejes y fondo----------------------//
	    
	var ejeY0 = board.create('axis', [[0,0], [0,1]], {
	    doAdvancedPlot:false, 
	    needsRegularUpdate: false, 
	    fixed: true, 
	    withLabel: false,            
	    name: '$Height$<br>$\\ \\ \\ (m)$',
	    label: {offset: [-70,220]},
	    straightFirst:false, 
	    straightLast:true,               
	});

	ejeY0.removeAllTicks();   
	board.create('ticks', [ejeY0, 10], {
	    majorHeight:5, 
	    drawLabels:true,
	    label: {offset: [-20, -1]},
	    minorTicks:1,
	    drawZero:false,
	    doAdvancedPlot:false, 
	    needsRegularUpdate: false,
	    }
	);
	var ejeY0Lbl = board.create('text', [-10,50,'$Altura$ \\ \\ \\ \\$(m)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

	var ejeX0 = board.create('axis', [[0,0], [1,0]], {
	    doAdvancedPlot:false, 
	    needsRegularUpdate: false, 
	    drawZero:true,    
	    fixed: true,
	    withLabel: false,            
	    name: '$Distance \\ (m)$',
	    label: {offset: [280,-30]},
	    straightFirst:false, 
	    straightLast:true, 
	}); 
	    
	ejeX0.removeAllTicks();   
	board.create('ticks', [ejeX0, 10], { 
		majorHeight:5,
	    drawLabels:true,
	    label: {offset: [-8, -10]},
	    minorTicks:1,
	    drawZero:true,
	    doAdvancedPlot:false, 
	    needsRegularUpdate: false,
	    }
	);
	var ejeXLbl = board.create('text', [55,-4,'$Desplazamiento$\\ \\ \\ \\$(m)$']);  
    
    var backgroundUrl= "images/background_long.png";
    var backgroundImg=board.create('image',[backgroundUrl,[-20,-33.5],[120,191]],{fixed:true,needsRegularUpdate: false, highlight: 'false'});
    var campUrl= "images/treeHouse.png";
    var campImg=board.create('image',[campUrl,[50,0],[10,10]],{fixed:true, needsRegularUpdate: false, highlight: 'false'});


	//-----------------------------Dibuja grafica Posición-------------------------------// 
	var graph= JXG.JSXGraph.initBoard('graph',{
		boundingbox:[-2,60,8,-10], //xmin,ymax,xmax,ymin
		
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
		withLabel: false, 						
		name: '$(m/s)$',
		label: {offset: [-80,140]},
		drawZero:true,  			
		ticks:{
			doAdvancedPlot:false, 
			needsRegularUpdate: false, 
			fixed: true,
			label: {offset: [-20, -1]},
		}
		});
	var ejeYLbl = graph.create('text', [-2,30,'$velocidad$ \\ \\ $caja$\\ \\ \\ \\$(m/s)$'],{cssClass:'rotateText', highlightCssClass:'rotateText'});

	var ejeX = graph.create('axis', [[0,0], [1,0]], {
		doAdvancedPlot:false, 
		needsRegularUpdate: false, 
		fixed: true,
		withLabel: false, 						
		name: '$(s)$',		  	
		label: {offset: [150,-35]},
		drawZero:true,
		ticks:{
			doAdvancedPlot:false, 
			needsRegularUpdate: false, 
			fixed: true,
			label: {offset: [-3, -15]},
		}
	});	
	var ejeXLbl = graph.create('text', [5,-4,'$tiempo$\\ \\ \\ \\$(s)$']);  
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
	var pos0=new Vector2D(0,25);
	var pos1=new Vector2D(0,25);		
	var velo0= new Vector2D(10,0);
	var velo1= new Vector2D(8,0);
	var velo2= new Vector2D(0,0);
		
	var g=9.8;
	var acc= new Vector2D(0,g);								//vector aceleración gravedad		
	var tDrop=1;											//Tiempo para soltar la cajita
	var animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop;				
	var vIni=10;											//Velocidad inicial							
	var delay= -4/vIni;
	var k=0.5;		
	var dropD=10;
	console.log(animTime);

	//-------------------------Objeto en caída libre-------------//			
	ball = new Ball('00F8BC',1,0);
	ball.pos2D=pos0;
	ball.velo2D=velo0;				
	//-------------------------Gráfica Escenario-----------------//					
		
	var particle=board.create('point',[function(){return ball.x},function(){
      	return ball.y;      
      	}],{name: function() { return "(" + ball.x.toFixed(2) + ","+ ball.y.toFixed(2)+")"  }, withLabel:true, labelColor:'black',label: {offset: [-70,20], fixed:false}});
	var target=board.create('arrow',[[50,-9],[50, -3]],{name:' ', color: 'blue', fixed:true});

	
	var urlHelicopter= "images/helicopter.png";//Imagen y etiquetas del auto		
 	var urlCrane= "images/crane.png";//Imagen y etiquetas del auto		
 	var helicopterImg=board.create('image',[urlHelicopter,[function(){return ball.x-5.55},function() {return pos0.y+2.25;}],[10,7.5]],{fixed:true, highlight: 'false'});		
 	var craneImg=board.create('image',[urlCrane,[function(){return ball.x-2.25},function() {return ball.y}],[2.25,2.25]],{fixed:true, highlight: 'false'}); 				
		
	//--------------------------Gráfica Posición-----------------//
	var curves1 =[];
	var points=[];
	var color="black";
	var GraphType="Time vs Horizontal Speed";		
	//var type="position";	
	var Xselected="Time";
	var Yselected="Horizontal Speed";	

	var graficapoint= graph.create('point',[
		function(){
		if (Xselected=="Time") return t;
		if (Xselected=="Horizontal Speed") return ball.vx;
		if (Xselected=="Horizontal Distance") return ball.x;
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
	    if (GraphType=="Time vs Horizontal Speed") return ball.vx;
	    if (GraphType=="Time vs Horizontal Distance") return ball.vx*x;
	    },
	    0,
	    function(){return t;}],     
	    {visible:true,strokeWidth:2,strokeColor: color, highlight:false, frozen: true});
		
	function addCurve(acel,posini,veloini,td){													
		color1=generarcolor();
		color2=generarcolor();

		if (GraphType=="Time vs Horizontal Speed"){
			if (vIni==0){//vIni==0
				if(dropD==0){//dDop==0
					graf1=graph.create('functiongraph', [function(x){return 0},0,animTime], {visible:true,strokeWidth:2,strokeColor: color1,highlight:false});					
					punt=graph.create('point', [0,0], {
			        	name: function(){
			        	return "(" + this.X().toFixed(2).toString() + ", 0)";         
			           	}, 
				        attractors: [graf1], 
				        attractorDistance:0.5, 
				        snatchDistance: 2,
				        showInfobox: false,
				        label: {offset: [-40,30],fixed:false},
				        strokeColor: color2,
				        fillColor: color1,
			        });
					punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});          
					curves1.push(graf1);				
					points.push(punt);
									
				



				}else{//dDop!=0
					curves1.push(graph.create('functiongraph', [function(x){return 8},0,td], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
					curves1.push(graph.create('functiongraph', [function(x){return 0},td,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));
				}
			}
			else{//vIni!=0
				if(dropD==0){	//dDop==0
					graf1=graph.create('functiongraph', [function(x){return veloini},0,td], {visible:true,strokeWidth:2,strokeColor: color1,highlight:false});
					graf2=graph.create('functiongraph', [function(x){return veloini},td,animTime], {visible:true,strokeWidth:2,strokeColor: color2,highlight:false});
					punt=graph.create('point', [0,vIni], {
			        	name: function(){
			        	return "(" + this.X().toFixed(2).toString() + "," + veloini.toFixed(2).toString()+ ")";         
			           	}, 
				        attractors: [graf1,graf2], 
				        attractorDistance:0.5, 
				        snatchDistance: 2,
				        showInfobox: false,
				        label: {offset: [-60,30],fixed:false},
				        strokeColor: color2,
				        fillColor: color1,
			        });
					punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});          
					curves1.push(graf1);
					curves1.push(graf2);
					points.push(punt);
					}
				else{//dDop!=0
					graf1=graph.create('functiongraph', [function(x){return veloini},0,td], {visible:true,strokeWidth:2,strokeColor: color1,highlight:false})
					graf2=graph.create('functiongraph', [function(x){return veloini},td,animTime], {visible:true,strokeWidth:2,strokeColor: color2,highlight:false})
					punt=graph.create('point', [0,vIni], {
						name: function(){
						return "(" + this.X().toFixed(2).toString() + "," + veloini.toFixed(2).toString()+ ")";         
						}, 
						attractors: [graf1,graf2], 
						attractorDistance:0.5, 
						snatchDistance: 2,
						showInfobox: false,
						label: {offset: [-60,30],fixed:false},
						strokeColor: color2,
						fillColor: color1,
					});			          
					punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});           
					curves1.push(graf1);
					curves1.push(graf2);
					points.push(punt);
					}
				}
			}

			/*if (GraphType=="Time vs Horizontal Acceleration"){
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
			}*/

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
						graf1=graph.create('functiongraph', [function(x){return veloini*x},0,td], {visible:true,strokeWidth:2,strokeColor: color1,highlight:false});
						graf2=graph.create('functiongraph', [function(x){return veloini*x},td,animTime], {visible:true,strokeWidth:2,strokeColor: color2,highlight:false});
						punt=graph.create('point', [0,0], {
			            name: function(){
			              if(this.X()>-0.01 && this.X()<0.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*0).toFixed(2).toString() +")";
			              if(this.X()> 0.99 && this.X()<1.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*1).toFixed(2).toString() +")";
			              if(this.X()> 1.99 && this.X()<2.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*2).toFixed(2).toString() +")";
			              if(this.X()> 2.99 && this.X()<3.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*3).toFixed(2).toString() +")";
			              if(this.X()> 3.99 && this.X()<4.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*4).toFixed(2).toString() +")";
			              if(this.X()> 4.99 && this.X()<5.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*5).toFixed(2).toString() +")";
			              if(this.X()> 5.99 && this.X()<6.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*6).toFixed(2).toString() +")";                            
			              else return "(" + this.X().toFixed(2).toString() + "," + veloini*this.X().toFixed(2).toString()+ ")";         
			            }, 
			            attractors: [graf1,graf2], 
			            attractorDistance:0.5, 
			            snatchDistance: 2,
			            showInfobox: false,
			            label: {offset: [-60,30],fixed:false},
			            strokeColor: color2,
			            fillColor: color1,
			            
			          });

			          punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});          
			          curves1.push(graf1);
			          curves1.push(graf2);
			          points.push(punt);	


						//curves1.push(graph.create('functiongraph', [function(x){return veloini*x},0,animTime], {visible:true,strokeWidth:2,strokeColor: 'blue',highlight:false}));									
					}else{//dDop!=0
						graf1=graph.create('functiongraph', [function(x){return veloini*x},0,td], {visible:true,strokeWidth:2,strokeColor: color1,highlight:false});
						graf2=graph.create('functiongraph', [function(x){return veloini*x},td,animTime], {visible:true,strokeWidth:2,strokeColor: color2,highlight:false});
						punt=graph.create('point', [0,0], {
			            name: function(){
			              if(this.X()>-0.01 && this.X()<0.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*0).toFixed(2).toString() +")";
			              if(this.X()> 0.99 && this.X()<1.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*1).toFixed(2).toString() +")";
			              if(this.X()> 1.99 && this.X()<2.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*2).toFixed(2).toString() +")";
			              if(this.X()> 2.99 && this.X()<3.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*3).toFixed(2).toString() +")";
			              if(this.X()> 3.99 && this.X()<4.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*4).toFixed(2).toString() +")";
			              if(this.X()> 4.99 && this.X()<5.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*5).toFixed(2).toString() +")";
			              if(this.X()> 5.99 && this.X()<6.01 ) return "(" + this.X().toFixed(2).toString() + "," + (veloini*6).toFixed(2).toString() +")";                            
			              else return "(" + this.X().toFixed(2).toString() + "," + veloini*this.X().toFixed(2).toString()+ ")";         
			            }, 
			            attractors: [graf1,graf2], 
			            attractorDistance:0.5, 
			            snatchDistance: 2,
			            showInfobox: false,
			            label: {offset: [-60,30],fixed:false},
			            strokeColor: color2,
			            fillColor: color1,
			            
			          });

			          punt.setProperty({snapToGrid: true,snapSizeX: 0.001,snapSizeY: 0.001});          
			          curves1.push(graf1);
			          curves1.push(graf2);
			          points.push(punt);	
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

		//-------------------------Animación--------------------------//
		function play(){
			graficapoint.setAttribute({visible: true});
      		graphTrace.setAttribute({visible: true});
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
			
/*			if(ball.x<0){
				graficapoint.setAttribute({visible: false});
	      		graphTrace.setAttribute({visible: false});
      		} else {graficapoint.setAttribute({visible: true});
	      		graphTrace.setAttribute({visible: true});}*/	


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
			graph.removeObject(points);
			curves1.length = 0;
			points.length = 0;
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
			var h0=$(this).val();					//Buscar si se puede converir el valor directamente a un número.			
			$("#spanH").text("Altura: "+$(this).val());
			pos0=new Vector2D(0,h0*1);			
			ball.pos2D=pos0;																				
			t=0;
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;									
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g);
			board.update();			
		});

		$("#sliderG").bind( "input change", function(event, ui) {  		  		
			g=$(this).val();					//Buscar si se puede converir el valor directamente a un número.						
			$("#spanG").text($(this).val());
			ball.pos2D=pos0;			
			velo0= new Vector2D(vIni,0);
			acc= new Vector2D(0,g*1);
			t=0;			
			animTime=Math.sqrt(2*pos0.y/acc.y)+tDrop*1;		//Tiempo de caida mas el recorrido					
			console.log("Gravity: "+ acc.y);
			console.log("Anitime: "+ animTime);
			board.update();	
		});

		$("#sliderV").bind( "input change", function(event, ui) {  		  		
			vIni=$(this).val()*1;					//Buscar si se puede converir el valor directamente a un número.						
			$("#spanV").text("Velocidad horizontal constante: " +$(this).val());
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

		$("#sliderD").bind( "input change", function(event, ui) {  		  		
			distance=$(this).val();						//Buscar si se puede converir el valor directamente a un número.									
			dropD=distance*1;
			$("#spanD").text("Distancia para soltar la caja: " + $(this).val());     

			
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
	    var Yunits;

    $('.Yaxis-select').change(function () { 
      Xselected=$('.Xaxis-select option:selected').val();
      Yselected=$('.Yaxis-select option:selected').val();
      XselectedText=$('.Xaxis-select option:selected').text();
      YselectedText=$('.Yaxis-select option:selected').text(); 
      GraphType=Xselected+" vs "+Yselected;
      console.log(GraphType);

      if(Yselected=="Horizontal Speed") {Yunits="m/s";}
      if(Yselected=="Horizontal Distance") {Yunits="m";}
      if(Yselected=="Height") {Yunits="m";}

      ejeY.setAttribute({name: function() { 
              return '$('+Yunits+')$';
            }});  
      reset(); 
    });   

		//------------------------Validación------------------------------


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
        path: 'bundle/Activity4/',
        mode: 'both',
        language: lang,
        callback: function() {
          $("#headerTitle").text(msg_headerTitle);
          $("#headerInstructions").text(msg_headerInstructions);
          $("#pInstructions").text(msg_pInstructions);
          $("#hsTitle").text(msg_hsTitle);
          $("#StartBtn").text(msg_StartBtn);
          $("#ResetBtn").text(msg_ResetBtn);
          $("#gsTitle").text(msg_gsTitle);
          $("#ejeX").text(msg_ejeX);          
		  $("#ejeY").text(msg_ejeY);
		  $("#lblH").text(msg_lblH);
		  $("#lblV").text(msg_lblV);
		  $("#lblD").text(msg_lblD);
		  $("#lblHS").text(msg_lblHS);
		  $("#lblHD").text(msg_lblHD);
		  $("#lblT").text(msg_lblT);          
          
          ejeX0.setAttribute({name: function() { 
                        return msg_ejeX0;
                      }});
          ejeY0.setAttribute({name: function() { 
                        return msg_ejeY0;
                      }});


            }          
          });
      }
};

		
	