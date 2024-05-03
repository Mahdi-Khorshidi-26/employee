/* eslint-disable react/prop-types */
import Styles from "./home.module.css";
import { BiShow } from "react-icons/bi";
import { LiaEditSolid } from "react-icons/lia";
import { GrMap } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineBarChart } from "react-icons/ai";
import Modal from "../components/Modal/Modal";
import { useState } from "react";
import { users } from "../components/UserData/Users";
import { IoArrowBack } from "react-icons/io5";
import Button from "../components/Button/Button";
import { ImExit } from "react-icons/im";

export default function Home() {
  const [foundUser, setFoundUser] = useState(null);
  const [usersState, setUsersState] = useState(users);
  const [close, setClose] = useState(true);
  const [closeModal, setCloseModal] = useState(true);
  // const [modalType, setModalType] = useState("add");
  function handleBackButton() {
    setFoundUser(null);
  }
  function handleCloseBtn() {
    setClose((prevState) => !prevState);
  }
  function openModal() {
    setCloseModal((prevClose) => !prevClose);
  }
  function handleDeletingUser(userId) {
    const remainedUsers = usersState.filter((user) => user.id !== userId);
    setUsersState(remainedUsers);
    setCloseModal((prevClose) => !prevClose);
    console.log(remainedUsers);
    console.log(userId);
  }
  // function addUser(){

  // }

  return (
    <>
      <Modal
        defaultButtonText="جستجو"
        isDoubled={false}
        isModal={false}
        name="جستجو"
        setFoundUser={setFoundUser}
        closeModal={handleCloseBtn}
        isClosed={close}
        modalType="search"
      />
      {!closeModal && (
        <Modal
          isClosed={closeModal}
          closeModal={openModal}
          name="حذف"
          modalType="delete"
          onClick={handleDeletingUser}
        />
      )}
      <div className={Styles.table_wrapper}>
        <div className={Styles.btnContainer}>
          <Button type="link" text="افزودن" />
          <Button type="link" text="جستجو" onClick={handleCloseBtn} />
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

function User({ user, foundUser, onClick, handleBackButton }) {
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
        />
      </td>
    </tr>
  );
}

function Actions({ foundUser, onClick, handleBackButton, userId }) {
  return (
    <>
      <BiShow style={{ color: "#119cb6" }} onClick={() => onClick(userId)} />
      <LiaEditSolid
        style={{ color: "#e4aa49" }}
        onClick={() => onClick(userId)}
      />
      <GrMap style={{ color: "#b22e3a" }} onClick={() => onClick(userId)} />
      <RiDeleteBin6Line
        style={{ color: "#ee9a93" }}
        onClick={() => onClick(userId)}
      />
      <AiOutlineBarChart
        style={{ color: "orange" }}
        onClick={() => onClick(userId)}
      />
      {foundUser && <IoArrowBack onClick={handleBackButton} />}
    </>
  );
}
