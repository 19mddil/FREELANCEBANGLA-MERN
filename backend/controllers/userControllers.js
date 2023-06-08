const { dbConnect, dbCreateUser, genJWT, dbFindUserByEmail, dbFindUserByEmailByRole, dbUddateUserVerifiedStatus } = require('../mysql/dbControllers');
const bcrypt = require('bcrypt');

module.exports.SignUp = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const results = await dbFindUserByEmail(connection, req.body.email);
        let ifFoundMessage = null;
        if (results) {
            results.map(function (result) {
                if (result.role === req.body.role) {
                    ifFoundMessage = `user already exists with email:${result.email} and role:${result.role}`;
                }
            })
            if (ifFoundMessage) return res.status(409).send(ifFoundMessage);
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.verified = 'false';


        const result = await dbCreateUser(connection, req.body);
        const _user = {
            ...req.body,
            id: result.insertId
        }
        let _token = await genJWT(_user);
        connection.destroy();
        return res.status(201).send({ messeage: "User Successfully Registered", user: _user, token: _token });
    } catch (err) {
        connection.destroy();
        return res.status(500).send(err.message);
    }
}

module.exports.SignIn = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbFindUserByEmailByRole(connection, req.body.email, req.body.role);
        if (!result) {
            return res.status(403).send("Email or Password Error");
        }
        const boolvar = await bcrypt.compare(req.body.password, result[0].password);
        if (boolvar) {
            let _token = await genJWT(result[0]);
            connection.destroy();
            return res.status(201).send({ message: "Login Successful", user: result[0], token: _token });
        } else {
            return res.status(403).send("username or password error");
        }
    } catch (err) {
        return res.status(403).send(err.message);
    }
}

module.exports.SendEmail = async (req, res) => {
    try {
        console.log("Sending Email....");
        console.log(req.body);
        //await sendMail(req.body.email, "Verify Code", req.body.code);
        res.status(201).send({ message: "email sent successfully" })
    } catch (err) {
        return res.status(500).send(new Error("Email couldn't be sent"));
    }
}

module.exports.VerifyEmail = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const result = await dbUddateUserVerifiedStatus(connection, req.body.email);
        if (!result) {
            return res.status(403).send("couldn't verify the user,try again later");
        }
        const user = await dbFindUserByEmailByRole(connection, req.body.email, req.body.role);
        let _token = await genJWT(user[0]);
        connection.destroy();
        return res.status(201).send({ message: "verification Successful", user: user[0], token: _token });

    }
    catch (err) {
        return res.status(500).send(err.message);
    }
}

module.exports.SetNewPassword = async (req, res) => {
    let connection = null;
    try {
        connection = await dbConnect('localhost');
    } catch (err) {
        return res.status(500).send(err.message);
    }
    try {
        const results = await dbFindUserByEmail(connection, req.body.email);
        let found = false;
        if (results) {
            results.map(function (result) {
                if (result.role === req.body.role) {
                    found = true
                }
            })
        }
        if (!found) return res.status(409).send("User does not exist, Please Register.");
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        req.body.verified = 'true';


        const result = await dbUpdateUserPasswordWithEmailAndRole(connection, req.body);
        const _user = {
            ...req.body,
            id: result.insertId
        }
        connection.destroy();
        return res.status(201).send({ messeage: "User Password Successfully Updated", user: _user });
    } catch (err) {
        connection.destroy();
        return res.status(500).send(err.message);
    }

}

