# Spring-Foods Market Inventory Challenge

# Background Info
This application was written for a coding challenge.</br>
The challenge is to take process data files in '/files/', which include excel and pdf files of poorly formatted data and update the inventory of a grocery market using these data files. </br>
The program was written to calculate the amount of items remain on the shelf as of "2019-01-28". </br>
Further instructions can be found in '/project_instructions.pdf' </br>


# Instructions
## Running the app in the Terminal
This program was built using MySQL @5.7
### MySQL@5.7
Install MySQL@5.7
### Set up database
* Run the following commands in terminal to start MySQL & set up database/data tables</br>
  mysqld</br>
  mysql</br>
  mysql --host=localhost --user=[username] --password=[password]  < [full_path_to_/Spring-Foods/server/database/schema.sql]</br>
  in the file 'server/database/index.js', change the database to SpringFoods, host to localhost, and the user & password to your own login information for MYSQL. </br>
### Data Upload
Automated population of database with data files</br>
  cd into Spring-Foods directory</br>
  run the following command in terminal</br>
    npm run build</br>
### Final Answer to #3
  * to Count in-stock Items</br>
  * cd into Spring-Foods directory</br>
  * run the following command in terminal</br>
    npm run count</br>

## Web-based React App
### Set up aplication
  cd into Spring-Foods directory</br>
  run the following command in terminal</br>
    * install dependencies</br>
      npm install</br>
    * start up server</br>
      npm run start</br>
    * package react files (in case bundle is corrupted)</br>
      npm run build:react</br>

### Browser - UI-friendly
  in your browswer, go to "localhost:3000"</br>
  here, the default date "2019-01-28" is used. But you may change it to a different date to see how many items will remain on that date given that no new item will be sold. Change the date to anyday in the "YYYY-MM-DD" format and click submit.</br>

-----------------------------------------------------------------------

## 1. Why did you settle on this design? Justify any significant design decisions you made(tools you chose, etc.). What are the limitations of your design? What alternatives did you consider?
I decided to store the inventory/transaction data in a relational data base. Having data stored in a well-setup relational database allows other engineers to access and manipulate its data quickly and easily. </br>
For data uploading, I implemented modules that process all items at once, as long as they are within the same directory. This minimizes manual handing of the data. This automation relies on the assumption that vendors will be consistent with the format of their provided purchase logs.</br>
One challenge with this project is that this tool will be used by people with different levels of technical skills. On top of the technical solutions, I chose to build a web-based react application, catered towards non-technical users. This will allow them to access the data without any technical-knowhow. I'd initially thought about setting up a bash program, which would allow the user to click open and see the inventory count right away. However, I decided to proceed with a web-based application, because it will allow the user a greater level of data manipulation without requiring the technical knowhow. </br>

## 2. What assumptions (if any) did you have to make about the data?
  a. Vendors are consistent with the format of data provided.</br>
  b. Milk cartons don't have a unique ID and there is no sales history of milk, I am assuming that any sale of milk carton would include the source cow # as reference.</br>
  c. Data from butter log is insufficient in tracking exact batch of milk used; therefore, I am assuming that milk from future orders will be sourced from different cows as the cow id is the only reference. Given that a new batch of milk from the same cow arrives after the previous batch expires, we can use the expiration as cutoff point for reference.</br>
  d. Churned butter sticks were not assigned an ID, and there is no sales record of butter. Without an ID, I am assuming that on the receipt of any sale of butter would show Cow #, and the carton # of milk used. These identifiers will help us reference to which batch of butter would be sold.</br>

## 3. How many items did Spring Foods​TM have in-stock as of January 28, 2019? (How’d you arrive at this number?)
With an assumption that each stick of unsold fresh butter, and each carton of unused/unsold fresh milk count as 1 item, there is total of 224 fresh items in the inventory.</br>
I am storing the different items in separate tables in the database. For Milk & Butters, since there is not a unique identifying ID for each carton/milk, I stored am storing their quantity when they were delivered/churned. For each table, there are also columns for amount_used_sold and amount_remaining(which is calculated as the difference of Quantity - amount_used_sold). As each carton/stick gets used/sold (during the upload process), the amount_used_sold gets incremented and the amount_remaining gets decremented. I submitted a SQL query to retrieve the sum of the amount_remaining column, excluding the expired ones in each of these tables.</br>
As for Apples, and Bananas, each item is unique. A column in each of these tables were set up to indicate whether or not such item was sold. I submitted a SQL query for counts of those items that are not sold nor expired. </br>
The in-stock inventory count is a sum of all these 4 numbers combined.</br>

