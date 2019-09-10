const knex = require('../../database/db');



const randomNumber = (min = 1, max = 10) => {
  return Math.floor((Math.random() * (max - min)) + min);
};



const createRandomString = (length = 5) => {
  return Math.random().toString(36).substr(2, length).toUpperCase();
};



const createInviteCodeString = () => {
  const part1 = createRandomString(3);
  const part2 = createRandomString(3);
  const part3 = createRandomString(3);
  return `${part1}-${part2}-${part3}`;
};



const checkInviteCodeExists = (inviteCode) => {
  return new Promise(async (resolve, reject) => {
    
    try {
      
      const response = await knex('connected_clients')
        .select('invite_code')
        .where({
          'invite_code': inviteCode,
        });

      if (!Array.isArray(response)) {
        throw 'Error: checkInviteCodeExists() - failed to select';
      }

      const inviteCodeExists = response.length > 0;
      resolve(inviteCodeExists);

    } catch (error) {
      reject(error);
    }

  });
};



const createInviteCode = () => {
  return new Promise((resolve, reject) => {

    const recur = async () => {
      try {

        const inviteCode = createInviteCodeString();
        const inviteCodeExists = await checkInviteCodeExists(inviteCode);

        if (inviteCodeExists) return recur();
        resolve(inviteCode);

      } catch (error) {
        console.log(error.message);
        reject('Error: createInviteCode()');
      }
    };

    recur();
  });
};



module.exports = {
  randomNumber,
  createRandomString,
  createInviteCodeString,
  createInviteCode,
};
