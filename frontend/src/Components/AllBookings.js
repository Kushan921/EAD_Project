import { Button, Link } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessto, ErrorMessage } from "formik";
import * as Yup from "yup";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function AllBookings() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [schedule, setschedule] = useState("");
  const [from, setfrom] = useState("");
  const [to, setto] = useState("");
  const [date, setdate] = useState("");
  const [time, settime] = useState("");
  const [count, setcount] = useState("");

  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const [existingSchedule, setExistingSchedule] = useState(null);
  const [schId, setId] = useState(null);
  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };

  //   const validationSchema = Yup.object().shape({
  //     to: Yup.number().required("Required to"),
  //     date: Yup.string().date("Invalid date address").required("Required"),
  //     count: Yup.string()
  //       .matches(/^0\d{9}$/, {
  //         messto: "count number must start with 0 and have exactly 10 digits",
  //       })
  //       .required("count number is required"),
  //     password: Yup.string().required("Required Password"),
  //     confirmPassword: Yup.string()
  //       .oneOf([Yup.ref("password")], "Passwords must match")
  //       .required("Required"),
  //   });
  useEffect(() => {
    axios
      .get("http://localhost:5003/GetAlBookings")
      .then((response) => {
        if (response) {
          setExistingSchedule(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, [existingSchedule]);
  useEffect(() => {
    axios
      .get("http://localhost:5003/GetAlBookings")
      .then((response) => {
        if (response) {
          setItems(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  }, [items]);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5003/DeleteBooking?id=${id} `)
      .then(() => {
        toast.error("Deleted Successfully!!");
      })
      .catch((err) => {
        alert(err);
      });
  };

  function AddProduct(values) {
    console.log(values);

    const response = axios
      .post(`http://localhost:5003/SaveBooking`, {
        schedule: schId,
        from: values.from,
        to: values.to,
        count: values.count,
        date: values.date,
        time: values.time,
      })
      .then(() => {
        toast.success("Booking Added Successfully!!");
        setIsNewOpen(false);
      })
      .catch(() => {
        toast.error("error!!");
      });
  }
  const handleSelectChange = (event) => {
    const selectedId = event.target.value;
    console.log(selectedId);
    setId(selectedId); // Update the id state with the selected value
  };

  function getOne(id) {
    const response = axios
      .get(`http://localhost:5003/UpdateBooking?id=${id}`)
      .then((response) => {
        setIsOpen(true);
        setschedule(response?.data?.first_name);
        setfrom(response?.data?.last_name);
        setto(response?.data?.to);
        setdate(response?.data?.date);
        setcount(response?.data?.time);
        setUpdateItem(response?.data?._id);
        console.log(response?.data?._id);
      });
  }
  function updateItem(values) {
    const response = axios
      .put(``, {
        first_name: values.schedule,
        last_name: values.from,
        to: values.to,
        date: values.date,
        contact: values.count,
        time: values.time,
      })
      .then((response) => {
        toast.success("update Successful");
        setIsOpen(false);
      });
  }

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">Bookings</h1>
      </div>
      <div className="w-full flex flex-row-reverse px-10 mt-10">
        <button
          type="button"
          onClick={() => {
            setIsNewOpen(true);
          }}
          class="  text-white bg-yellow-500 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
        >
          {" "}
          Add New
          <svg
            aria-hidden="true"
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className=" px-10 mt-10 ">
        <div class=" shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Train Schedule
                </th>
                <th scope="col" class="px-6 py-3">
                  From
                </th>
                <th scope="col" class="px-6 py-3">
                  Destination
                </th>
                <th scope="col" class="px-6 py-3">
                  Count
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>

                <th scope="col" class="px-6 py-3 text-center">
                  Action
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
                  <td class="px-6 py-4">{item.from}</td>
                  <td class="px-6 py-4">{item.to}</td>
                  <td class="px-6 py-4">{item.count}</td>
                  <td class="px-6 py-4">{item.date}</td>

                  <td class="px-1 py-4 w-full justify-center flex gap-4">
                    <button
                      className="font-medium text-yellow-300 hover:text-yellow-100"
                      onClick={() => {
                        getOne(item.id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.2}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>

                    <a
                      href="#"
                      class="font-medium"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this Booking ?"
                          )
                        ) {
                          deleteItem(item.id);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-red-500 hover:text-red-100"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        isOpen={addNewModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={AddProduct}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Train Schedule</p>
                    </div>
                    <div className="ll">
                      <div className="ll">
                        <select
                          className="w-full outline-2 border p-3"
                          required={true}
                          onChange={handleSelectChange}
                          value={schId}
                        >
                          <option className="p-3" value="">
                            -select-
                          </option>
                          {existingSchedule.map((sch) => (
                            <option key={sch.id} value={sch.id}>
                              {sch.departure}-{sch.designation}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">From</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="from"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col w-full"></div>
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">To</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="to"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="to"
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Date</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="date"
                      name="date"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="date"
                  />
                </div>
                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">count</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="count"
                      name="count"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="count"
                  />
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Time</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="time"
                      name="time"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="time"
                  />
                </div>

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsNewOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={{
              schedule: schedule,
              from: from,
              to: to,
              count: count,
              date: date,
              time: time,
            }}
            // validationSchema={validationSchema}
            onSubmit={updateItem}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Train Schedule</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="schedule"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">From</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="from"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">To</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="to"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="to"
                    />
                  </div>
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">count</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="count"
                      name="count"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="count"
                  />
                </div>

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Date</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="date"
                      name="date"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="date"
                  />
                </div>
                <div>
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Time</p>
                  </div>
                  <div className="ll w-full">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                      type="time"
                      name="time"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="time"
                  />
                </div>

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </section>
  );
}
