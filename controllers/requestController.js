//const db = require('../config/database');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '2025PgDb$$',
  port: 5432
});

// Display Home Page
exports.getHome = function (req, res) {
  res.render('index', {
    title: 'My App',
    message: 'Hello Atchuta!'
  });
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

  const userName = userType === "Student" ? StudentID : email;

  pool.query('INSERT INTO public.user (FirstName, LastName, EmailAddress, UserName, Password, Pin, UserType) VALUES ($1,$2, $3, $4, $5, 1234, $6)', [fname, lname, email, userName, Password, userType], (error, results) => {
    if (error) {
      throw error;
    }
    // res.status(201).send(`User added with ID: ${results.insertId}`);
    res.render('login', {
      title: 'My App',
      message: 'Hello Atchuta!'
    });

  });
}

// Display Sign In Page
exports.getSignin = function (req, res) {
  
  res.render('login', {
    title: 'login',
    message: 'Hello Atchuta!'
  });
}

// Verify Log in
exports.validateLogin = function (req, res) {

    console.log(req.body);
    const {Username, Password} = req.body;
    console.log(Username);
    console.log(Password);

    pool.query('SELECT UserId, Password, UserType FROM public.user WHERE EmailAddress = $1', [Username], (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results.rows);
      console.log("userid=   "+results.rows[0].userid);
      console.log("password= "+results.rows[0].password);
      console.log("userType= "+results.rows[0].usertype);

      if(Password === results.rows[0].password){
        if("Employer" === results.rows[0].usertype ) {
          res.render('employerHome', {
            employerid: results.rows[0].userid
          });
        } else if ("Student" === results.rows[0].usertype ){
          res.render('studentHome', {
            studentid: results.rows[0].userid
          });
        } else{
          res.render('index', {
            title: 'My App'
          });
        }
      }else{
        res.render('login', {
          errormessage: "Invalid Login. Please try again!",
          message: 'Hello Atchuta!'
        });
      }
    });
}

// Display Add Posting Page
exports.getPost = function (req, res) {
  console.log(req.body);
  console.log(req.query.employerid);
  res.render('addPosting', {
    employerid: req.query.employerid,
    message: 'Hello Atchuta!'
  });
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
  pool.query('INSERT INTO public.posting (Title,Pathway,Responsibilities,Category,Salary,Status,Skills,EmployerId) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)', [ title,pathway,responsibilities,type,salary,'Pending',skills,EmployerId], (error, results) => {
    if (error) {
      throw error;
    }
    // res.status(201).send(`User added with ID: ${results.insertId}`);
    res.render('employerHome', {
      employerid: EmployerId,
      message: 'Hello Atchuta!'
    });

  });
}
