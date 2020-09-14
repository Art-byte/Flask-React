from flask import Flask, request, jsonify, Response
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] ='mongodb://localhost/Courses'
mongo = PyMongo(app)
CORS(app)


db = mongo.db.courses

@app.route('/courses', methods = ['POST'])
def addCourses():
    id = db.insert({
        'courseName': request.json['courseName'],
        'instructor': request.json['instructor'],
        'level': request.json['level']
    })
    return jsonify(str(ObjectId(id)))


@app.route('/courses', methods = ['GET'])
def getCourses():
    courses =[]
    for doc in db.find():
        courses.append({
            '_id': str(ObjectId(doc['_id'])),
            'courseName': doc['courseName'],
            'instructor': doc['instructor'],
            'level': doc['level']
        })
    return jsonify(courses)


@app.route('/courses/<id>', methods =['GET'])
def getOneCourses(id):
    course = db.find_one({'_id': ObjectId(id)})
    print(course)
    return jsonify({
        '_id': str(ObjectId(id)),
        'courseName': course['courseName'],
        'instructor': course['instructor'],
        'level': course['level']
    })


@app.route('/courses/<id>', methods = ['DELETE'])
def deleteCourse(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify('Curso eliminado')


@app.route('/courses/<id>', methods =['PUT'])
def updateCourse(id):
    db.update_one({'_id': ObjectId(id)}, {'$set':{
        'courseName': request.json['courseName'],
        'instructor': request.json['instructor'],
        'level': request.json['level'],
    }})
    return jsonify({'msg': 'Usuario actualizado'})
    

if __name__ == "__main__":
    app.run(debug = True)