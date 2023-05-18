# College Spending app for BHTS Hackathon  
By  
Marc DeCarlo, Warren Wu, Jalal-Abdul Yahaya, Michael Rieger, Luke Cusato  

# To set-up  
```  
git clone https://github.com/mdecarlo26/BHTS_Hackathon.git  
cd api  
npm install  
npm install express  
npm install joi  
npm install cors  
npm install knex pg  
npm install uuid  
cd ../website/my-app
npm install  
npm install "react-router-dom"
```  

# To initialize DB  
You will need to set up your DB in the api/db/db.config.js file. Change all of the parameters to match your local DB. After initializing config, do this: 
**From Command line**  
```  
cd api/db
node initDB.js
```  
 


# File Organization  
React app lives in the website directory while the api lives in the api directory  


# More to Come