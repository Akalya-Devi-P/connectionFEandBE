var bcrypt = require('bcryptjs');

async function hashing(value)
{
    var salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(value, salt);
    return hash
}

async function hashCompare(pwd, hashedPwd)
{
    let res = await bcrypt.compareSync(pwd, hashedPwd);
    return res
}


module.exports = {hashing, hashCompare}