package Tweetmodelextractor;

import org.jsoup.Connection;
import org.jsoup.select.Evaluator.Class;
import org.postgresql.PGConnection;

import com.aliasi.util.Math;
import com.csvreader.CsvReader;
import com.sleepycat.je.log.FileReader;

/**
 * Handles the preprocessing step and adds all tweets from the tweetdata csv to
 * the postgresql database.
 *
 */
public class modelextractor {

	private final static String DBNAME = "thesis";
	private final static String pass = "lachen";
	//private final static String DBNAME = "michaelhundt";

	// static String[] event2files =
	// {"F:/tweetdata/thesis/2014_02_02_11.csv","F:/tweetdata/thesis/2014_02_02_13.csv","F:/tweetdata/thesis/2014_02_02_14.csv","F:/tweetdata/thesis/2014_02_02_15.csv","F:/tweetdata/thesis/2014_02_02_16.csv","F:/tweetdata/thesis/2014_02_02_17.csv","F:/tweetdata/thesis/2014_02_02_18.csv","F:/tweetdata/thesis/2014_02_02_19.csv","F:/tweetdata/thesis/2014_02_02_20.csv","F:/tweetdata/thesis/2014_02_02_21.csv","F:/tweetdata/thesis/2014_02_02_22.csv","F:/tweetdata/thesis/2014_02_02_23.csv"}
	// ;
	// "I:/tweetdata/thesis2/2014_02_20_11.csv","I:/tweetdata/thesis2/2014_02_20_12.csv","I:/tweetdata/thesis2/2014_02_20_13.csv","I:/tweetdata/thesis2/2014_02_20_14.csv","I:/tweetdata/thesis2/2014_02_20_15.csv","I:/tweetdata/thesis2/2014_02_20_16.csv","I:/tweetdata/thesis2/2014_02_20_17.csv","I:/tweetdata/thesis2/2014_02_20_18.csv","I:/tweetdata/thesis2/2014_02_20_19.csv","I:/tweetdata/thesis2/2014_02_20_20.csv","I:/tweetdata/thesis2/2014_02_20_21.csv","I:/tweetdata/thesis2/2014_02_20_22.csv","I:/tweetdata/thesis2/2014_02_20_23.csv
	static String[] event2files = { "./data/2013_04_15_20.csv", "./data/2013_04_15_21.csv", "./data/2013_04_15_22.csv", "./data/2013_04_15_23.csv" };
	private static String stopwords_path = "./classifiers/stopwords.txt";
	private static String cities1000_path = "./data/cities1000.txt";
	// static String[] event2files =
	// {"I:/tweetdata/boston/2013_04_15_20.csv","I:/tweetdata/boston/2013_04_15_21.csv","I:/tweetdata/boston/2013_04_15_22.csv","I:/tweetdata/boston/2013_04_15_23.csv"}
	// ;

	static HashMap<String, Integer> ids = new HashMap<String, Integer>();
	static Map<String, Integer> keywordscount = new HashMap<String, Integer>();
	static Map<String, Integer> entitycount = new HashMap<String, Integer>();
	static CsvReader products;
	static String tweetScreenName;
	static ArrayList<City> allcities;
	static HashMap<String, String> stopwordshm = new HashMap<String, String>();
	static int cids = 0;
	static TopicClassification classifier;
	static AbstractSequenceClassifier<CoreLabel> entityclassifier;

