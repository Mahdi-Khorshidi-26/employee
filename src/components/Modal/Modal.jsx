import Styles from "./modal.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../Input/Input";
import Button from "../Button/Button";
import PropTypes from "prop-types";

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
  firstName: PropTypes.string,
  setFirstName: PropTypes.func,
  lastName: PropTypes.string,
  setLastName: PropTypes.func,
  nationalId: PropTypes.string,
  setNationalId: PropTypes.func,
};

export default function Modal({
  isModal,
  isDoubled = true,
  name = "افزودن",
  defaultButtonText = "افزودن",
  buttonText2 = "بستن",
  closeModal = () => {},
  isClosed = true,
  modalType = "add",
  onClick = () => {},
  firstName,
  setFirstName,
  lastName,
  setLastName,
  nationalId,
  setNationalId,
}) {
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
          {modalType === "add" ||
          modalType === "edit" ||
          modalType === "show" ||
          modalType === "search" ? (
            <form
              onSubmit={(e) => onClick(e)}
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
                disable={modalType === "show"}
              />
              <Input
                id="lastName"
                label="نام خانوادگی"
                setValue={setLastName}
                type="text"
                value={lastName}
                required={!isModal}
                disable={modalType === "show"}
              />
              <Input
                id="nationalId"
                label="کد ملی"
                setValue={setNationalId}
                type="text"
                value={nationalId}
                required={!isModal}
                disable={modalType === "show"}
              />
              {isDoubled ? (
                <div className={Styles.doubleBtn}>
                  <Button
                    type="submit"
                    text={defaultButtonText}
                    onClick={onClick}
                  />
                  <Button text={buttonText2} onClick={closeModal} type="link" />
                </div>
              ) : (
                <Button
                  text={defaultButtonText}
                  onClick={
                    modalType === "search"
                      ? onClick
                      : modalType === "show"
                      ? closeModal
                      : () => {}
                  }
                  type={modalType === "search" ? "submit" : "link"}
                />
              )}
            </form>
          ) : (
            <>
              <p>آیا رکورد حذف شود ؟</p>
              <Button text="بله" onClick={() => onClick()} />
              <Button text="خیر" onClick={closeModal} />
            </>
          )}
        </div>
      )}
    </>
  );
}
