Steps for installing node manager:
(1). Extract the zip file, jithin_perumpraljohn_aw.zip.
(2). Open the nodeauth folder.
(3). Run the command npm install from this folder. All the required libaries will be picked from package.json.

MongoDB:
(1). Install mongodb instance, and the hostname will be localhost, and port will be 27017.
(2). Start the instance.
(3). Create the db "nodeauth" and collection named users "users" 
(4). Import the data, mongo_data.json to this user collections.

Running the server in local host
(1). Run the command npm start from nodeauth folder.
(2). Open the port 3000
(3). In the chrome browser, open the url: "http://localhost:3000/users/login"
(4). Login with any of the users, aaa, bbb, ccc, with the password 123.


Importing the chrome extension
(1). In chrome browser open the More tools-> Extensions.
(2). Click on load unpacked.
(3). Select the folder chrome_ext in the unpacked folder.
(4). Import all the three files.


