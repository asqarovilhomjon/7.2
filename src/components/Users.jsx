import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser, updateUser, deleteUser } from "../context/userSlice";
import { FaRegEdit,FaRegTrashAlt  } from "react-icons/fa";
import { toast } from "react-toastify";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  const [modalType, setModalType] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    surname: "",
    url: "",
    age: "",
    gender: "",
  });
  const [editUser, setEditUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.name && newUser.surname && newUser.url && newUser.age && newUser.gender) {
      dispatch(addUser(newUser));
      setNewUser({ name: "", surname: "", url: "", age: "", gender: "" });
      setModalType(null);
    }
    toast.success("User added")
  };

  // const handleUpdateUser = () => {
  //   if (editUser.name && editUser.surname && editUser.url && editUser.age && editUser.gender) {
  //     dispatch(updateUser({ id: editUser.id, updatedUser: editUser }));
  //     setEditUser(null);
  //     setModalType(null);
  //   }
  //   toast.info("User updated")
  // };
  const handleUpdateUser = () => {
    if (editUser.name && editUser.surname && editUser.url && editUser.age && editUser.gender) {
      dispatch(updateUser({ id: editUser.id, updatedUser: editUser }))
        .then(() => {
          toast.info("User updated");
          setEditUser(null); // Edit maydonlarini tozalash
          setModalType(null); // Edit oynasini yopish
        });
    } else {
      toast.error("Please fill in all fields");
    }
  };
  

  const handleDeleteUser = () => {
    if (userToDelete) {
      dispatch(deleteUser(userToDelete));
      setUserToDelete(null);
      setModalType(null);
    }
    toast.warning("User deleted")
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
  <div className="bg-slate-100 p-6 flex-row rounded-lg shadow-lg w-full max-w-7xl">
    <h2 className="text-2xl text-center font-bold text-gray-800 mb-6">User List</h2>

    {loading && (
      <div className="flex flex-column items-center justify-center gap-2">
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:-0.5s]"></div>
      </div>
    )}

    {error && <p className="text-red-600 font-medium">Error: {error}</p>}

    {/* {users.map((user) => (
      <div
        key={user.id}
        className="flex flex-column items-center max-w-80 max-h-28 justify-between bg-white shadow-md p-4 mb-3 rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-4">
          <img
            src={user.url}
            alt="User Avatar"
            className="w-14 h-14 rounded-full border border-gray-300 object-cover"
          />
          <div>
            <p className="font-semibold text-lg text-gray-800">{user.name}</p>
            <p className="text-gray-600">{user.surname}</p>
            <p className="text-gray-500 text-sm">Age: {user.age}</p>
            <p className="text-gray-500 text-sm">Gender: {user.gender}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditUser(user);
              setModalType("edit");
            }}
            className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={() => {
              setUserToDelete(user.id);
              setModalType("delete");
            }}
            className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600 transition-all"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    ))} */}
    {users.length > 0 && (
  <div className="flex flex-wrap gap-6 justify-center">
    {users.map((user) => (
      <div
        key={user.id}
        className="bg-white shadow-lg p-4 rounded-lg border border-gray-200 w-[300px] h-[350px] flex flex-col items-center justify-center"
      >
        <img
          src={user.url}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border border-gray-300 object-cover mb-4"
        />
        <div className="text-center">
          <p className="font-semibold text-xl text-gray-800">{user.name}</p>
          <p className="text-gray-600 text-lg">{user.surname}</p>
          <p className="text-gray-500 text-sm">Age: {user.age}</p>
          <p className="text-gray-500 text-sm">Gender: {user.gender}</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => {
              setEditUser(user);
              setModalType("edit");
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={() => {
              setUserToDelete(user.id);
              setModalType("delete");
            }}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all"
          >
            <FaRegTrashAlt />
          </button>
        </div>
      </div>
    ))}
  </div>
)}


    {/* <button
      onClick={() => setModalType("add")}
      className="bg-green-500 text-white py-3 px-6 rounded-lg mt-5 shadow-md hover:bg-green-600 transition-all"
    >
      Add User
    </button> */}
  </div>

  {modalType === "add" && (
        <Modal title="Add New User" onClose={() => setModalType(null)}>
          <UserForm user={newUser} setUser={setNewUser} />
          <button
            onClick={handleAddUser}
            className="w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-all"
          >
            Add
          </button>
        </Modal>
      )}
      <button
        onClick={() => setModalType("add")}
        className="bg-blue-500 text-white mt-3 py-2 px-6 rounded hover:bg-blue-600"
      >
        Add User
      </button>

  {modalType === "edit" && editUser && (
    <Modal title="Edit User" onClose={() => setModalType(null)}>
      <UserForm user={editUser} setUser={setEditUser} />
      <button
        onClick={handleUpdateUser}
        className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 transition-all"
      >
        Update
      </button>
    </Modal>
  )}

  {modalType === "delete" && userToDelete && (
    <Modal title="Delete User" onClose={() => setModalType(null)}>
      <p>Are you sure you want to delete this user?</p>
      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={() => setModalType(null)}
          className="bg-gray-300 text-gray-700 py-1 px-3 rounded-lg hover:bg-gray-400 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleDeleteUser}
          className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-all"
        >
          Delete
        </button>
      </div>
    </Modal>
  )}
</div>

  );
};

const Modal = ({ title, children, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-5 rounded shadow-lg w-full max-w-md relative">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        {children}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const UserForm = ({ user, setUser }) => (
  <div>
    <input
      type="text"
      placeholder="Name"
      value={user.name}
      onChange={(e) => setUser({ ...user, name: e.target.value })}
      className="w-full p-2 mb-3 border border-gray-300 rounded"
    />
    <input
      type="text"
      placeholder="Surname"
      value={user.surname}
      onChange={(e) => setUser({ ...user, surname: e.target.value })}
      className="w-full p-2 mb-3 border border-gray-300 rounded"
    />
    <input
      type="text"
      placeholder="Avatar URL"
      value={user.url}
      onChange={(e) => setUser({ ...user, url: e.target.value })}
      className="w-full p-2 mb-3 border border-gray-300 rounded"
    />
    <input
      type="number"
      placeholder="Age"
      value={user.age}
      onChange={(e) => setUser({ ...user, age: e.target.value })}
      className="w-full p-2 mb-3 border border-gray-300 rounded"
    />
    <select
      value={user.gender}
      onChange={(e) => setUser({ ...user, gender: e.target.value })}
      className="w-full p-2 mb-3 border border-gray-300 rounded"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
);

export default Users;
