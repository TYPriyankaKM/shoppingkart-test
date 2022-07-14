let userData = require("../Model/User.json");
const fs = require("fs").promises;
const path = require("path");
const { default: userEvent } = require("@testing-library/user-event");

async function reWrinteJson(updatedData) {
  await fs.writeFile(
    path.join(__dirname, "../", "Model", "User.json"),
    JSON.stringify(updatedData)
  );
}

// add new address
let addNewAddress = (req, res) => {
  const userId = req.params.id;
  let updatedData = userData.map(item => {
    if (item.id == userId) {
      item.addressList.push(req.body);
      return item;
    } else {
      return item;
    }
  });

  reWrinteJson(updatedData);
  res.send("success");
};
// upadate addrees
let updateAddress = (req, res) => {

  const userID = req.params.id;
  const addressID = req.params.addressId;
  const newdata = req.body;

  let updatedData = userData.map(user => {
    if (user.id == userID) {
      let addressList = user.addressList.map(addEle => {
        if (addEle.id === addressID) {
          console.log({...addEle, ...newdata})
          return newdata
        } else {
          return addEle
        }
      })
      return { ...user,addressList }
    } else {
      return user;
    }

  });
  reWrinteJson(updatedData);
  res.json({
    'message':"address updated",updatedData} );
}
// deleteAddress

let deleteAddress = (req, res) => {

  const userID = req.params.id;
  const addressID = req.params.addressId;
  let updatedData = userData.map(user => {
    // console.log(userID)
    // console.log(addressID)
    if (user.id == userID) {
      let addressList = user.addressList.filter(addEle => addEle.id !== addressID)
      return { ...user, addressList }
    } else {
      return user;
    }

  });
  reWrinteJson(updatedData);
  res.send("address deleted");
}



const updateProfile = (req, res) => {
  const userId = req.params.id;
  const newdata = req.body;
  let updatedData = userData.map(item => {
    if (item.id == userId) {
      return { ...item, ...newdata };
    } else {
      return item;
    }
  });

  reWrinteJson(updatedData);
  res.send("success");
};

module.exports = { addNewAddress, updateProfile, updateAddress,deleteAddress };
