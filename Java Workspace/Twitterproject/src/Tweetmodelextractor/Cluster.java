package Tweetmodelextractor;

import java.sql.Timestamp;
import java.util.ArrayList;

/**
* Class that represents a cluster
* @Deprecated
*/


public class Cluster {

	ArrayList<TweetClusterModel> Tweets;
	double lati;
	double longi;
	int size;
	Timestamp avgTime;
	
	public Cluster()
	{
		this.Tweets=new ArrayList<TweetClusterModel>();
	}
	
	
	public void calculateCentroid()
	{
		double sum_x=0;
		double sum_y=0;
		double sum_z=0;
		
		for ( TweetClusterModel tweets :this.Tweets)
		{
		
			    
					double lat = Math.toRadians(tweets.latitude);
			       double lon = Math.toRadians(tweets.longitude);
			        
			        sum_x = sum_x + Math.cos(lat) * Math.cos(lon);
			        sum_y = sum_y + Math.cos(lat) * Math.sin(lon);
			        sum_z = sum_z + Math.sin(lat);
		} 
				double avg_x = sum_x / this.Tweets.size();
				double avg_y = sum_y / this.Tweets.size();
			    double avg_z = sum_z / this.Tweets.size();
			   double center_lon = Math.atan2(avg_y,avg_x);
			   double hyp = Math.sqrt(avg_x*avg_x + avg_y*avg_y) ;
			    double center_lat = Math.atan2(avg_z, hyp);
		
			    this.lati = Math.toDegrees(center_lat);
			    this.longi =Math.toDegrees(center_lon);
			    this.size = this.Tweets.size();
		
		
	}
	
	
	public void calculateAverageTime()
	{
		long averageTime=0;
		
		
		for ( TweetClusterModel tweets :this.Tweets)
		{
		
			    
					averageTime+= tweets.postDate;
		} 
			this.avgTime = new Timestamp((averageTime/this.Tweets.size()));
		
		
	}
	
}
