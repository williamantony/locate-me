const {
  insertBeacon,
  updateBeacon,
  selectBeacon,
} = require('./beacons.actions');
const { createInviteCode } = require('./helper');



const createBeacon = async (req, res, next) => {
  try {
    const {
      connectionId,
      name,
    } = req.body;

    const inviteCode = await createInviteCode();

    const beacon = await insertBeacon({
      connectionId,
      inviteCode,
      name,
    });

    res.json({
      beacon,
    });

  } catch (error) {
    console.log(error);
  }
};



const getBeaconsByConnection = async (req, res, next) => {
  try {
    
    const { connectionId } = req.body;

    const beacons = await selectBeacon({
      'connection_id': connectionId,
    });

    res.json({
      beacons,
    });

  } catch (error) {
    console.log(error);
  }
};



const setBeaconUser = async (req, res, next) => {
  try {
    
    const {
      clientId,
      inviteCode,
    } = req.body;

    const updateSet = {
      'client_id': clientId,
    };

    const updateWhere = {
      'invite_code': inviteCode,
    };

    const response = await updateBeacon(updateSet, updateWhere);

    res.json(response);

  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  createBeacon,
  getBeaconsByConnection,
  setBeaconUser,
};
