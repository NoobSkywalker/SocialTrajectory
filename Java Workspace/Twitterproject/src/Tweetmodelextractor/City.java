package Tweetmodelextractor;

/**
* Class representing a city from geocities
* 
*/


public class City {

	String name;
	float lat;
	float longi;
	float population;
	
	
	public  City(String n, String l, String longitude, String population)
	{
	this.name=n;
	this.lat=Float.parseFloat(l);
	this.longi=Float.parseFloat(longitude);
	this.population=Float.parseFloat(population);
	}
}
