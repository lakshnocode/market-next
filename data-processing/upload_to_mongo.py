import json
import pymongo

# MongoDB connection details
mongo_host = 'localhost'
mongo_port = 27017

# MongoDB database and collection names
database_name = 'stock_insights'
collection_name = 'announcements'

# Load data from JSON file
with open('data-processing/bse_announcements_data.json') as json_file:
    data = json.load(json_file)

# Connect to MongoDB
client = pymongo.MongoClient(mongo_host, mongo_port)
database = client[database_name]
collection = database[collection_name]

# Insert data into MongoDB
result = collection.insert_many(data)

# Print the number of documents inserted
print(f"{len(result.inserted_ids)} documents inserted into '{collection_name}' collection.")
