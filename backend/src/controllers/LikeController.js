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
    
    if(targetDev.likedDevs.includes(loggedDev._id)){
      const socketOfLoggedDev = request.connectedUsers[loggedDev._id];
      const socketOfTargetDev = request.connectedUsers[targetDev._id];
      // checa se os Dev's estão com a aplicação aberta para enviar a mensagem de match:
      if(socketOfLoggedDev){
        request.io.to(socketOfLoggedDev).emit('match', targetDev);
      }
      if(socketOfTargetDev){
        request.io.to(socketOfTargetDev).emit('match', loggedDev);
      }
    }
    loggedDev.likedDevs.push(targetDevId);
    loggedDev.save();
    return response.json(loggedDev);
  }
}