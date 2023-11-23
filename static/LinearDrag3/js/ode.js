function f(t, x) {
      return [9.8-0.5*x];
    }
    
    function ode(P,N) {
      return JXG.Math.Numerics.rungeKutta('heun', [P.Y()], [P.X(), P.X()+N], 200, f);
    }

    function plotFunction(jsxBoard) {
        var P=jsxBoard.create('point',[0,1], {name:'P',visible:true});
        var N=10;
        var curvaSol = jsxBoard.create('curve', [[0],[0]], {strokeColor:'red', strokeWidth:'2', visible:true});
        
        curvaSol.updateDataArray = function() {
          var data = ode(P,N);
          var h = N/200;
          this.dataX = [];
          this.dataY = [];
          for(var i=0; i<data.length; i++) {
            this.dataX[i] = P.X()+i*h;
            this.dataY[i] = data[i][0];
          }
        };
    }



    //-------------------Ecuacion Diferencial-----------------------------//
/*    var P = boardGraphPlot.create('point',[0,1], {name:'P',visible:false});
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
    }*/