import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Cataxios from "../../apis/Cataxios";
import CategoriesComp from "./CategoriesComp";
const Electronics = () => {
  let [data, setdata] = useState({});
  const fetchdata = async () => {
    let { data } = await Cataxios.get("/electronics");
    setdata(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <>
      <CategoriesComp
        data={data}
        setdata={setdata}
        fetchdata={fetchdata}
        lable="electronics"
      />
    </>
  );
};

export default Electronics;
