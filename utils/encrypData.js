const bcrypt = require('bcryptjs');

let hashData = async (data) => {

    let salt = await bcrypt.genSalt(10);
    let hashedData = await bcrypt.hash(data,
        salt);

    return hashedData;

}

const compareData = async (plainText, hashedText) => {
    return await bcrypt.compare(plainText, hashedText);
};


module.exports = {
    hashData,
    compareData
}