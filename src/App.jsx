import "./App.css";
import BgDesktop from "./images/bg-main-desktop.png";
import BgMobile from "./images/bg-main-mobile.png";
import logo from "./images/card-logo.svg";
import check from "./images/icon-complete.svg";
import { useState } from "react";
import Cleave from "cleave.js/react";

function App() {
  const [confirmed, setConfirmed] = useState(false);
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState();
  const [expDate, setExpDate] = useState();
  const [cvc, setCvc] = useState();

  return (
    <section>
      <div className="">
        <picture>
          <source media="(min-width: 768px)" srcSet={BgDesktop} />
          <img src={BgMobile} alt="" className="max-md:w-full" />
        </picture>
      </div>
      <div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <article className="front-card p-5 flex  flex-col justify-between text-white	 ">
            <img src={logo} alt="" className="w-16  lg:p-4 lg:w-32" />
            <div>
              <h2 className="text-xl tracking-wider mb-4 lg:mb-8 lg:text-3xl lg:tracking-widest lg:mx-4">
                {cardNumber}
              </h2>

              <ul className="flex justify-between item-center tracking-wider">
                <li className="text-xs lg:mx-4 lg:tracking-widest lg:text-base  lg:mb-4">
                  {name}
                </li>
                <li className="text-xs lg:mx-4 lg:tracking-widest lg:text-base lg:mb-4 ">
                  {expDate}
                </li>
              </ul>
            </div>
          </article>
          <article className="back-card relative text-white tracking-wide">
            <p className="absolute top-16 right-6 pt-5 text-xs lg:text-base lg:top-24 lg:right-14 lg:mt-2 lg:tracking-widest">
              {cvc}
            </p>
          </article>

          <div className="form-div">
            {!confirmed && (
              <form action="" className="relative  mx-8 pb-14 top-28 ">
                <div>
                  <label htmlFor="cardHolder_name">CARDHOLDER NAME</label>
                  <input
                    type="text"
                    name="cardHolder_name"
                    id="cardHolder_name"
                    placeholder="e.g. Greta Thunberg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="card_number">CARD NUMBER</label>
                  <Cleave
                    type="text"
                    name="card_number"
                    id="card_number"
                    placeholder="e.g. 1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    options={{
                      creditCard: true,
                      onCreditCardTypeChanged: function (type) {
                        // update UI ...
                      },
                    }}
                  />
                </div>
                <article className="flex justify-between gap-4">
                  <div>
                    <label htmlFor="expiry_date">EXP. DATE (MM/YY)</label>
                    <Cleave
                      type="text"
                      name="expiry_date"
                      id="expiry_date"
                      placeholder="MM / YY"
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      options={{
                        date: true,
                        datePattern: ["m", "y"],
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvc">CVC</label>
                    <Cleave
                      type="text"
                      name="cvc"
                      id="cvc"
                      placeholder="129"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      options={{
                        blocks: [3],
                        numericOnly: true,
                      }}
                    />
                  </div>
                </article>
                <button
                  onClick={() => setConfirmed(true)}
                  className="btn w-full "
                >
                  Confirm
                </button>
              </form>
            )}
            {confirmed && <CardProcessed setConfirmed={setConfirmed} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;

function CardProcessed({ setConfirmed }) {
  return (
    <>
      <div className="flex flex-col items-center gap-8 lg:ml-24 lg:mt-44 mt-32">
        <img src={check} alt="" className="w-20" />
        <h2 className="text-2xl">THANK YOU!</h2>
        <p className="text-slate-400">We 've added your card details</p>
        <button
          className="btn block mx-auto mt-4 w-80 "
          onClick={() => setConfirmed(false)}
        >
          Continue
        </button>
      </div>
    </>
  );
}
