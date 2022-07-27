import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import style from "./selectaddress.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { fetchAddress } from "../../../features/address/addressSlice";

const SelectAddress = () => {
  let [proceed, setproceed] = useState(false);
  let [use, setuse] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let currUser = useSelector(state => state.user.currentUser);
  // console.log(currUser);
  let { firstName, lastName, gender, email, phone, addressList, userId } =
    currUser;
  let address = useSelector(state => state.address.addressList);
  useEffect(() => {
    dispatch(fetchAddress(userId));
  }, []);
  let handlesubmit = () => {
    if (use === true) {
      setproceed(!proceed);
      toast.success("Order Placed Successfully to this Address");
      navigate("/place-order");
    } else {
      toast.error("Please select address to be delivered");
    }
  };

  return (
    <div className={style.addresscont}>
      <h3 style={{ marginBottom: "30px", textAlign: "center" }}>
        Select Address
      </h3>

      <div className={style.df}>
        <p style={{ color: "black", fontWeight: "bold" }}>Deliver to:</p>
        <Link to="/addressform">
          {" "}
          <button className={style.adneadd}>Add New Address</button>
        </Link>
      </div>
      <div className="adcon">
        <h3>
          {firstName} <span>{lastName}</span>
        </h3>
        <p style={{ fontWeight: "lighter" }}>{phone}</p>

        {address.map((item, index) => {
          return (
            <div style={{ display: "flex" }} key={index}>
              <input type="radio" name="address" onClick={() => setuse(!use)} />
              <div className={style.addname}>
                <h4>{`Address ${index + 1}`} : &nbsp; </h4>
                <h5>
                  <strong>{item.name}</strong>
                </h5>
                <p>
                  {" "}
                  {item.buildingInfo} , {item.streetInfo},{item.landmark},{" "}
                  {item.city} - {item.pincode}
                </p>
                <strong>contact :</strong>
                {item.phone}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={handlesubmit} className={style.proceed}>
        Proceed
      </button>
    </div>
  );
};

export default SelectAddress;
