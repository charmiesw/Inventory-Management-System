import {useEffect, useState} from "react"
import { Trash2 } from "react-feather"
import {AppDispatch} from "../store/store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {deleteCustomer, getCustomer, saveCustomer, updateCustomer} from "../reducers/CustomerReducer.ts";
import {Customers} from "../models/Customer.ts";

function Customer() {
  const dispatch = useDispatch<AppDispatch>();

  const customers = useSelector((state)=>state.customer);

  useEffect(() => {
    if(customers.length === 0){
      dispatch(getCustomer())
    }
  }, [dispatch, customers.length]);

  useEffect(() => {
    if (customers.length > 0) {
      const maxId = Math.max(...customers.map((customer) => Number(customer.CustomerID)));
      setId(String(maxId + 1));
    } else {
      setId("1");
    }
  }, [customers]);

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  const handleAdd = () => {
    if (!id || !name || !email || !address) {
      alert("All fields are required!")
      return
    }else {
      const newCustomer = new Customers(id, name, email, address);

      dispatch(saveCustomer(newCustomer));
      resetForm()
    }
  }

  const handleEdit = (customer: any) => {
    setId(customer.CustomerID);
    setName(customer.Name)
    setAddress(customer.Address)
    setEmail(customer.Email)
    setIsEditing(true)
  }

  const handleUpdate = () => {
    if (!id || !name || !email || !address) {
      alert("All fields are required!")
      return
    }
    const newCustomer = new Customers(id, name, email, address);
    dispatch(updateCustomer(newCustomer));
    resetForm()
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      dispatch(deleteCustomer(id));
    }
  }

  const resetForm = () => {
    setId("")
    setName("")
    setAddress("")
    setEmail("")
    setIsEditing(false)
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      <div className="flex justify-end">
        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white p-2 rounded mr-2"
          >
            Update
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Add
          </button>
        )}
        {isEditing && (
          <button
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
      <table className="min-w-full table-auto border-collapse mt-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer: Customers) => (
            <tr
              key={customer.CustomerID}
              onClick={() => handleEdit(customer)}
              className="hover:cursor-pointer hover:bg-slate-600 hover:text-white"
            >
              <td className="border px-4 py-2">{customer.CustomerID}</td>
              <td className="border px-4 py-2">{customer.Name}</td>
              <td className="border px-4 py-2">{customer.Address}</td>
              <td className="border px-4 py-2">{customer.Email}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(customer.CustomerID)}
                  className="bg-red-500 text-white p-2 rounded-lg"
                >
                  <Trash2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Customer
