import "./style.css";
import Image from "next/image";

export const Popup = ({money, handleClose}) => {
  const PopupForm = () => {
    return (
      <form className="main bg-dark">
        <p style={{ textAlign: "center" }} className="text-light h5">
          Request a call back
        </p>
        <input
          type="text"
          className="modal-input py-2 rounded bg-dark text-light"
          placeholder="Enter Name"
        />
        <input
          type="text"
          className="modal-input py-2 rounded bg-dark text-light"
          placeholder="Mobile Number"
        />
        <button className="btn px-4">Request a call back</button>
      </form>
    );
  };

  const PopupDone = () => {
    return (
      <div className="callback">
        <div id="logo">
          <img src={"/assets/correct.png"} />
        </div>
        <div id="head1" style={{ fontSize: "1.3rem", marginTop: 20 }}>
          Request a call back
        </div>
        <div id="head2" style={{ fontSize: "1.1rem" }}>
          Our Team will call you shortly in <p>12-24 hrs</p>
        </div>
        <div id="head3" style={{ fontSize: "1.2rem" }}>
          Can't you wait for call?
        </div>
        <div id="NxtBtn"> Check another video -- </div>
      </div>
    );
  };

  const PopupEarn = () => {
    return (
      <div className="callback">
        <div id="logo">
          <img src={"/assets/correct.png"} />
        </div>
        <div id="head1" style={{ fontSize: "1.3rem", marginTop: 20 }}>
          Your Video Earning
        </div>
        <div id="head2" style={{ fontSize: "1.1rem" }}>
          Rs. {money}
        </div> 
        <div id="NxtBtn" onClick={handleClose}> Check another video </div>
      </div>
    );
  };
  return (
    <>
      <main className="card bg-dark">
        {/* { type ? <PopupDone /> : <PopupForm /> } */}
        <PopupEarn />
      </main>
    </>
  );
};
