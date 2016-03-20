package Tweetmodelextractor;

import java.math.BigInteger;
import java.sql.Date;
import java.sql.Timestamp;
/**
 * Class that represents a cluster
 * @deprecated
 * 
 */
public class TweetClusterModel {
	
	public long id;
	public float latitude;
	public float longitude;
	public long postDate;
	
	public TweetClusterModel(long i,float lat, float longi, Timestamp pd)
	{
	this.id=i;
	this.latitude=lat;
	this.longitude=longi;
	
	this.postDate=pd.getTime();
	}

}
