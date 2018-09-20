var express = require('express');
var router = express.Router();
//var multer= require('multer');  
//var upload = multer({dest:'/uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User= require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  //res.render(inde)//renders the signup tab plus highlight
});

router.get('/signup',function(req,res,next){
	res.render('signup',{title:'SignUp'});  //renders the signup tab plus highlight
});

router.get('/login',function(req,res,next){
	res.render('login',{title:'Login'}); //renders the Login tab plus highlight
});

router.get('/profile',isLoggedIn, function(req, res) {
        res.render('progile.jade', {
            user : req.user,
            loginHistory: req.user.loginHistory
        });
	//res.redirect('/users/visualize');
    });
	
router.get('/visualize',isLoggedIn, function(req, res) {
        res.render('pie_armchart.html', {
            user : req.user
                    }   );
    });

router.get('/visual_qns',isLoggedIn, function(req, res) {
    res.render('question_bar.html', {
        user : req.user
    });
});
router.get('/visual_upvotes',isLoggedIn, function(req, res) {
    res.render('upvote_downvote.html', {
        user : req.user
    });
});

router.get('/visual_tags',isLoggedIn, function(req, res) {
    res.render('hello1.html', {
        user : req.user
    });
});

router.get('/computation', isLoggedIn, function(req,res) {
    var asq_upvote_qn = 0, upvote1 = 0,upvote2=0, asq_qn = 0, asq_tag = 0, downvote1=0,downvote2=0;
    var users_list=['aaa','bbb','ccc'];
    for (var user1 in users_list) {
    User.retrieveCount(users_list[user1], "question-hyperlink", function (err, res) {
        asq_qn += res.length;
        //console.log("questions clicker", asq_qn);
        //var sleep = require('system-sleep');
        //sleep(1 * 1000); // sleep for 10 seconds
    });
    }
    for (var user1 in users_list) {
        User.retrieveCount(users_list[user1], "tag_click", function (err, res) {
            asq_tag += res.length;
            //console.log("tag clicks=", asq_tag);
           // var sleep = require('system-sleep');
            //sleep(1 * 1000); // sleep for 10 seconds
        });
    }

    for (var user1 in users_list) {
        User.retrieveCount(users_list[user1], "upvote_off_question", function (err, res) {
            upvote1 += res.length;
        });
        var sleep = require('system-sleep');
        sleep(0.5 * 1000); // sleep for 10 seconds
        User.retrieveCount(users_list[user1], "upvote_off_answer", function (err, res) {
            upvote2 += res.length;

        });
        User.retrieveCount(users_list[user1], "downvote_off_question", function (err, res) {

            downvote1 = res.length;
            // console.log(users_list[user1], "questions upvote", upvote1);
            flag = 1;


        });
        User.retrieveCount(users_list[user1], "downvote_off_answer", function (err, res) {

            downvote2 = res.length;
            // console.log(users_list[user1], "questions upvote", upvote1);
            flag = 1;
        });
    }
    var sleep = require('system-sleep');
    sleep(2 * 1000); // sleep for 10 seconds
    //var upvote = asq_upvote_qn + asq_upvote_ans;
    //console.log("upvote=", upvote);
    upvote1+=upvote2;
    upvote1+=downvote2+downvote1;
    var data = {"upvote": upvote1, "questions": asq_qn, "tags": asq_tag};
    console.log("data=", data);
    try{
    res.send(data);
    }catch(e){
        console.log(e);
    }
});

router.get('/computation_qn', isLoggedIn, function(req,res) {
    var users_list=['aaa','bbb','ccc'];
    var asq_qn=0, data=[];

    for(var user1 in users_list) {
        console.log("User1:",user1);
        User.retrieveCount(users_list[user1], "question-hyperlink", function (err, res) {
            asq_qn = res.length;
           // console.log("questions clicker", asq_qn);
        });
        var sleep = require('system-sleep');
        sleep(1 * 1000); // sleep for 10 seconds
        data.push({"user":users_list[user1],"questions_clicked":asq_qn});
        //var usr1=users_list[user1];
        //data[usr1]=asq_qn;
        console.log("data inside", data);
    }
    var sleep = require('system-sleep');
    sleep(1 * 1000); // sleep for 10 seconds
    console.log("data", data);
    try{
        res.send(data);
    }catch(e){
        console.log(e);
    }

});

router.get('/computation_upvote', isLoggedIn, function(req,res) {
    var users_list=['aaa','bbb','ccc'];
    var upvote1=0, upvote2=0, data=[],user1=0,flag=0,count=0;
    var downvote1=0,downvote2=0;

    for(var user1 in users_list) {
        console.log("User1:", users_list[user1]);
        upvote = 0;
        User.retrieveCount(users_list[user1], "upvote_off_question", function (err, res) {

                upvote1 = res.length;
               // console.log(users_list[user1], "questions upvote", upvote1);
                flag = 1;


        });
        //var sleep = require('system-sleep');
        //sleep(2 * 1000); // sleep for 10 seconds

        User.retrieveCount(users_list[user1], "upvote_off_answer", function (err, res) {
            upvote2 = res.length;
            //console.log(users_list[user1], "questions upvote", upvote2);
            flag=0;
        });
        User.retrieveCount(users_list[user1], "downvote_off_question", function (err, res) {

            downvote1 = res.length;
            // console.log(users_list[user1], "questions upvote", upvote1);
            flag = 1;


        });
        User.retrieveCount(users_list[user1], "downvote_off_answer", function (err, res) {

            downvote2 = res.length;
            // console.log(users_list[user1], "questions upvote", upvote1);
            flag = 1;
        });



        var sleep = require('system-sleep');
        sleep(1 * 1000); // sleep for 10 second
        upvote1+=upvote2;
        downvote1+=downvote2;
        data.push({"user":users_list[user1],"questions_upvoted":upvote1,"questions_downvoted":downvote1});
        //var usr1=users_list[user1];
        //data[usr1]=asq_qn;
        console.log("data inside", data);
    }
    console.log("data", data);
    try{
        res.send(data);
    }catch(e){
        console.log(e);
    }

});

