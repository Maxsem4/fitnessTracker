const db = require("../Develop/models");
const mongojs = require("mongojs");

module.exports = function(app) {
  app.get("/api/workouts", function(req, res) {
    db.Workout.findAll({}).then(function(dbWorkouts) {
      res.json(dbWorkouts);
    });
  });

  app.put("/api/workouts/:id", function(req, res) {
    db.Workout.find(
      { _id: mongojs.ObjectId(req.params.id) },
      (error, found) => {
        if (error) {
          console.log(error);
        } else {
          const newExercise = JSON.parse(req.body);
          const exerciseList = found.exercises;
          exerciseList.push(newExercise);
          db.Workout.update(
            {
              _id: mongojs.ObjectId(req.params.id)
            },
            {
              $set: {
                exercises: exerciseList
              }
            },
            (error, edited) => {
              if (error) {
                console.log(error);
              } else {
                res.send(edited);
              }
            }
          );
        }
      }
    );
  });

  app.post("/api/workouts/", function(req, res) {
    const newWorkout = {
      exercises: req.body.exercises
    };
    db.Workout.create(req.body).then(function(dbWorkout) {
      res.json(dbWorkout);
    });
  });
};
