from bson.objectid import ObjectId
from fastapi import FastAPI
from pydantic.errors import InvalidByteSize
from pymongo import MongoClient
from bson import json_util
import json
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
client = MongoClient("mongodb://127.0.0.1")
db = client["tasks"]
tasks = db["tasks"]
# Read
@app.get("/")
async def index():
    products = [
        json.dumps(i, indent=4, default=json_util.default) for i in tasks.find()
    ]
    products = [json.loads(i) for i in products]
    return {"products": products}


# Create
class Task(BaseModel):
    task: str


@app.post("/create")
def create_task(task: Task):
    createdTask = tasks.insert_one({"task": task.task})
    return {"id": str(createdTask.inserted_id)}


# Update
class UpdateTask(BaseModel):
    id: str
    newTask: str


@app.post("/update/")
def update_task(task: UpdateTask):
    tasks.replace_one({"_id": ObjectId(task.id)}, {"task": task.newTask})
    return "ok"


# Delete
class DeleteTask(BaseModel):
    id: str


@app.post("/delete")
def delete_task(task: DeleteTask):
    print(task)
    tasks.delete_one({"_id": ObjectId(task.id)})
    return "ok"


# unique item
class UniqueItem(BaseModel):
    id: str


@app.post("/item/")
def item(item: UniqueItem):
    founditem = []
    for i in tasks.find({"_id": ObjectId(item.id)}):
        founditem = i
        founditem["_id"] = str(founditem["_id"])

    return founditem