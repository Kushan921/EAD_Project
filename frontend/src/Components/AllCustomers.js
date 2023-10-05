// import { Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";



// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "20%",
//     bottom: "auto",
//     marginRight: "-50%",
//     transform: "translate(-50%, -50%)",
//   },
// };

export default function AllCustomers() {

  const [items, setItems] = useState([]);  

//   const initialValues = {
//     f_name: "",
//     name: "",
//     description: "",
//     quantity: 0,
//   };

//   const validationSchema = Yup.object().shape({
//     // f_name: Yup.string().required("Required"),
//     // name: Yup.string().required("Required"),
//     // email: Yup.string().required("Required"),
//     // yom: Yup.number().required("Required"),
//     // l_name: Yup.string().required("Required"),
//   });

  useEffect(() => {
    axios
      .get("http://localhost:5003/api/User/GetAllUsers")
      .then((response) => {
        if (response) {
          setItems(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, [items]);

  console.log(items);

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Customer Manage</h1>
      </div>
     
      <div className=" px-10 mt-10 ">
        <div class=" shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  User ID
                </th>
                <th scope="col" class="px-6 py-3">
                  First Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Address
                </th>
                <th scope="col" class="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" class="px-6 py-3">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  NIC
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Activate / Deactivate
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td class="px-6 py-4">{item.fName}</td>
                  <td class="px-6 py-4">{item.lName}</td>
                  <td class="px-6 py-4">{item.address}</td>
                  <td class="px-6 py-4">{item.mobile}</td>
                  <td class="px-6 py-4">{item.email}</td>
                  <td class="px-6 py-4">{item.nic}</td>
                  
                  <td class="px-1 py-4 w-full justify-center flex gap-4">

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
        
    </section>
  );
}
