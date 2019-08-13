const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async index(request, response){
        const { user: loggedDevId } = request.headers;
        const loggedDev = await Dev.findById(loggedDevId);
        const users = await Dev.find({
            $and: [
                {_id: {$ne: loggedDevId}},
                {_id: {$nin: loggedDev.likedDevs}},
                {_id: {$nin: loggedDev.dislikedDevs}}
            ]
        })
        return response.json(users);
    },

    async store(request, response){
        const { username } = request.body;

        const devExists = await Dev.findOne({user: username});
        if(devExists){
            return response.json(devExists);
        }

        const axiosResponse = await axios.get(`https://api.github.com/users/${username}`);
        const {name, bio, avatar_url} = axiosResponse.data;

        const devCreated = await Dev.create({
            name,
            user: username,
            bio,
            avatarUrl: avatar_url
        });

        return response.json(devCreated);
    }
}