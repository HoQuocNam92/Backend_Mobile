// const mysqldb = require('../config/mysql');
// const createUsersa = require('../server/createUser')
// let Controllers = (req, res) => {
//     let sql = "SELECT * FROM mobile";
//     mysql.query(sql, function (err, results) {
//         if (err) throw err;
//         res.send(results);
//     })

// }
// let createdata = (req, res) => {
//     let { firstName, lastName, quantity } = req.body;
//     mysqldb.query("INSERT INTO mobile (firstName,lastName,quantity) VALUES(?,?,?)", [firstName, lastName, quantity], function (err, result) {

//         console.log("New Record inserted successfully", result);
//     });
//     res.send("Ok")
// }
// let SubmitFroms = (req, res) => {
//     res.render('../views/Createdb.ejs');
// }
// let createsa = (req, res) => {
//     res.send("mysqldb API succesfully");
// }
// let register = async (req, res) => {
//     console.log(req.body);
//     const { name, email, password } = req.body;
//     const data = await createUsersa(name, email, password);
//     return res.json(data);
// }
// let login = (req, res) => {
//     const sql = "Select * from login where Email = ? AND Password = ?";
//     let values = [req.body.email, req.body.password];
//     mysqldb.query(sql, [values], function (err, data) {
//         if (err) console.log("Err");
//         return res.json(data)
//     })

// }
// let createUsersaa = async (req, res) => {
//     const { name, email, password } = req.body;
//     const data = await createUsersa(name, email, password);
//     return res.status(200).json(data);
// }
// module.exports = { createUsersaa }
// module.exports = { Controllers, createdata, SubmitFroms, createsa, register, login };                                                                      