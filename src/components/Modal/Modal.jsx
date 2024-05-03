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
};

export default function Modal({
  isModal = true,
  isDoubled = true,
  name = "افزودن",
  defaultButtonText = "افزودن",
  buttonText2 = "بستن",
  setFoundUser = () => {},
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!nationalId && !firstName && !lastName) return;
    const inputUser = { firstName, lastName, nationalId };
    users.find((user) => {
      if (
        user.firstName === inputUser.firstName &&
        user.lastName === inputUser.lastName &&
        user.nationalId === inputUser.nationalId
      ) {
        setFoundUser(user);
        // console.log(user);
      }
    });
    setFirstName("");
    setLastName("");
    setNationalId("");
  }

  return (
    <>
      <div
        className={
          isModal ? `${Styles.boxContainerModal}` : `${Styles.boxContainer}`
        }
      >
        <div className={Styles.formHeader}>
          <h3 className={Styles.formTitle}>{name}</h3>
          <span className={Styles.close}>
            <IoMdClose className={Styles.closeIcon} />
          </span>
        </div>
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
              <Button>
                <button>
                  <a>{defaultButtonText}</a>
                </button>
              </Button>
              <Button>
                <button>
                  <a>{buttonText2}</a>
                </button>
              </Button>
            </div>
          ) : (
            <Button>
              <button>
                <a>{defaultButtonText}</a>
              </button>
            </Button>
          )}
        </form>
      </div>
    </>
  );
}
