const { ReplSet } = require('mongodb');
const Course = require('../models/Course.models');

class CourseController {
    getAll(req, res) {
        Course.find()
            .then(courses => res.json(courses))
            .catch(err => res.json(err));
    }
    create(req, res){
        const newCourse = new Course(req.body);
        newCourse.save()
               .then(course => {
                   console.log("res: ", res)
                   res.json(course)
                })
               .catch(err => res.json(err));
    }
    getOne(req, res){
        Course.find({_id: req.params._id})
            .then(course => res.json(course))
            .catch(err => res.json(err));
      }
    delete(req, res){
        Course.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
    update(req, res){
        Course.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators: true, context: 'query'})
            .then(course => res.json({
              msg: "Updated",
              data: course
            }))
            .catch(err => res.json(err));
      }
}

module.exports = new CourseController()