	/**
    * Creates the tables first. Then goes for each tweet in the csv. and adds them to the database after preprocessing
    *
    */
	public static void main(String[] args) {

	// Create Tweet and Hashtag tables first

	
//	 Initialize TopicClassification
	 classifier = new TopicClassification(); 
	 try{
		 classifier.trainclassifier(); }
	 catch (Exception e) {
		 
	 }
	 
//	 event2files = read_csv_from_dir("./data/");
	

//	createTables_hashtagtweets();
	 createTable_hashtags();
//	createWordTable();
//	createTable_tweetdata();

//	// Process tweets and create tweedata Tables;
//	 processTweetsandAddToDB();
//
//	 //Create HashtagList
	 countwords();
//
	 counthashtags();
	 createHashtagTweets();
//	 
//	 System.out.println("fine so far");

	 
	 
	// BEGIN CLUSTERING
//	 Create Cluster Tables for Caching ( Not needed in currentvers )
//	 createClusterTables();
	
//	try{ Statement s = getDBConnection().createStatement(); 
//		String gethashtags = "SELECT * FROM hashtags"; 
//		ResultSet f = s.executeQuery(gethashtags);
//		int size=0; 
//		while(f.next())  {
//			calculateClusters(f.getString("hashtag")); size++;
//		} System.out.println(size); 
//	}
//	catch (Exception e) {
//    }

	// END CLUSTERING

	//

	// BEGIN UPDATE CATEGORIES
	// Update data to categories only needed if data is without categories in
	// the dataset.

	
	 classifier = new TopicClassification(); 
	 try {
		 classifier.trainclassifier(); 
	 }
	 catch (Exception e) {
	 } 
	 
	 int processamount=10000;
	 for ( int i=0; i<810081;i++) {
		 if(i % 10000==0) {
		 } 
		 System.out.println("Processed: "+i);
		 generateCategories(processamount,0);
	  
		 i+=processamount; 
		 
	 } //END UPDATE CATEGORIES
	  
	  //GENERATE SIMILAR TWEETS
	 

	//

	// GENERATE ENTITY TWEETS

	 String serializedClassifier = "classifiers/english.all.3class.distsim.crf.ser.gz"; 
	 try {
		 entityclassifier = CRFClassifier.getClassifier(serializedClassifier); 
	 }
	 catch (Exception e) { 
		 System.out.println(e); 
	 }
	  generateSimilarTweets(8356202,0); 
	  
	
		
	}

	/**
	 * Go through whole directory and retrieve the csv files as a list
	 * @param directory
	 * @return
	 */
	private static String[] read_csv_from_dir(String directory) {
		File folder = new File(directory);
		File[] listOfFiles = folder.listFiles();
		
		String filelist = "";

		for (int i = 0; i < listOfFiles.length; i++) {
		  File file = listOfFiles[i];
		  if (file.isFile() && file.getName().endsWith(".csv")) {
			  filelist += directory+file.getName()+",";
		  } 
		}
		int lastIndex = filelist.lastIndexOf(",");
		filelist = filelist.substring(0, lastIndex);
		
		String[] asList = filelist.split(",");
		
		return asList;
	}

	/**
	 * Creates the hashtagtweets table
	 *
	 */
	public static void createTables_hashtagtweets() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// execution table queries
			s.execute("drop table IF EXISTS hashtagtweets");
			s.execute("create table hashtagtweets (\"tweetid\" bigint NOT NULL ,\"hashtagid\" bigint NOT NULL)");

			// processallTweetsfromcsv

			s.close(); // close statement when finished
		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	/**
	 * Starts a connection and process all tweets
	 *
	 */

	public static void processTweetsandAddToDB() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=postgres
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			processTweets(s);

			s.close(); // close statement when finished
		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	/**
	 * Creates the tweetdata table
	 *
	 */
	public static void createTable_tweetdata() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// execution table queries
			s.execute("drop table IF EXISTS tweetdata");
			s.execute(
					"create table tweetdata (\"creationdate\" timestamp NULL DEFAULT NULL ,\"tweetContent\" varchar(256) DEFAULT NULL, \"tweetUser\" varchar(256), \"tweetScreenName\" varchar(120), \"latitude\" float8 DEFAULT NULL, \"longitude\" float8 DEFAULT NULL, \"userStatusCount\" int DEFAULT NULL, \"userFollowers\" int DEFAULT NULL, \"userLocation\" varchar(256), \"userFriendscount\" int DEFAULT NULL,\"tweetid\" bigint primary key NOT NULL,\"language\" varchar(256) DEFAULT NULL,\"place\" varchar(256) DEFAULT NULL,\"retweetcount\" int DEFAULT NULL,\"replytostatus\" bigint DEFAULT NULL,\"replytousername\" varchar(256) DEFAULT NULL,\"containsUrl\" boolean DEFAULT NULL,\"authordescription\" boolean DEFAULT NULL,\"userlistedcount\" int DEFAULT NULL,\"userCreationdate\" timestamp NULL DEFAULT CURRENT_TIMESTAMP, \"keywords\" varchar(256) DEFAULT NULL,\"datasetid\" int DEFAULT NULL,\"sentiment\" int DEFAULT NULL,\"ccitylat\" float8 DEFAULT NULL,\"ccitylong\" float8 DEFAULT NULL,\"ccityname\" varchar(256) DEFAULT NULL,\"category\" varchar(256) DEFAULT NULL);");
			s.execute("SELECT AddGeometryColumn(\'public\',\'tweetdata\',\'polygeo\',\'-1\',\'POINT\',2);");

