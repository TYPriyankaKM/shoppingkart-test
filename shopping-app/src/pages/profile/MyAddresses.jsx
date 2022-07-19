import { Button, Card, CardActions, CardContent } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector , useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import Axios from "../../apis/Axios";
import { toast } from "react-toastify";
import { fetchAddress , deleteAddress} from "../../features/address/addressSlice";

function MyAddresses() {
  let currUser = useSelector((state) => state.user.currentUser);
  let { firstName, lastName, phone,userId } = currUser;
  let [cuurentUser, setCurrentUser] = useState(currUser);
  const addressData = useSelector(state => state.address.addressList);
  
// let [addressList, setAddressList]=useState(addressData)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAddress(userId));
    
  }, []);

console.log(addressData)
  useEffect(() => {
    setCurrentUser(currUser);
    // console.log(cuurentUser);
  }, [cuurentUser, currUser]);




  return (
    <div style={{ margin: "0 2rem" }}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Your Address
      </h3>
      {addressData=== null||addressData.length==0 ? "": 
      <div className={""}>
        <Link to="/addressform">
          <Button variant="contained">Add Address</Button>
        </Link>
      </div>}
      <div className={""} style={{ margin: "8px 0px" }}>
        <h3>
          {firstName} <span>{lastName}</span>
        </h3>
        <p style={{ fontWeight: "lighter" }}>{phone}</p>
        { addressData == null||addressData.length==0? <><h1>No adderss added yet</h1>
         <Link to="/addressform">
          <Button variant="contained">Add Address</Button>
        </Link></>
        :
        addressData.map((item, index) => {
          let {addressId} = item
          return (
            <Card sx={{ maxWidth: 500, margin: "8px 0px" }}>
              <CardContent>
                <div style={{ display: "flex" }}>
                  <div className={""}>
                    <h4>{`Address ${index + 1}`} : &nbsp; </h4>
                    <div style={{ marginTop: "6px" }}>
                      {item.line1} , {item.landmark},{item.street}{" "}
                      {item.city} -{item.pincode},{item.number}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardActions>
                <Link to={`/editaddress/${item.addressId}`}>
                  <Button
                    size="small"
                    color="success"
                    startIcon={<ModeEditOutlineOutlinedIcon />}
                  ></Button>
                </Link>

                <Button
                  color="error"
                   onClick={() =>{
                    dispatch(deleteAddress({userId,addressId}))}}
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
