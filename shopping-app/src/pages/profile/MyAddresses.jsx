import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { v4 as uuidv4 } from "uuid";
import Axios from "../../apis/Axios";
import { toast } from "react-toastify";
function MyAddresses() {
  let currUser = useSelector((state) => state.user.currentUser);
  let { firstName, lastName, phone, addressList } = currUser;
  let [cuurentUser, setCurrentUser] = useState(currUser);
  let [use, setuse] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    setCurrentUser(currUser);
    console.log(cuurentUser);
  }, [cuurentUser]);

  const deleteAddress = async (addressId) => {
    let permit = window.confirm("Are sure to delete Address")
    try {
      if(permit){
        await Axios.delete(
          `http://localhost:5000/user/deleteAddress/${currUser.id}/${addressId}`
        );
        toast.error("Address Deleted");
        window.location.assign("/my-profile/my-addresses")
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ margin: "0 2rem" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Your Address
      </h3>

      <div className={""}>
        <Link to="/addressform">
          <Button variant="contained">Add Address</Button>
        </Link>
      </div>
      <div className={""} style={{ margin: "8px 0px" }}>
        <h3>
          {firstName} <span>{lastName}</span>
        </h3>
        <p style={{ fontWeight: "lighter" }}>{phone}</p>

        {cuurentUser.addressList.map((item, index) => {
          return (
            <Card sx={{ maxWidth: 500, margin: "8px 0px" }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div className={""}>
                    <h4>{`Address ${index + 1}`} : &nbsp; </h4>
                    <div style={{ marginTop: "6px" }}>
                      {item.houseNo} , {item.landMark},{item.street},{" "}
                      {item.city} -{item.pincode}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardActions>
                <Link to={`/editaddress/${item.id}`}>
                  <Button
                    size="small"
                    color="success"
                    startIcon={<ModeEditOutlineOutlinedIcon />}
                  ></Button>
                </Link>

                <Button
                  color="error"
                  onClick={() => deleteAddress(item.id)}
                  startIcon={<DeleteIcon />}
                  size="small"
                ></Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default MyAddresses;