			// processallTweetsfromcsv

			s.close(); // close statement when finished
		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	/**
	 * adds all tweets that contain the hashtag x to it
	 */

	public static void createHashtagTweets() {

		String statem = "";
		String clusterquery = "";
		String updatestatement = "";

		try {

			Connection connectionone = getDBConnection();
			Connection connectiontwo = getDBConnection();
			Statement s = connectionone.createStatement();
			Statement k = connectionone.createStatement();
			String queryhashes = "SELECT * FROM hashtags";

			ResultSet hashes = s.executeQuery(queryhashes);

			Statement u = connectiontwo.createStatement();

			while (hashes.next()) {
				String tweetsforhashquery = "SELECT * FROM tweetdata  WHERE LOWER(\"tweetContent\") LIKE '% "
						+ hashes.getString("hashtag") + "'  OR LOWER(\"tweetContent\")  LIKE '"
						+ hashes.getString("hashtag") + " %'  OR LOWER(\"tweetContent\")  LIKE '% "
						+ hashes.getString("hashtag") + " %'" + "  OR LOWER(\"tweetContent\") LIKE '"
						+ hashes.getString("hashtag") + "'";

				ResultSet r = k.executeQuery(tweetsforhashquery);

				while (r.next()) { // iterate while there are tweets to
									// retrieve.

					long hashid = hashes.getLong("hashtagid");
					long tweetid = r.getLong("tweetid");

					String insertstatement = "INSERT INTO \"hashtagtweets\" (\"hashtagid\",\"tweetid\") VALUES  ("
							+ "\'" + hashid + "\'" + "," + "\'" + tweetid + "\'" + ");\n";

					u.executeUpdate(insertstatement);

				}
				System.out.println("Updated: " + hashes.getString("hashtag"));
			}
			connectionone.close();
			connectiontwo.close();

		}

		catch (Exception ex) {

			System.out.println(updatestatement);
			ex.printStackTrace();
		}
	}

	/**
	 * Classifies each tweet with a topic
	 *
	 * @param processamount the amount of tweets that shall be classified
	 * @param the offset from where it shall start
	 */
	public static void generateCategories(int processamount, int offset) {

		String statem = "";
		String clusterquery = "";
		String updatestatement = "";

		try {

			Connection connectionone = getDBConnection();
			Connection connectiontwo = getDBConnection();
			Statement s = connectionone.createStatement();
			String query = "SELECT * FROM tweetdata WHERE category is NULL LIMIT " + processamount + " OFFSET "
					+ offset;

			ResultSet r = s.executeQuery(query);

			Statement u = connectiontwo.createStatement();

			ArrayList<TweetClusterModel> resultTweets = new ArrayList<TweetClusterModel>();

			while (r.next()) { // iterate while there are tweets to retrieve.

				String[] keywordsplit = r.getString("TweetContent").split(" ");
				TweetModel tweet = new TweetModel(r);

				String cat = classifier.getCategory(tweet);

				TweetClusterModel temptweet = new TweetClusterModel(r.getLong("tweetid"), r.getFloat("ccitylat"),
						r.getFloat("ccitylong"), r.getTimestamp("creationDate"));
				resultTweets.add(temptweet);

				updatestatement = "UPDATE tweetdata set category=\'" + cat + "\' WHERE tweetid= \'" + temptweet.id
						+ "\'";
				u.executeUpdate(updatestatement);

			}
			connectionone.close();
			connectiontwo.close();

		}

		catch (Exception ex) {

			System.out.println(updatestatement);
			ex.printStackTrace();
		}

	}

