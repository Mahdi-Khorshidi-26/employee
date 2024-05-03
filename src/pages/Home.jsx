/* eslint-disable react/prop-types */
import Styles from "./home.module.css";
import { BiShow } from "react-icons/bi";
import { LiaEditSolid } from "react-icons/lia";
import { GrMap } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
import Modal from "../components/Modal/Modal";
import { useState } from "react";
import { idNumber, users } from "../components/UserData/Users";
import { IoArrowBack } from "react-icons/io5";
import Button from "../components/Button/Button";
import { ImExit } from "react-icons/im";

export default function Home() {
  const [foundUser, setFoundUser] = useState(null);
  const [usersState, setUsersState] = useState(users);
  const [closeModal, setCloseModal] = useState(true);
  const [userId, setUserId] = useState(0);
  const [modalType, setModalType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [id, setId] = useState(idNumber + 1);

  function handleUserSearch(e) {
    e.preventDefault();
    if (!nationalId.trim() && !firstName.trim() && !lastName.trim()) return;
    let foundUser = usersState.filter((user) => {
      if (
        user.firstName === firstName.trim() &&
        user.lastName === lastName.trim() &&
        user.nationalId === nationalId.trim()
      ) {
        return user;
      }
    });
    setFoundUser(foundUser);
    openModal();
  }

  function handleBackButton() {
    setFoundUser(null);
  }

  function openModal() {
    setCloseModal((prevClose) => !prevClose);
    setFirstName("");
    setLastName("");
    setNationalId("");
  }
  function handleDeletingUser() {
    const remainedUsers = usersState.filter((user) => user.id !== userId);
    setUsersState(remainedUsers);
    setCloseModal((prevClose) => !prevClose);
  }

  function handleAddUser() {
    const newUser = { id, firstName, lastName, nationalId };
    if (nationalId.trim() && firstName.trim() && lastName.trim()) {
      let checkedUser = usersState.some(
        (user) => user.nationalId === newUser.nationalId
      );
      if (checkedUser) {
        alert("کد ملی وارد شده تکراری است دوباره تلاش کنید 🙃");
      } else {
        setId((id) => id + 1);
        setUsersState((usersState) => [...usersState, newUser]);
        openModal();
      }
    } else {
      return;
    }
  }

  function handleShowUser() {
    let selectedUser = usersState.find((user) => {
      return user.id === userId;
    });
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setNationalId(selectedUser.nationalId);
    }
    if (closeModal) {
      setFirstName("");
      setLastName("");
      setNationalId("");
    }
  }
  function handleEditUser() {
    let selectedUser = usersState.find((user) => {
      return user.id === userId;
    });
    if (selectedUser) {
      setFirstName(selectedUser.firstName);
      setLastName(selectedUser.lastName);
      setNationalId(selectedUser.nationalId);
    }
    console.log(selectedUser.firstName);

    // setFirstName("");
    // setLastName("");
    // setNationalId("");
    // openModal();
  }

  return (
    <>
      {!closeModal && (
        <Modal
          isModal={modalType === "search" ? false : true}
          isClosed={closeModal}
          closeModal={openModal}
          name={
            modalType === "delete"
              ? "حذف"
              : modalType === "add"
              ? "افزودن"
              : modalType === "show"
              ? "مشاهده"
              : modalType === "edit"
              ? "ویرایش"
              : modalType === "search"
              ? "جستجو"
              : ""
          }
          defaultButtonText={
            modalType === "add"
              ? "افزودن"
              : modalType === "show"
              ? "بستن"
              : modalType === "edit"
              ? "تایید"
              : modalType === "search"
              ? "جستجو"
              : ""
          }
          isDoubled={modalType !== "show" && modalType !== "search"}
          modalType={modalType}
          onClick={
            modalType === "delete"
              ? handleDeletingUser
              : modalType === "show"
              ? handleShowUser
              : modalType === "edit"
              ? handleEditUser
              : modalType === "add"
              ? handleAddUser
              : modalType === "search"
              ? handleUserSearch
              : console.log("Error")
          }
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          nationalId={nationalId}
          setNationalId={setNationalId}
        />
      )}
      <div className={Styles.table_wrapper}>
        <div className={Styles.btnContainer}>
          <Button
            type="link"
            text="افزودن"
            onClick={() => {
              openModal();
              setModalType("add");
            }}
          />
          <Button
            type="link"
            text="جستجو"
            onClick={() => {
              openModal();
              setModalType("search");
            }}
          />
        </div>
        <table className={Styles.fl_table}>
          <thead>
            <tr>
              <th>ردیف</th>
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>کد ملی</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {foundUser
              ? foundUser.map((foundUser) => {
                  return (
                    <User
                      user={foundUser}
                      key={foundUser.id}
                      foundUser={foundUser}
                      onClick={openModal}
                      handleBackButton={handleBackButton}
                      setUserId={setUserId}
                      setModalType={setModalType}
                    />
                  );
                })
              : usersState.map((user) => {
                  return (
                    <User
                      user={user}
                      key={user.id}
                      foundUser={foundUser}
                      onClick={openModal}
                      handleBackButton={handleBackButton}
                      setUserId={setUserId}
                      setModalType={setModalType}
                    />
                  );
                })}
          </tbody>
        </table>
        {foundUser?.length === 0 && (
          <p className={Styles.notFound}>
            موردی پیدا نشد 😓
            <ImExit onClick={handleBackButton} />
          </p>
        )}
      </div>
    </>
  );
}

function User({
  user,
  foundUser,
  onClick,
  handleBackButton,
  setUserId,
  setModalType,
}) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.nationalId}</td>
      <td className={Styles.actions}>
        <Actions
          foundUser={foundUser}
          onClick={onClick}
          handleBackButton={handleBackButton}
          userId={user.id}
          setUserId={setUserId}
          setModalType={setModalType}
        />
      </td>
    </tr>
  );
}

function Actions({
  foundUser,
  onClick,
  handleBackButton,
  userId,
  setUserId,
  setModalType,
}) {
  return (
    <>
      <BiShow
        style={{ color: "#119cb6" }}
        onClick={() => {
          onClick();
          setUserId(userId);
          setModalType("show");
        }}
      />
      <LiaEditSolid
        style={{ color: "#e4aa49" }}
        onClick={() => {
          onClick();
          setUserId(userId);
          setModalType("edit");
        }}
      />
      <GrMap
        style={{ color: "#b22e3a" }}
        onClick={() => {
          onClick();
          setUserId(userId);
          setModalType("show");
        }}
      />
      <RiDeleteBin6Line
        style={{ color: "#ee9a93" }}
        onClick={() => {
          onClick();
          setUserId(userId);
          setModalType("delete");
        }}
      />
      <AiOutlineBarChart
        style={{ color: "orange" }}
        onClick={() => {
          onClick();
          setUserId(userId);
          setModalType("show");
        }}
      />
      {foundUser && <IoArrowBack onClick={handleBackButton} />}
    </>
  );
}