## 4. How would technical folks go about answering Question #3? Non-technical folks?
There are multiple ways a technical person can answer question #3.</br>
a. By running the SpringFoods/server/countInventory.js file with NodeJS. In fact, the function in the script allows the programmer to change the expiration date to a different one if interested.</br>
  ** run the following command line in the terminal from the main directory - Spring-Foods</br>
  ** npm run count </br>
b. Since the MySQL database is set up and populated. A technical person can also perform queries to the database directly using SQL language. Examples can be found in inventoryMethods.js</br>
    SELECT COUNT(*) FROM APPLES WHERE SOLD = FALSE AND EXPIRATION > '2019-01-28';</br>
    SELECT COUNT(*) FROM BANANAS WHERE SOLD = FALSE AND EXPIRATION > '2019-01-28';</br>
    SELECT SUM(AMOUNT_REMAINING) FROM MILK WHERE EXPIRATION > '2019-01-28';</br>
    SELECT SUM(AMOUNT_REMAINING) FROM BUTTERS WHERE EXPIRATION > '2019-01-28';</br>
As for a non-technical person, he/she can simply go to our web-based application. By default, the inventory count calculated with the expiration day of 2019-01-28. However, the user has the option to change the date and retrieve the inventory count with such new expiration date.</br>

## 5. How would you envision future data getting into the system? What processes and technical solutions would need to be put in place? (Imagine that this system is being used by data scientists, cashiers, and others.)
The personells in procession of these raw data files are probably non-technical (Cashiers, Receiving Personell, Butter Churners). The system should be designed easy for them, so that they will not need to rely on the engineers to upload the data, as this communication and reliance can lead to loss of data or data being out-of-date.</br>
In the future, receipts, purchase logs from vendors, and in-house butter churning data files can be stored in their respective directories. We can setup a system that periodically and automatically invokes our data-uploading functions. Alternatively, we can have a system that watches for changes in these folders (if we expect frequent changes to our inventory), and immediately calls the respective functions to upload the data. Once the data gets uploaded, these files can then be automatically moved to different un-monitored directories. This set up would minimize manual labor. Non-technical staffs can simply drop the files into the correct folder once they are prepared, enabling the data to be utilized in a timely manner.</br>
If I were to have enough time, I would set up an API with various endpoints that would enable data scientists, engineers and other technical personells to access, delete and update the data stored in the system.</br>

## 6. If we were to start freezing some of our items on arrival, what work would be required to track freeze and thaw dates?
These items can be given water-resistant barcodes/QR Codes that enable sufficient identification. A remote scanner can be placed next to the freezer, and the user/processing person can simply scan the codes before transfering the items into the freezer. The scanning history should also be linked to the database.</br>
We can utilize a "toggle" system, such that the first time an item gets scanned signifies freezing and the next scan would indicate a thaw, and so forth. This system minimizes the amount of work the package handler has to perform, and the easy process makes it less error-prone. </br>


---------------

## More Comments & IF I HAD MORE TIME:
Since there is little data in the sample files, database performance was not a priority to me. If I were to have more time, I would definitely work on indexing the data columns and creating foreign key references from table to table. </br>
Grocery items are usually perishable, therefore, implementing a system that automatically sends a list of soon-to-expire items could help to reduce loss of profit, as Spring Foods could possibly put these items on sale before they are expired. This grace period can vary from product to product. For example, it makes sense to start putting on sale items that take a longer time to consume, such as a big bottle of ketchup. On the other hand, bread can quickly be consumed, so a 3-day advance notification would suffice. </br>
For this project, we're only calculating the # of items on the shelf given a certain day. In the future, it would be valuable to implement additional features to show what items are remaining. This would help the ordering staff to decide what to order.</br>