	/**
	 * Groups tweets by similarity
	 *
	 * @param processamount,the amount of tweets that shall be grouped
	 * @param the offset from where it shall start
	 */
	public static void generateSimilarTweets(int processamount, int offset) {

		String statem = "";
		String clusterquery = "";
		String updatestatement = "";

		try {

			Connection connectionone = getDBConnection();
			Connection connectiontwo = getDBConnection();
			Statement s = connectionone.createStatement();
			String query = "SELECT * FROM tweetdata LIMIT " + processamount + " OFFSET " + offset;

			ResultSet r = s.executeQuery(query);
			ResultSet t = r;

			Statement u = connectiontwo.createStatement();

			ArrayList<TweetModel> resultTweets = new ArrayList<TweetModel>();
			AbstractStringMetric metric = new Levenshtein();
			while (r.next()) { // iterate while there are tweets to retrieve.

				String[] keywordsplit = r.getString("TweetContent").split(" ");
				TweetModel tweet = new TweetModel(r);

				// get PERSONS FROM Tweet
				String person = getEntity(tweet.Content);

				if (entitycount.containsKey(person)) {
					entitycount.put(person, entitycount.get(person) + 1);
					// System.out.println(keywordsplit[i]);
				} else {
					entitycount.put(person, 0);
				}

				resultTweets.add(tweet);

			}

			entitycount = MapUtil.sortByValue(entitycount);
			int counter = 0;
			for (Map.Entry<String, Integer> e : entitycount.entrySet()) {

				counter++;
				if (counter == 100)
					break;
			}
			/*
			 * for (int i=0; i<resultTweets.size();i++) { ArrayList<TweetModel>
			 * similarones = new ArrayList<TweetModel>();
			 * 
			 * for (int k=0; k<resultTweets.size();k++) { float result =
			 * metric.getSimilarity(resultTweets.get(i).Content,
			 * resultTweets.get(k).Content); //System.out.println("i,k "
			 * +i+","+k); if(result>0.4) { similarones.add(resultTweets.get(k));
			 * resultTweets.remove(resultTweets.get(k)); } }
			 * System.out.println(i); }
			 */

			connectionone.close();
			connectiontwo.close();

		}

		catch (Exception ex) {

			System.out.println(updatestatement);
			ex.printStackTrace();
		}

	}

