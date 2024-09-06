const User = require('../models/User');





 const getUser = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message
        })
    }
}


module.exports = { getUser };

