import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./selectaddress.module.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";

const SelectAddress = () => {
  let [proceed, setproceed] = useState(false);
  let [use, setuse] = useState(false);
  let navigate = useNavigate();

  let currUser = useSelector(state => state.user.currentUser);
  console.log(currUser);
  let { firstName, lastName, gender, email, phone, addressList, id } = currUser;

  useEffect(() => {
    let address = currUser;
    console.log(address);
  }, []);

  let remove = () => {};

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
        {/* <Link to="/addressform">
          {" "}
          <button className={style.adneadd}>Add New Address</button>
        </Link> */}
      </div>
      <div className="adcon">
        <h3>
          {firstName} <span>{lastName}</span>
        </h3>
        <p style={{ fontWeight: "lighter" }}>{phone}</p>

        {addressList.map((item, index) => {
          return (
            <div style={{ display: "flex" }}>
              <input type="radio" name="address" onClick={() => setuse(!use)} />
              <div className={style.addname}>
                <h4>{`Address ${index + 1}`} : &nbsp; </h4>
                <p>
                  {item.houseNo} , {item.landMark},{item.street}, {item.city} -
                  {item.pincode}{" "}
                </p>
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
