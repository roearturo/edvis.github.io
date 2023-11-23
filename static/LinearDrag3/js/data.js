function Data (x,y,color) {	
	//if(typeof(radius)==='undefined') radius=20;
	if(typeof(color)==='undefined') color='#0000ff';
	if(typeof(x)==='undefined') x=0;
	if(typeof(y)==='undefined') y=0;
	 
	this.color=color;
 
	this.x=x;
	this.y=y;
 
}

Data.prototype={
	get X(){
		return this.x;			
	},
	set X (a){
		this.x = a;
		
	},
	get Y(){
		return this.y;			
	},
	set Y (b){
		this.x = b;
		
	}
};