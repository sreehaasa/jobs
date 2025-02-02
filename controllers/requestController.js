//const db = require('../config/database');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2025Fbla$$',
  port: 5432
});

// Display Home Page
exports.getHome = function (req, res) {
  //set user info in session
  if(!req.session.user){
    req.session.user = {
      userid: '',
      usertype: 'User',
      name: '' 
    };
  }

  res.render('index', {
    title: '',
    message: ''
  });
}

// Logout
exports.logoutHome = function (req, res) {
  //clear req/session attribute
  req.session.destroy();
  res.redirect('/');
}


// Display Admin Home Page
exports.getAdminHome = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Admin"){
    res.redirect('/');
  }else {
    //fetch current job applications
    const adminid = req.session.user.userid;
    const username = req.session.user.name;
    console.log(adminid);
    console.log(username);
    pool.query('select p.postingid,p.title,p.pathway,p.responsibilities,p.category,p.skills,p.salary,p.dateposted, p.status from jobs.posting p', (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      res.render('adminHome', {
        username: req.session.user.name,
        userid: req.session.user.userid,
        jobs: results.rows
      });
    }); 
  }
}


// Display Student Home Page
exports.getStudentHome = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Student"){
    res.redirect('/');
  }else {
    //fetch current job applications
    const studentid = req.session.user.userid;
    const username = req.session.user.name;
    console.log(studentid);
    console.log(username);
    pool.query('SELECT p.postingid, p.title, a.applicationid, a.status, a.dateapplied, e.username FROM jobs.application a, jobs.posting p, jobs.user s, jobs.user e WHERE a.postingid = p.postingid AND p.employerid = e.userid AND a.studentid = s.userid AND s.userid = $1', [studentid], (error, results) => {
      if (error) { 
        throw error;
      }
      console.log(results.rows);
      if(results.rows.length > 0){
      // console.log("userid=   "+results.rows[0].postingid);
      // console.log("password= "+results.rows[0].title);
      // console.log("userType= "+results.rows[0].pathway);
      }
      res.render('studentHome', {
        username: req.session.user.name,
        userid: req.session.user.userid,
        applications: results.rows
      });
    });
  }
}

// Display Employer Home Page
exports.getEmployerHome = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Employer"){
    res.redirect('/');
  }else {
    //fetch current job postings 
    const employerid = req.session.user.userid;
    const username = req.session.user.name;
    console.log(employerid);
    console.log(username);
  
    pool.query('select p.postingid, p.title, p.pathway, p.responsibilities, p.category, p.skills, p.salary, p.dateposted, p.status, u.username from jobs.posting p, jobs.user u where p.employerid = u.userid and  u.userid = $1', [employerid], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      if(results.rows.length > 0){
        console.log("userid=   "+results.rows[0].postingid);
        console.log("password= "+results.rows[0].title);
        console.log("userType= "+results.rows[0].pathway);
      }
      res.render('employerHome', {
        username: username,
        employerid: employerid,
        jobs: results.rows
      });
    });
  }
}
// Display Sign Up Page
exports.getSignup = function (req, res) {
  res.render('signup', {
    usertype: req.query.utype
  });
}


// Create User Account (Employer, Student, Admin)
exports.createAccount = function (req, res) {
  console.log(req.body);
  const {
    fname,
    lname,
    email,
    StudentID,
    Password,
    userType
  } = req.body;

  const userName = userType === "Admin" ? email: StudentID;

  pool.query('INSERT INTO jobs.user (FirstName, LastName, EmailAddress, UserName, Password, Pin, UserType) VALUES ($1,$2, $3, $4, $5, 1234, $6)', [fname, lname, email, userName, Password, userType], (error, results) => {
    if (error) {
      throw error;
    }
    res.render('login', {
      title: 'My App',
      message: '',
      postingid:''
    });

  });
}

// Display Sign In Page
exports.getSignin = function (req, res) {  
  res.render('login', {
     message: '',
     postingid:''
  });
}

// Display Student Applications Page
// Only Employers can view student applicaitons
exports.getStudentApplications = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Employer"){
    res.redirect('/');
  }else {
    const employerid = req.query.employerid;
    console.log(employerid);
    pool.query('SELECT p.postingid, p.title, a.applicationid, a.dateapplied, s.emailaddress, a.linkedin_profile, a.resume_location FROM jobs.application a,jobs.posting p,jobs.user s,jobs.user u WHERE a.postingid = p.postingid and a.studentid = s.userid AND p.employerid = u.userid and u.userid = $1', [employerid], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      res.render('studentApplications', {
        employerid:employerid,
        applications: results.rows
      });
    });
  } 
}


