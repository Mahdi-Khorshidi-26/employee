import { useState } from "react";
import Styles from "./modal.module.css";
import { IoMdClose } from "react-icons/io";
import Input from "../Input/Input";
import Button from "../Button/Button";

const users = [
  {
    firstName: "مهدی",
    lastName: "خورشیدی",
    nationalId: "1234567890",
    id: 1,
  },
  {
    firstName: "مرجان",
    lastName: "سیدی",
    nationalId: "0987654321",
    id: 2,
  },
  {
    firstName: "متین",
    lastName: "موسوی",
    nationalId: "3276092145",
    id: 3,
  },
  {
    firstName: "رضا",
    lastName: "پودینه",
    nationalId: "2198326523",
    id: 1,
  },
  {
    firstName: "سلمان",
    lastName: "هاشمی",
    nationalId: "4187692514",
    id: 4,
  },
  {
    firstName: "هانیه",
    lastName: "خواجوی نسب",
    nationalId: "8714653214",
    id: 5,
  },
  {
    firstName: "هانیه",
    lastName: "نسب",
    nationalId: "1265418769",
    id: 6,
  },
  {
    firstName: "مهدی",
    lastName: "خورشیدی",
    nationalId: "1457365814",
    id: 7,
  },
];

export default function Modal() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nationalId, setNationalId] = useState("");
  function handleFormSubmit(e) {
    e.preventDefault();
    if (!nationalId && !firstName && !lastName) return;
    const inputUser = { firstName, lastName, nationalId };
    users.filter((user) => {
      if (user.firstName === inputUser.firstName) {
        console.log(user);
      }
      if (user.lastName === inputUser.lastName) {
        console.log(user);
      }
      if (user.nationalId === inputUser.nationalId) {
        console.log(user);
      }
    });
  }

  return (
    <div className={Styles.boxContainer}>
      <div className={Styles.formHeader}>
        <h3 className={Styles.formTitle}>جستجو</h3>
        <span className={Styles.close}>
          <IoMdClose className={Styles.closeIcon} />
        </span>
      </div>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <Input
          id="firstName"
          label="نام"
          setValue={setFirstName}
          type="text"
          value={firstName}
        />
        <Input
          id="lastName"
          label="نام خانوادگی"
          setValue={setLastName}
          type="text"
          value={lastName}
        />
        <Input
          id="nationalId"
          label="کد ملی"
          setValue={setNationalId}
          type="text"
          value={nationalId}
        />
        <Button>
          <button>
            <a>جستجو</a>
          </button>
        </Button>
      </form>
    </div>
  );
}
