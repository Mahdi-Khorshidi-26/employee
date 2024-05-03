import { useState } from "react";
import Styles from "./modal.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../Input/Input";
import Button from "../Button/Button";
import PropTypes from "prop-types";
import { users } from "../UserData/Users";

Modal.propTypes = {
  isModal: PropTypes.bool,
  isDoubled: PropTypes.bool,
  name: PropTypes.string,
  defaultButtonText: PropTypes.string,
  buttonText2: PropTypes.string,
  setFoundUser: PropTypes.func,
  closeModal: PropTypes.func,
  isClosed: PropTypes.bool,
  modalType: PropTypes.string,
  onClick: PropTypes.func,
};

export default function Modal({
  isModal = true,
  isDoubled = true,
  name = "افزودن",
  defaultButtonText = "افزودن",
  buttonText2 = "بستن",
  setFoundUser = () => {},
  closeModal = () => {},
  isClosed = true,
  modalType = "add",
  onClick = () => {},
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!nationalId.trim() && !firstName.trim() && !lastName.trim()) return;
    const inputUser = { firstName, lastName, nationalId };
    let foundUser = users.filter((user) => {
      if (
        user.firstName === inputUser.firstName.trim() &&
        user.lastName === inputUser.lastName.trim() &&
        user.nationalId === inputUser.nationalId.trim()
      ) {
        return user;
      }
    });
    setFoundUser(foundUser);
    setFirstName("");
    setLastName("");
    setNationalId("");
  }

  return (
    <>
      {!isClosed && (
        <div
          className={
            isModal ? `${Styles.boxContainerModal}` : `${Styles.boxContainer}`
          }
        >
          <div className={Styles.formHeader}>
            <h3 className={Styles.formTitle}>{name}</h3>
            <span className={Styles.close} onClick={closeModal}>
              <IoMdClose className={Styles.closeIcon} />
            </span>
          </div>
          {modalType === "add" ? (
            <form
              onSubmit={(e) => handleFormSubmit(e)}
              className={
                isModal ? `${Styles.formModal}` : `${Styles.formAccordion}`
              }
            >
              <Input
                id="firstName"
                label="نام"
                setValue={setFirstName}
                type="text"
                value={firstName}
                required={!isModal}
              />
              <Input
                id="lastName"
                label="نام خانوادگی"
                setValue={setLastName}
                type="text"
                value={lastName}
                required={!isModal}
              />
              <Input
                id="nationalId"
                label="کد ملی"
                setValue={setNationalId}
                type="text"
                value={nationalId}
                required={!isModal}
              />
              {isDoubled ? (
                <div className={Styles.doubleBtn}>
                  <Button type="submit" text={defaultButtonText} />
                  <Button
                    type="submit"
                    text={buttonText2}
                    onClick={closeModal}
                  />
                </div>
              ) : (
                <Button type="submit" text={defaultButtonText} />
              )}
            </form>
          ) : (
            <>
              <p>آیا رکورد حذف شود ؟</p>
              <Button text="بله" onClick={()=>onClick()} />
              <Button text="خیر" onClick={closeModal} />
            </>
          )}
        </div>
      )}
    </>
  );
}
