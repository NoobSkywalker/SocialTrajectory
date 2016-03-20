        /**
* class that represents a topic
*  
*/  


function topic(wterm)
{
	this.term=wterm;
	this.avgsent=0;
	this.amount=0;
	this.cred=0;
	this.appearences = [];
	this.addpos = function() {
	
	this.avgsent+=1;
	
	}
	
		this.addneg = function() {
	
	this.avgsent-=1;
	
	}
	
	this.addcred = function(credvalue) {
	
	this.cred+=credvalue;
	
	}
	
		this.getavgsent = function() {
	
	return this.avgsent;
	
	}
	
		this.getavgcred = function() {
	
	return (this.cred/this.amount);
	
	}
	
		this.increaseamount = function() {
	
	this.amount+=1;
	
	}
	
}