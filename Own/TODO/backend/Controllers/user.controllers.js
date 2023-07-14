
const usersignup = (req, res, next) => {
    let data = req.headers;
    data.id = Date.now()
    let user = USERS.find(x => x.username === data.username)
    if (user) {
        res.status(403).json({
            message: "User all ready exsits"
        }).send()
        return
    }
    USERS.push(data);
    const token = createToken(data);
    res.json({
        message: 'Created username',
        id: data.id,
        token: token
    })
}

const userLogin = (req, res, next) => {

}

module.exports = {
    usersignup,
    userLogin
}