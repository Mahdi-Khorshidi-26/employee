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

export default function Home() {
  const [foundUser, setFoundUser] = useState(null);
  return (
    <>
      <Modal
        defaultButtonText="جستجو"
        isDoubled={false}
        isModal={false}
        name="جستجو"
        setFoundUser={setFoundUser}
      />
      {/* <Modal /> */}
      <div className={Styles.table_wrapper}>
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
            {foundUser ? (
              <tr>
                <td>{foundUser.id}</td>
                <td>{foundUser.firstName}</td>
                <td>{foundUser.lastName}</td>
                <td>{foundUser.nationalId}</td>
                <Actions  />
              </tr>
            ) : (
              users.map((user) => {
                return <User user={user} key={user.id}  />;
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function User({ user }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.nationalId}</td>
      <Actions/>
    </tr>
  );
}

function Actions({ foundUser }) {
  return (
    <tr>
      <td className={Styles.actions}>
        <span>
          <BiShow />
        </span>
        <span>
          <LiaEditSolid />
        </span>
        <span>
          <GrMap />
        </span>
        <span>
          <RiDeleteBin6Line />
        </span>
        <span>
          <AiOutlineBarChart />
        </span>
        {foundUser && (
          <span>
            <IoArrowBack />
          </span>
        )}
      </td>
    </tr>
  );
}
