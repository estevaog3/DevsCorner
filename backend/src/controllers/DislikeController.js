const Dev = require('../models/Dev');

module.exports = {
    async store(request, response){
        const { targetDevId } = request.params;
        const { user } = request.headers;
        const targetDev = await Dev.findById(targetDevId);
        if(!targetDev){
            return response.status(400).json({ error: "Dev not exists"});
        }
        const loggedDev = await Dev.findById(user);

        loggedDev.dislikedDevs.push(targetDevId);
        loggedDev.save();
        return response.json(loggedDev);
    }
}