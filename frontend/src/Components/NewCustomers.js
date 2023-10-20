import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Switch from "react-switch";

export default function NewCustomers() {
  const [items, setItems] = useState([]);
const getData=()=>{
    axios
    .get("http://localhost:5003/api/User/GetAllUsers")
    .then((response) => {
      if (response) {
          let temp=[];
          response.data.forEach(element => {
          if(!element.active)
          {
              temp.push(element)
          }

        });
          setItems(temp);

      } else {
        toast.error("Error While Fetching Data!!");
      }
    })
    .catch((error) => toast.error(error));
}
  useEffect(() => {
    getData();
  }, []);

  const handleActive = (status,model) => {
    model.active=status;
    console.log(model)
axios.put("http://localhost:5003/api/User/UpdateUser?id="+model.id,model).then((response)=>{
    console.log(response)
getData();


}).catch((error)=>{

})

  };

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Newly Registered Users</h1>
      </div>

      <div className="px-10 mt-10 ">
        <div className="shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User ID
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Mobile
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  NIC
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Activate / Deactivate
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={item.id}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.fName}</td>
                  <td className="px-6 py-4">{item.lName}</td>
                  <td className="px-6 py-4">{item.address}</td>
                  <td className="px-6 py-4">{item.mobile}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.nic}</td>
                  <td className="px-1 py-4 w-full justify-center flex gap-4">
                    {item.active?(<button
      onClick={() => {
        handleActive(false, item);
      }}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-red-400"
    >
      Deactivate
    </button>
  ) : (
    <button
      onClick={() => {
        handleActive(true, item);
      }}
      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md focus:outline-none focus:ring focus:ring-green-400"
    >
      Activate
    </button>)}
                  
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
