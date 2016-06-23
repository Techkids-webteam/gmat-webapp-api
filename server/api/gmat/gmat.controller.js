/**
 * Created by Admin on 10/06/2016.
 */

'use strict';
import Question from './question.model';
import QuestionPack from './question_pack.model'
import User from './user.model'

export function getQuestions(req, res) {
  Question.find(function (err, questions) {
    res.json({questions});
  });
}

export function getQuestionById(req, res) {
  Question.findById(req.params.id,function (err, data) {
      res.json({err, data})
  })
}


export function postQuestion(req, res) {
  var post = {
    type : req.body.type,
    sub_type: req.body.sub_type,
    stimulus: req.body.stimulus,
    stem: req.body.stem,
    answer_choices: req.body.answer_choices,
    right_answer: req.body.right_answer
  };
  Question.create(post, function(err,data) {
    return res.json({err,data});
  })
}

export function deleteQuestion(req, res) {
    Question.findById(req.body._id, function (err, product) {
        product.remove(function (err, product) {
            res.json({err,product});
    });
  })
}

export function editQuestion(req, res) {
    Question.findById(req.body._id, function (err,product) {
        product.type = req.body.type;
        product.sub_type = req.body.sub_type;
        product.stimulus = req.body.stimulus;
        product.stem =  req.body.stem;
        product.answer_choices = req.body.answer_choices;
        product.right_answer = req.body.right_answer;
        product.save(function(err,product){
            res.json({err,product})
        });
    })
}

export function postQuestionPack(req, res) {
  var post = {
    available_time: req.body.available_time,
    question_ids: req.body.question_ids,
    level : req.body.level
  };
  QuestionPack.create(post, function(err,data) {
    return res.json({err,data});
  })
}

export function getQuestionPacks(req, res) {
  QuestionPack.find(function (err, question_packs) {
    res.json({question_packs});
  });
}

export function getQuestionPackById(req, res) {
  QuestionPack.findById(req.params.id,function (err, data) {
      res.json({err, data})
  })
}

export function deleteQuestionPack(req, res) {
    QuestionPack.findById(req.body._id, function (err, product) {
        product.remove(function (err, product) {
            res.json({err,product});
    });
  })
}

export function editQuestionPack(req, res) {
    QuestionPack.findById(req.body._id, function (err,product) {
        product.available_time = req.body.available_time;
        product.question_ids = req.body.question_ids;
        product.level = req.body.level;
        product.save(function(err,product){
            res.json({err,product})
        });
    })
}

export function login(req, res){
    var isLogin= false;
    User.findOne( {user_name:req.body.user_name},function (err, data) {
        if(data.password == req.body.password){
            isLogin= true;
        }
    }).then(function(){
        if(isLogin){
            res.json({
                login_message: "Login Success",
                login_status: 1
            });
        } else {
            res.json({
                login_message: "Login Failed",
                login_status: 0
            });
        }
    });

}
