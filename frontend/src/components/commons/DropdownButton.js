// import React, { useEffect, useRef, useState } from "react";
// import face from "../../assets/images/nerd-face.jpg";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// const DropdownButton = ({ userLoggingOut }) => {
//   let firstName, lastName;

//   const data = useSelector((state) => state?.User);
//   if (data) {
//     firstName = data.userData?.fname;
//     lastName = data.userData?.lname;
//   }
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   const handleOptionClick = (option) => {
//     switch (option) {
//       case "Logout":
//         userLoggingOut();
//         break;
//       case "Profile":
//         navigate(
//           data.userData.user_type === "freelancer"
//             ? "/freelancer/freelancer-profile"
//             : "/hirer/hirer-profile"
//         );
//         setIsOpen(false);
//         break;
//       case "Search Jobs":
//         navigate("/freelancer/jobseeker");
//         setIsOpen(false);
//         break;
//       case "Post Jobs":
//         navigate("/sell/create-content");
//         setIsOpen(false);
//         break;
//       case "My Applied Jobs":
//         navigate("/freelancer/myjobs");
//         setIsOpen(false);
//         break;
//       case "My Posted Jobs":
//         navigate("/hirer/dashboard");
//         setIsOpen(false);
//         break;
//       case "My Portfolio":
//         navigate("/freelancer/portfolio");
//         setIsOpen(false);
//         break;
//       case "Messages":
//         navigate(
//           data.userData.user_type === "freelancer"
//             ? "/freelancer/message"
//             : "/hirer/message"
//         );
//         setIsOpen(false);
//         break;
//       default:
//         break;
//     }
//   };

//   const freelancerOptions = [
//     { label: "Profile", action: "Profile" },
//     { label: "Search Jobs", action: "Search Jobs" },
//     { label: "My Applied Jobs", action: "My Applied Jobs" },
//     { label: "Messages", action: "Messages" },
//     { label: "My Portfolio", action: "My Portfolio" },
//   ];

//   const hireOptions = [
//     { label: "Profile", action: "Profile" },
//     { label: "Post Jobs", action: "Post Jobs" },
//     { label: "My Posted Jobs", action: "My Posted Jobs" },
//     { label: "Messages", action: "Messages" },
//   ];

//   const options =
//     data.userData.user_type === "freelancer" ? freelancerOptions : hireOptions;

//   return (
//     <div className="relative inline-block text-left" ref={dropdownRef}>
//       <button
//         onClick={handleToggle}
//         className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//       >
//         Hi, {firstName?.toUpperCase()} {lastName?.toUpperCase()}{" "}
//         <i className="fa-solid fa-caret-down text-white"></i>
//       </button>
//       {isOpen && (
//         <div className="hidden md:block origin-top-right absolute right-0 mt-4 w-[250px] shadow-lg rounded-b-lg bg-green-50 ring-1 ring-black ring-opacity-5">
//           <div className="flex flex-col">
//             <div className="relative flex flex-col items-center gap-2 p-2">
//               <img
//                 src={face}
//                 alt="user-image"
//                 className="w-[80px] h-[80px] rounded-full mt-1 "
//               />
//               <p className="text-sm">
//                 {firstName?.toUpperCase()}{" "}
//                 {data?.userData?.lname?.toUpperCase()}
//               </p>
//             </div>
//             {options.map((opt) => (
//               <button
//                 key={opt.action}
//                 onClick={() => handleOptionClick(opt.action)}
//                 className={`block px-4 py-1.5 text-sm text-left text-black hover:bg-green-500 hover:text-white hover:font-bold ${
//                   opt.label == "Profile"
//                     ? "border-t mt-2 border-b border-solid border-green-600"
//                     : "border-b border-solid border-green-600"
//                 }`}
//               >
//                 {opt.label}
//               </button>
//             ))}
//             <button
//               onClick={() => handleOptionClick("Logout")}
//               className="block px-4 py-1.5 text-sm text-black text-left hover:bg-green-500 hover:text-white hover:font-bold hover:rounded-b-lg"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropdownButton;

import React, { useEffect, useRef, useState } from "react";
import face from "../../assets/images/nerd-face.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const DropdownButton = ({ userLoggingOut }) => {
  let firstName, lastName;

  const data = useSelector((state) => state?.User);
  if (data) {
    firstName = data.userData?.fname;
    lastName = data.userData?.lname;
  }
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    switch (option) {
      case "Logout":
        userLoggingOut();
        break;
      case "Profile":
        navigate("/user/profile");
        setIsOpen(false);
        break;
      case "Buy":
        navigate("/buy");
        setIsOpen(false);
        break;
      case "Sell":
        navigate("/sell");
        setIsOpen(false);
        break;
      case "Sell Dashboard":
        navigate("/sell/sell-dashboard");
        setIsOpen(false);
        break;
      case "My Orders":
        navigate("orders/my-orders");
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const options = [
    { label: "Profile", action: "Profile" },
    { label: "Buy", action: "Buy" },
    { label: "Sell", action: "Sell" },
    { label: "Sell Dashboard", action: "Sell Dashboard" },
    { label: "My Orders", action: "My Orders" },
  ];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Hi, {firstName?.toUpperCase()} {lastName?.toUpperCase()}{" "}
        <i className="fa-solid fa-caret-down text-white"></i>
      </button>
      {isOpen && (
        <div className="hidden md:block origin-top-right absolute right-0 mt-4 w-[250px] shadow-lg rounded-b-lg bg-green-50 ring-1 ring-black ring-opacity-5">
          <div className="flex flex-col">
            <div className="relative flex flex-col items-center gap-2 p-2">
              <img
                src={face}
                alt="user-image"
                className="w-[80px] h-[80px] rounded-full mt-1 "
              />
              <p className="text-sm">
                {firstName?.toUpperCase()}{" "}
                {data?.userData?.lname?.toUpperCase()}
              </p>
            </div>
            {options.map((opt) => (
              <button
                key={opt.action}
                onClick={() => handleOptionClick(opt.action)}
                className={`block px-4 py-1.5 text-sm text-left text-black hover:bg-green-500 hover:text-white hover:font-bold ${
                  opt.label == "Profile"
                    ? "border-t mt-2 border-b border-solid border-green-600"
                    : "border-b border-solid border-green-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              onClick={() => handleOptionClick("Logout")}
              className="block px-4 py-1.5 text-sm text-black text-left hover:bg-green-500 hover:text-white hover:font-bold hover:rounded-b-lg"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
