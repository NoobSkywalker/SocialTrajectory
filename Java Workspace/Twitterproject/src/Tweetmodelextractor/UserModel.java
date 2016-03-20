package Tweetmodelextractor;


import java.util.Date;

/**
 * Class that  represents the User Model
 * 
 */
public class UserModel {
	
	
	public Date creationDate;
	public String Description;
	public String language;
	public int listedCount;
	public String profileimage;
	public Boolean isVerified;
	public boolean isProtected;
	public String userName;
	public String userURL;
	public long id;
	
	public UserModel(Date creationDate, String description, String language,
			int listedCount, String profileimage, Boolean isVerified,
			boolean isProtected, String userName, String userURL,long userid) {
		super();
		
		
			  
			 // Date tempdate =sf.parse(creationDate);
			this.creationDate = new java.sql.Timestamp(creationDate.getTime() );
			
		
	   
		
	
		Description = description;
		this.language = language;
		this.listedCount = listedCount;
		this.profileimage = profileimage;
		this.isVerified = isVerified;
		this.isProtected = isProtected;
		this.userName = userName;
		this.userURL = userURL;
		this.id= (userid);
	}
	
	public UserModel()
	{
	this.id=0;
	}
	
	
}
