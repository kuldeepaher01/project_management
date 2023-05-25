// imports
const express = require("express");
const app = express();
const port = 3000;
// database connectivity
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

const mySql = require("mysql");
// const alert = require('alert');
const conn = mySql.createConnection({
	user: "root",
	password: "password",
	host: "localhost",
	database: "connect",
	multipleStatements: true,
});

conn.connect(function (err) {
	if (err) {
		console.log(err.message);
	} else {
		console.log("connected");
	}
});
// static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/video", express.static(__dirname + "public/video"));

// set view
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
	res.render("index");
});
app.get("/signup", function (req, res) {
	res.render("signup");
});
app.post("/sign-up", function (req, res) {
	console.log(req.body);

	var p = req.body.password;
	var u = req.body.username;
	var cp = req.body.confirm_password;
	var e = req.body.email;

	conn.query(
		"insert into info (username,email,password,confirm_pssword) values (?,?,?,?)",
		[u, e, p, cp],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("inserted into info successfully");
			}
		},
	);
	res.render("signup");
});

app.get("/login", function (req, res) {
	res.render("login");
});
app.post("/login", function (req, res) {
	let p_l = req.body.password;
	let u_l = req.body.username;
	conn.query(
		"select * from info where username=? and password=?",
		[u_l, p_l],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				if (result) {
					console.log("Loged in successfully");
					res.render("select");
				} else {
					console.log("Error in login");
					res.render("login");
				}
			}
		},
	);
});
app.get("/add", function (req, res) {
	res.render("addData");
});
app.post("/addData", function (req, res) {
	console.log(req.body);
	console.log(req.body.MEMBER_PRN1[0]);
	var prnNo = req.body.PRN_NO;
	var studentName = req.body.Full_Name;
	var projectTitle = req.body.project_Title;
	var courseName = req.body.course_Name[0];
	var div = req.body.div;
	var batch = req.body.batch;
	var groupNo = req.body.groupNo;
	var email = req.body.your_email;
	var phoneNo = req.body.phone;
	var projectGuidName = req.body.course_Name[1];
	var techUsed = req.body.course_Name[2];
	var projectDesc = req.body.course_Name[3];
	var mem1 = req.body.MEMBER_PRN1[0] + req.body.NAME[0];
	var mem2 = req.body.MEMBER_PRN1[1] + req.body.NAME[1];
	var mem3 = req.body.MEMBER_PRN1[2] + req.body.NAME[2];
	var mem4 = req.body.MEMBER_PRN1[3] + req.body.NAME[3];
	var mem5 = req.body.MEMBER_PRN1[4] + req.body.NAME[4];

	conn.query(
		"insert into project_detail values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
		[
			prnNo,
			studentName,
			projectTitle,
			courseName,
			div,
			batch,
			groupNo,
			email,
			phoneNo,
			projectGuidName,
			techUsed,
			projectDesc,
			mem1,
			mem2,
			mem3,
			mem4,
			mem5,
		],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("inserted into info successfully");
			}
		},
	);
	res.render("select");
});
app.get("/view", function (req, res) {
	res.render("dropdown");
});
app.post("/dropdown", function (req, res) {
	console.log(req.body);
	var c = req.body.Course;
	var d = req.body.division;

	const sql =
		"select * from project_detail where courseName= ? and division= ?";

	conn.query(sql, [c, d], function (err, result) {
		if (err) {
			console.log(err.message);
		} else {
			console.log("Data fetch sucessfully");
			console.log(result);

			res.render("table", { result: result });
		}
	});
});
app.get("/delete", function (req, res) {
	res.render("deleteData");
});
app.post("/deleteData", function (req, res) {
	console.log(req.body);
	var prnNo = req.body.PRN_NO;
	var studentName = req.body.Full_Name;
	var div = req.body.div;
	var batch = req.body.batch;
	var groupNo = req.body.groupNo;
	var email = req.body.your_email;
	var phoneNo = req.body.phone;
	conn.query(
		"delete from project_detail where PRN_NO=?",
		[prnNo],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("delete into project_detail successfully");
			}
		},
	);
	res.render("select");
});
app.get("/update", function (req, res) {
	res.render("updateData");
});
app.post("/updateData", function (req, res) {
	console.log(req.body);
	console.log(req.body.MEMBER_PRN1[0]);
	var prnNo = req.body.PRN_NO;
	var studentName = req.body.Full_Name;
	var projectTitle = req.body.project_Title;
	var courseName = req.body.course_Name[0];
	var div = req.body.div;
	var batch = req.body.batch;
	var groupNo = req.body.groupNo;
	var email = req.body.your_email;
	var phoneNo = req.body.phone;
	var projectGuidName = req.body.course_Name[1];
	var techUsed = req.body.course_Name[2];
	var projectDesc = req.body.course_Name[3];
	var mem1 = req.body.MEMBER_PRN1[0] + req.body.NAME[0];
	var mem2 = req.body.MEMBER_PRN1[1] + req.body.NAME[1];
	var mem3 = req.body.MEMBER_PRN1[2] + req.body.NAME[2];
	var mem4 = req.body.MEMBER_PRN1[3] + req.body.NAME[3];
	var mem5 = req.body.MEMBER_PRN1[4] + req.body.NAME[4];
	conn.query(
		"update project_detail set studentName=?,projectTitle=?,courseName=?,division=?,batch=?,groupNo=?,email=?,phoneNo=?,projectGuidName=?,techUsed=?,projectDesc=?,mem1=?,mem2=?,mem3=?,mem4=?,mem5=? where PRN_NO=?",
		[
			studentName,
			projectTitle,
			courseName,
			div,
			batch,
			groupNo,
			email,
			phoneNo,
			projectGuidName,
			techUsed,
			projectDesc,
			mem1,
			mem2,
			mem3,
			mem4,
			mem5,
			prnNo,
		],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("update project_detail successfully");
			}
		},
	);
	res.render("select");
});
app.get("/procedure", function (req, res) {
	res.render("procedure");
});
app.post("/updateProcedure", function (req, res) {
	console.log(req.body);
	console.log(req.body.MEMBER_PRN1[0]);
	var prnNo = req.body.PRN_NO;
	var studentName = req.body.Full_Name;
	var projectTitle = req.body.project_Title;
	var email = req.body.your_email;
	var phoneNo = req.body.phone;
	conn.query(
		"CALL insert_project_detail(?,?,?,?,?)",
		[prnNo, studentName, projectTitle, email, phoneNo],
		function (err, result) {
			if (err) {
				console.log(err.message);
			} else {
				console.log("update using producer successfully");
			}
		},
	);
	res.render("select");
});
// Listen on port 3000
app.listen(port, () => console.info("Listen on port 3000"));