	public static Connection getDBConnection() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes

		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		}
		return conn;
	}

	public static void createdatasetTable() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// execution table queries
			s.execute("drop table IF EXISTS dataset");
			s.execute(
					"create table dataset (\"datasetid\" bigint primary key NOT NULL ,\"name\" varchar(256) DEFAULT NULL, \"description\" varchar(1000), \"keywords\" varchar(120), \"timespan\" varchar(120) DEFAULT NULL)");
					// s.execute("SELECT
					// AddGeometryColumn(\'public\',\'tweetdata\',\'polygeo\',\'-1\',\'POINT\',2);");

			// processallTweetsfromcsv

			// processTweets(s);

			s.close(); // close statement when finished
		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	public static void createTable_hashtags() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// Drop and create the hashtags table
			s.execute("drop table IF EXISTS hashtags");
			s.execute(
					"create table hashtags (\"hashtagid\" bigint primary key NOT NULL ,\"hashtag\" varchar(256) DEFAULT NULL, \"frequency\" int, \"relatedkeywords\" varchar(500),datasetid bigint)");

			s.close();

		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	public static void createSimilartweetsTable() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// Drop and create the hashtags table
			s.execute("drop table IF EXISTS similartweets");
			s.execute(
					"create table similartweets (\"similartweetsid\" bigint primary key NOT NULL ,\"importanttag\" varchar(256) DEFAULT NULL, \"frequency\" int, \"relatedkeywords\" varchar(500),datasetid bigint)");

			s.close();

		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	public static String getEntity(String str) throws Exception {

		String[] classified = entityclassifier.classifyToString(str).split(" ");
		String person = "";
		for (int i = 0; i < classified.length; i++) {
			if (classified[i].contains("/PERSON")) {
				person = (classified[i].replace("/PERSON", ""));
			}
		}

		return person;

		/*
		 * For the hard-coded String, it shows how to run it on a single
		 * sentence, and how to do this and produce several formats, including
		 * slash tags and an inline XML output format. It also shows the full
		 * contents of the {@code CoreLabel}s that are constructed by the
		 * classifier. And it shows getting out the probabilities of different
		 * assignments and an n-best list of classifications with probabilities.
		 */
		/*
		 * String[] example = {"Good afternoon Rajat Raina, how are you today?",
		 * "I go to school at Stanford University, which is located in California."
		 * }; for (String str : example) {
		 * System.out.println(entityclassifier.classifyToString(str)); }
		 * System.out.println("---");
		 * 
		 * for (String str : example) { // This one puts in spaces and newlines
		 * between tokens, so just print not println.
		 * System.out.print(entityclassifier.classifyToString(str, "slashTags",
		 * false)); } System.out.println("---");
		 * 
		 * for (String str : example) { // This one is best for dealing with the
		 * output as a TSV (tab-separated column) file. // The first column
		 * gives entities, the second their classes, and the third the remaining
		 * text in a document
		 * System.out.print(entityclassifier.classifyToString(str,
		 * "tabbedEntities", false)); } System.out.println("---");
		 * 
		 * for (String str : example) {
		 * System.out.println(entityclassifier.classifyWithInlineXML(str)); }
		 * System.out.println("---");
		 * 
		 * for (String str : example) {
		 * System.out.println(entityclassifier.classifyToString(str, "xml",
		 * true)); } System.out.println("---");
		 * 
		 * for (String str : example) {
		 * System.out.print(entityclassifier.classifyToString(str, "tsv",
		 * false)); } System.out.println("---");
		 * 
		 * // This gets out entities with character offsets int j = 0; for
		 * (String str : example) { j++; List<Triple<String,Integer,Integer>>
		 * triples = entityclassifier.classifyToCharacterOffsets(str); for
		 * (Triple<String,Integer,Integer> trip : triples) { System.out.printf(
		 * "%s over character offsets [%d, %d) in sentence %d.%n", trip.first(),
		 * trip.second(), trip.third, j); } } System.out.println("---");
		 * 
		 * // This prints out all the details of what is stored for each token
		 * int i=0; for (String str : example) { for (List<CoreLabel> lcl :
		 * entityclassifier.classify(str)) { for (CoreLabel cl : lcl) {
		 * System.out.print(i++ + ": ");
		 * System.out.println(cl.toShorterString()); } } }
		 * 
		 * System.out.println("---");
		 * 
		 */

	}

	public static void createWordTable() {
		Connection conn = null;
		try {
			Class.forName("org.postgresql.Driver"); // create postgresql driver
			String url = "jdbc:postgresql://localhost:5432/" + DBNAME; // connection
																		// string
																		// using
																		// localhost
																		// and
																		// postgis
																		// database
			conn = DriverManager.getConnection(url, "postgres", pass); // connect
																			// to
																			// database
																			// with
																			// username=postgres
																			// and
																			// //password=123456
			((PGConnection) conn).addDataType("geometry", org.postgis.PGgeometry.class); // add
																							// support
																							// for
																							// Geometrytypes
			Statement s = conn.createStatement(); // create query statement

			// Drop and create the hashtags table
			s.execute("drop table IF EXISTS words");
			s.execute(
					"create table words (\"wordid\" bigint primary key NOT NULL ,\"word\" varchar(256) DEFAULT NULL, \"frequency\" int, \"relatedkeywords\" varchar(500), datasetid bigint)");

			s.close();

		} catch (Exception ex) {
			System.err.println(ex);
			ex.printStackTrace();
		} finally {
			if (conn != null) {
				try {
					conn.close(); // close connection when finished
				} catch (Exception ex) {
				}
			}
		}
	}

	public static void countwords() {
		String statem = "";
		try {
			String query = "SELECT * FROM tweetdata";
			Statement s = getDBConnection().createStatement();
			ResultSet r = s.executeQuery(query);

			while (r.next()) {

				String[] keywordsplit = r.getString("TweetContent").split(" ");

				for (int i = 0; i < keywordsplit.length; i++) {

					String normalized = "";
					if (keywordsplit[i].length() < 4) {
						continue;
					}

					normalized = keywordsplit[i].toLowerCase();

					if (keywordscount.containsKey(normalized)) {
						keywordscount.put(normalized, keywordscount.get(normalized) + 1);
						// System.out.println(keywordsplit[i]);
					} else {
						keywordscount.put(normalized, 0);
					}

				}

			}

			keywordscount = MapUtil.sortByValue(keywordscount);
			int counter = 0;

			for (Map.Entry<String, Integer> e : keywordscount.entrySet()) {

				System.out.println(e.getKey() + " = " + e.getValue());
				// TODO
				// statem = "INSERT INTO \"words\"
				// (\"wordid\",\"word\",\"frequency\") VALUES
				// ("+counter+","+"\'"+e.getKey()+"\',"+e.getValue()+");";
				// s.execute(statem);
				counter++;
				if (counter == 500)
					break;

			}

		} catch (Exception ex) {
			System.out.println(statem);
			ex.printStackTrace();
		}
	}

	public static void counthashtags() {
		String statem = "";
		try {
			String query = "SELECT * FROM tweetdata";
			Statement s = getDBConnection().createStatement();
			ResultSet r = s.executeQuery(query);
			Map<String, Integer> keywordsinthisTweet;

			while (r.next()) { // iterate while there are polygons to retrieve

				String[] keywordsplit = r.getString("TweetContent").split(" ");

				keywordsinthisTweet = new HashMap<String, Integer>();

				for (int i = 0; i < keywordsplit.length; i++) {

					String normalized = "";

					if (keywordsplit[i].length() < 4) {
						continue;
					}
					if (!keywordsplit[i].contains("#")) {

						continue;
					}
					normalized = keywordsplit[i].toLowerCase();

					if (keywordsinthisTweet.containsKey(normalized)) {
						continue;
					}

					if (keywordscount.containsKey(normalized)) {
						keywordscount.put(normalized, keywordscount.get(normalized) + 1);
						// System.out.println(keywordsplit[i]);
					} else {
						keywordscount.put(normalized, 0);
					}
					keywordsinthisTweet.put(normalized, 0);

				}

			}

			keywordscount = MapUtil.sortByValue(keywordscount);
			int counter = 0;

			for (Map.Entry<String, Integer> e : keywordscount.entrySet()) {

				System.out.println(e.getKey() + " = " + e.getValue());
				
				// TODO
				
				if (e.getKey().contains("?"))
					continue;
				
				if (e.getKey().contains("#")) {
						statem = "INSERT INTO \"hashtags\" (\"hashtagid\",\"hashtag\",\"frequency\") VALUES (" + counter + ","
						+ "\'" + e.getKey() + "\'," + e.getValue() + ");";
						s.execute(statem);
						counter++;
				}
				if (counter == 500)
					break;

			}

		} catch (Exception ex) {
			System.out.println(statem);
			ex.printStackTrace();
		}
	}

	public static void processTweets(Statement st) {
		int idCount = 0;
		int failureCount = 0;
		ArrayList<TweetModel> alltweets = new ArrayList<TweetModel>();
		SentimentClassifier sentClassifier;
		sentClassifier = new SentimentClassifier();

		for (int t = 0; t < event2files.length; t++) {
			keywordscount = new HashMap<String, Integer>();
			try {
				String filepath = event2files[t].trim();
				CsvReader products = new CsvReader(filepath, '\t');
				CsvReader cities = new CsvReader(cities1000_path, '\t');
				System.out.println(event2files[t]);
				products.readHeaders();

				for (int i = 0; i < products.getHeaders().length; i++) {
					// System.out.println(products.getHeaders()[i]);
				}

				try {
					BufferedReader textIn = new BufferedReader(new FileReader(stopwords_path));
					String curLine = null;

					while ((curLine = textIn.readLine()) != null) {
						curLine = curLine.trim();
						stopwordshm.put(curLine, curLine);

					}

				} catch (Exception e) {

				}

				BufferedWriter writer = null;
				try {
					writer = new BufferedWriter(new FileWriter("./sql/writer.sql"));

				} catch (IOException e) {

				}
				allcities = new ArrayList<City>();
				cities.setSafetySwitch(false);
				while (cities.readRecord()) {
					allcities.add(new City(cities.get(1), cities.get(4), cities.get(5), cities.get(14)));
				}
				// System.out.println(allcities.size());

				boolean skipword = false;

				while (products.readRecord()) {
					// Tweetdetails
					String creationDate = products.get("TWEET_CREATIONDATE");
					String tweetContent = products.get("TWEET_CONTENT");
					String tweetreplytostatus = products.get("TWEET_REPLYTOSTATUS");
					String tweetreplytousername = products.get("TWEET_REPLYTOUSERNAME");
					String tweetreplytouserid = products.get("TWEET_REPLYTOUSERid");
					String tweetplace = products.get("TWEET_PLACE");
					String tweetfavourited = products.get("TWEET_FAVORITED");
					String tweetretweetcount = products.get("TWEET_RETWEETCOUNT");
					tweetplace = tweetplace.replace("'", " ");
					int sentiment = 1;
					String sent = sentClassifier.classify(tweetContent);
					/*
					 * if( tweetContent.contains("marathon")==false) {
					 * 
					 * continue;
					 * 
					 * }
					 */

					if (sent.contains("pos")) {
						sentiment = 1;
					}
					if (sent.contains("neg")) {
						sentiment = -1;
						// System.out.println(tweetContent);
					}
					if (sent.contains("neu")) {
						sentiment = 0;
					}
					// System.out.println("Sentiment: " + sentiment);
					tweetContent = tweetContent.replace("\\", "\\\\");
					tweetContent = tweetContent.replace("'", "");
					String tweetUser = products.get("USER_NAME");
					tweetUser = tweetUser.replace("'", " ");
					tweetScreenName = products.get("USER_SCREENNAME");
					String coordinates = products.get("TWEET_COORDS");
					String language = products.get("USER_LANGUAGE");

					// if no geotagg or not english skip it...
					if (coordinates == null || coordinates.contains("null") || coordinates == ""
							|| coordinates.split(",").length < 2 || !language.contains("en")) {

						continue;

					}

					String keywordtemp = tweetContent;
					keywordtemp = keywordtemp.replaceAll("[-+^#!?,.()@�����]*", "");
					keywordtemp = keywordtemp.replaceAll("[^\\p{L}\\p{Nd}]", " ");
					String[] keywordsplit = keywordtemp.split(" ");
					String alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGLMNOPQRSTUVWXYZ�����";

					for (int i = 0; i < keywordsplit.length; i++) {
						if (stopwordshm.containsKey(keywordsplit[i])) {
							keywordtemp = keywordtemp.replaceAll(keywordsplit[i], "");
							// System.out.println(keywordsplit[i]);
						}
						if (keywordsplit[i].contains("http")) {
							keywordtemp = keywordtemp.replace(keywordsplit[i], "");
						}

						if (keywordsplit[i].length() < 4) {
							// System.out.println("AAAAAH" +keywordsplit[i]);
							keywordtemp = keywordtemp.replace(keywordsplit[i], "");
						}
						for (int z = 0; z < keywordsplit[i].length(); z++) {
							if (alphabet.indexOf(keywordsplit[i].charAt(z)) == -1) {
								keywordtemp = keywordtemp.replace(keywordsplit[i], "");
							}

						}

					}
					keywordtemp = keywordtemp.replaceAll("[-+^#!?,.()@�����]*", "");
					keywordtemp = keywordtemp.replaceAll("[^\\p{L}\\p{Nd}]", " ");

					keywordsplit = keywordtemp.split(" ");

					for (int i = 0; i < keywordsplit.length; i++) {
						if (keywordsplit[i].length() < 4) {
							continue;
						}
						if (keywordscount.containsKey(keywordsplit[i])) {
							keywordscount.put(keywordsplit[i], keywordscount.get(keywordsplit[i]) + 1);
							// System.out.println(keywordsplit[i]);
						} else {
							keywordscount.put(keywordsplit[i], 0);
						}

					}

					// Userdetails
					String Userstatusescount = products.get("USER_STATUSESCOUNT");
					String UserFollowers = products.get("USER_FOLLOWERSCOUNT");
					String UserLocation = products.get("USER_LOCATION");
					String UserFriendscount = products.get("USER_FRIENDSCOUNT");
					String UserCreationDate = products.get("USER_CREATIONDATE");
					String UserDescription = products.get("USER_DESCRIPTION");
					String UserListedCount = products.get("USER_LISTEDCOUNT");
					String tweetid = products.get("TWEET_ID");

					// if( coordinates==null || coordinates.contains("null") ||
					// coordinates=="" || coordinates.split(",").length<2 ||
					// tweetContent.contains("marathon")==false)

					if (!ids.containsKey(tweetid)) {
						TweetModel tempmodel = new TweetModel(keywordtemp, creationDate, coordinates, tweetContent,
								tweetUser, tweetScreenName, UserFollowers, UserFriendscount, Userstatusescount,
								language, tweetid, tweetplace, tweetretweetcount, tweetreplytostatus,
								tweetreplytousername, UserDescription, UserCreationDate, UserListedCount);

						// System.out.println(tweet.Content);

						String cat = classifier.getCategory(tempmodel);
						double distance = 1000000000;
						City closestc = null;

						for (City ci : allcities) {
							if (ci.population < 100000) {
								continue;
							}
							double delta = getDistanceInMeters(tempmodel, ci);
							// System.out.println(delta);
							if (delta < distance) {
								closestc = ci;
								distance = delta;
							}

						}
						// System.out.println("Closest city: "+ closestc.name +
						// " lat: " + closestc.lat + " long: "+ + closestc.longi
						// + " tlat: " + tempmodel.latitude + " tlong: "+
						// tempmodel.longitude );
						String statement = "";
						try {
							// csv OUTPUT
							// writer.append(""+tempmodel.date
							// +"\t"+tempmodel.Content+"\t"+tempmodel.Author+"\t"+tempmodel.screenname+"\t"+tempmodel.latitude
							// +"\t"+tempmodel.longitude
							// +"\t"+tempmodel.userstatscount +"\t" +
							// tempmodel.followers +"\t"+ tempmodel.friendscount
							// + "\t"+ tempmodel.id + "\t"+tempmodel.lang+
							// "\t"+tempmodel.tweetplace+
							// "\t"+tempmodel.tweetretweetcount+"\t"+tempmodel.tweetreplytostatus+"\t"+tempmodel.tweetreplytousername+
							// "\t"+tempmodel.containsurl+","+tempmodel.authordescription+"\t"+tempmodel.listedcount+
							// "\t"+tempmodel.userdate+ "t"+tempmodel.keywords+
							// "\t"+sentiment+"\n");
							statement = "INSERT INTO \"tweetdata\" (\"creationdate\",\"tweetContent\",\"tweetUser\",\"tweetScreenName\",\"latitude\",\"longitude\",\"userStatusCount\",\"userFollowers\",\"userFriendscount\",\"tweetid\",\"language\",\"place\",\"retweetcount\",\"replytostatus\",\"replytousername\",\"containsUrl\",\"authordescription\",\"userlistedcount\",\"userCreationdate\",\"keywords\",\"ccityname\", \"ccitylat\",\"ccitylong\",\"sentiment\", \"datasetid\", \"category\",polygeo) VALUES  ("
									+ "\'" + tempmodel.date + "\'" + "," + "\'" + tempmodel.Content + "\'" + "," + "\'"
									+ tempmodel.Author + "\'" + "," + "\'" + tempmodel.screenname + "\'" + ","
									+ tempmodel.longitude + "," + tempmodel.latitude + "," + "\'"
									+ tempmodel.userstatscount + "\'" + "," + tempmodel.followers + ","
									+ tempmodel.friendscount + "," + tempmodel.id + "," + "\'" + tempmodel.lang + "\'"
									+ "," + "\'" + tempmodel.tweetplace + "\'" + "," + tempmodel.tweetretweetcount + ","
									+ tempmodel.tweetreplytostatus + "," + "\'" + tempmodel.tweetreplytousername + "\'"
									+ "," + tempmodel.containsurl + "," + tempmodel.authordescription + "," + "\'"
									+ tempmodel.listedcount + "\'" + "," + "\'" + tempmodel.userdate + "\'" + "," + "\'"
									+ tempmodel.keywords + "\'" + "," + "\'" + getMysqlRealScapeString(closestc.name)
									+ "\'" + "," + closestc.lat + "," + closestc.longi + "," + "\'" + sentiment + "\',3"
									+ ",\'" + cat + "\'" + ",ST_GeomFromText(\'POINT(" + tempmodel.longitude + " "
									+ tempmodel.latitude + ")\',-1)" + ");\n";
							st.execute(statement);

						} catch (Exception e) {
							// e.printStackTrace();
							// System.out.println(statement);
							failureCount++;

						}
					}
					ids.put(tweetid, 0);

				}

				try {
					if (writer != null)
						writer.close();
				} catch (IOException e) {
				}

				keywordscount = MapUtil.sortByValue(keywordscount);
				int counter = 0;
				for (Map.Entry<String, Integer> e : keywordscount.entrySet()) {

					System.out.println(e.getKey() + " = " + e.getValue());
					counter++;
					if (counter == 100)
						break;

				}

				products.close();

			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}

		}

		System.out.println("Tweets with geotagg Found: " + ids.size());
		System.out.println("Skipped " + failureCount + " Tweets");
	}

	public static double getDistanceInMeters(TweetModel tm, City c) {
		double tmlat = Math.toRadians(tm.latitude);
		double tmlong = Math.toRadians(tm.longitude);
		double clat = Math.toRadians(c.lat);
		double clong = Math.toRadians(c.longi);
		float radiusOfEarth = 6371000;// Earth's radius in meters.
		double diffLatitude = clat - tmlat;
		double diffLongitude = clong - tmlong;
		double a = Math.sin(diffLatitude / 2) * Math.sin(diffLatitude / 2)
				+ Math.cos(tmlat) * Math.cos(clat) * Math.sin(diffLongitude / 2) * Math.sin(diffLongitude / 2);
		double dc = 2 * Math.asin(Math.sqrt(a));
		double distance = radiusOfEarth * dc;
		return distance;

	}

	public static String getMysqlRealScapeString(String str) {
		String data = null;
		if (str != null && str.length() > 0) {
			str = str.replace("\\", "\\\\");
			str = str.replace("'", "\\'");
			str = str.replace("\0", "\\0");
			str = str.replace("\n", "\\n");
			str = str.replace("\r", "\\r");
			str = str.replace("\"", "\\\"");
			str = str.replace("\\x1a", "\\Z");
			data = str;
		}
		return data;
	}

}