// Verify Log in
exports.validateLogin = function (req, res) {

    console.log(req.body);
    const {Username, Password, postingid} = req.body;
    console.log(Username);
    console.log(Password);

    pool.query('SELECT UserId, FirstName, LastName, Password, UserType FROM jobs.user WHERE EmailAddress = $1', [Username], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      console.log("userid=   "+results.rows[0].userid);
      console.log("password= "+results.rows[0].password);
      console.log("userType= "+results.rows[0].usertype);

      if(Password === results.rows[0].password){      
        //set user info in session
        req.session.user = {
          userid: results.rows[0].userid,
          usertype: results.rows[0].usertype,
          name: results.rows[0].firstname + " " +results.rows[0].lastname 
        };

        res.locals.user = {
          userid: results.rows[0].userid,
          usertype: results.rows[0].usertype,
          name: results.rows[0].firstname + " "+results.rows[0].lastname
        };
        
        if("Admin" === results.rows[0].usertype ) {
          res.redirect('/adminHome');
        } else if("Employer" === results.rows[0].usertype ) {
          res.redirect('/employerHome');
        } else if ("Student" === results.rows[0].usertype ){
          if(postingid){
            res.render('application', {
              studentid: results.rows[0].userid,
              username: results.rows[0].firstname + " "+results.rows[0].lastname,
              postingid: postingid
            });
          }else{
            res.redirect('/studentHome');
          }
        } else{
          res.render('index', {
            title: 'My App'
          });
        }
      }else{
        res.render('login', {
          message: "Invalid Login. Please try again!",
          postingid:''
        });
      }
    });
}

// Display Add Posting Page
// Only Employers should be able to Post 
exports.getPost = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Employer"){
    res.redirect('/');
  }else {
    console.log(req.body);
    console.log(req.query.employerid);
    res.render('addPosting', {
      employerid: req.query.employerid,
      message: ''
    });
  }  
}

// Create New Job posting
exports.createPost = function (req, res) {
  console.log(req.body);
  const {
    title,
    pathway,
    responsibilities,
    type,
    salary,
    skills,
    EmployerId
  } = req.body;
  pool.query('INSERT INTO jobs.posting (Title,Pathway,Responsibilities,Category,Salary,Status,Skills,EmployerId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [ title,pathway,responsibilities,type,salary,'Pending',skills,EmployerId], (error, results) => {
    if (error) {
      throw error;
    }
    res.redirect('/employerHome');

  });
}

// Update Job status
// Only Admin can  approve or deny 
exports.updatePost = function (req, res) {
  if(req.session.user && req.session.user.usertype != "Admin"){
    res.redirect('/');
  }else {
    console.log(req.body);
    const {
      postingid,
      review
    } = req.body;

    pool.query('UPDATE jobs.posting SET Status = $1 WHERE PostingId= $2', [review, postingid ], (error, results) => {
      if (error) {
        throw error;
      }
      res.redirect('/adminHome');
    });
  }  
}

// Display All Jobs Page
exports.getJobs = function (req, res) {
  pool.query('select p.postingid, p.title, p.pathway, p.responsibilities, p.category, p.skills, p.salary, p.dateposted, p.status,e.username from jobs.posting p, jobs.user e where p.employerid = e.userid and p.status = $1',['Approved'], (error, results) => {
    if (error) {
      throw error;
    }
    console.log(results.rows);
    if(results.rows.length > 0){
      console.log("userid=   "+results.rows[0].postingid);
      console.log("password= "+results.rows[0].title);
      console.log("userType= "+results.rows[0].pathway);
    }
    res.render('availableJobs', {
      jobs: results.rows
    });
  });
}

// Display Job Application
// Only Students can apply 
exports.getApplication = function (req, res) {
  const postingid = req.query.postingid;
  if(req.session.user && req.session.user.usertype == "Student") {
      res.render('application', {
        studentid: req.session.user.userid,
        username: req.session.user.name,
        postingid: postingid
      });
  } else{
      res.render('login', {
        postingid: postingid,
        studentid:'',
        message: ''
      });
  }
} 

// Create Job Application
exports.createApplication = function (req, res) {
  const {
    postingid,
    studentid,
    email,
    phone,
    profile
  } = req.body;
  const uploadedFilename = "/uploads/"+req.file.filename;
  
  console.log(req.body);
  console.log(uploadedFilename);

  pool.query('INSERT INTO jobs.application (StudentId, PostingId, Status, linkedin_profile, resume_location) VALUES ($1,$2,$3,$4,$5)', [ studentid, postingid,'Received',profile, uploadedFilename], (error, results) => {
    if (error) {
      throw error;
    }
    res.redirect('/studentHome');
  });
}