router.get('/computation_tags', isLoggedIn, function(req,res) {
    var users_list=['aaa','bbb','ccc'];
    var user1 = req.user;
    var uname = user1.username;
    var tags=[];
   //console.log("inside tags");
    try{
    User.retrieveTags(uname, "tag_click", function (err, res) {
        tags = res;
       // console.log("questions tagged", tags);
    });}
    catch(e){
        console.log(e);
    }
    var sleep = require('system-sleep');
    var tags_list=[];
    sleep(1 * 1000); // sleep for 10 second
    for( var val in tags){
        //console.log("original",val);
        //try {
            //console.log("content", tags[val]["actionData"]["content"]  );
            tags_list.push(tags[val]["actionData"]["content"]);
        //}catch(e){console.log(e);}
    }

    //console.log("tags_list",tags_list)
    var tags_dict={};
    for(var val in tags_list){

        if(tags_dict[tags_list[val]]==undefined){
            tags_dict[tags_list[val]]=1;
        }else{
            tags_dict[tags_list[val]]+=1;
        }
       //console.log( tags_list[val],tags_dict[tags_list[val]]);
    }
    //let result = Object.keys(tags_dict).map(e => {
     //   let ret = {};
      //  ret[e] = tags_dict[e];
      //  return ret;
    //});
    //console.log("result",result);

    var output_tags=[];
    var output_dict=[];
    for(var key in tags_dict) {
        console.log(key, tags_dict[key]);
        try {
            var tags = key;
            var count = tags_dict[key];
            output_tags.push({tags,count});
        }catch(e){
            console.log(e);
        }
    }
    //console.log(tags_dict);
    console.log("output",output_tags);


    //var usr_list=[];
    //for(var uname1 in users_list){
     //   if( users_list[uname1]!= uname) {
      //      usr_list.push(users_list[uname1])
       // }
    //}
    //for(var uname1 in users_list){
     //   User.retrieveTags(users_list[uname1], "tag_click", function (err, res) {
      //      tags = res;
      //      console.log("questions tagged", tags);
    //});
    //}
    //console.log(usr_list);


    res.send(output_tags);
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/login');
}

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
      var user1 = req.user;
      var login_success = "Welcome " + user1.username + " You are now logged in"
   req.flash('success', login_success);

      var datetime = new Date();
   var login_log = user1.username + " logged in at " + datetime;
   console.log("login_log",login_log);
   user1.loginHistory.push(loginHistorys(login_log));
   console.log("login_log",user1.loginHistory);
   user1.save();
   res.redirect('/users/profile');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(function(username, password, done){
  User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

router.post('/logActivity',function(req, res) {
    console.log("captured in backend");
    //todo
        if(req.user) {
            var user1 = req.user;
            console.log(user1);
            if (req.body) {
                var action = req.body;
                console.log(action);
                user1.actions.push(logActions(action));
                user1.actionData.push(logActionData(action));
                console.log("captured in backend finished");
            }
            user1.save();
            //console.log(count);
        }
        res.status(200).send();
});

router.post('/logActivitys',function(req, res){;
    var action1 = req.body;
    console.log("captured in backend")
    var newActivity = new Activity({
        username : req.user,
        action: action1
    });
    newActivity.createActivity(newActivity,function(err,user) {
        if (err) throw err;
        console.log(user);
    });

});

router.post('/signup',function(req, res, next){ //send the request for register
  var name = req.body.name;          //can grab the data. console will log the data
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;


  // Form Validator
  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);

  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('signup', {
  		errors: errors
  	});
  } else{
  	var newUser=new User({
		name: name,
		email: email,
		username: username,
		password:password
	});
	
	User.createUser(newUser,function(err,user){
		if(err) throw err;
		console.log(user);
	});
	
	req.flash('success', 'You have successfully Signed Up. Please login');

    res.location('/');
    res.redirect('/');
  }
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/users/login');
});

function loginHistorys(login_log){
    return login_log;

}

function logActions(action) {
    console.log("inside logActions");
    var datetime = new Date();
    console.log(datetime);
    switch (action["type"]) {
        case "question-hyperlink":
            return datetime + "Clicked on question: at url \"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "tag_click":
            return datetime + "Clicked on tag: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "star":
            return datetime + "Starred question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "share_question":
            return datetime + "Shared question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "share_answer":
            return datetime + "Shared answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_off_question":
            return datetime + "Un-voted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "upvote_off_answer":
            return datetime + "Un-voted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_off_question":
            return datetime + "Un-voted question: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";
        case "downvote_off_answer":
            return datetime + "Un-voted answer: <a href=\"" + action["content"] + "\" target=\"_blank\">" +  action["content"] + "</a>";

        case "":
            console.log("No action logged");

    }
}

function logActionData(action) {
    action["date"] = new Date();
    delete action["id"];
    return action;
}

module.exports = router;
