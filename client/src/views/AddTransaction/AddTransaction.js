import axios from "axios";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddTransaction.css";

function AddTransaction() {
  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("credit");
  const [category, setCategory] = useState("learning");

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const addTransaction = async () => {
    if (!title || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/transaction`,
        {
          title,
          amount,
          type,
          category,
          user: user._id,
        }
      );
      toast.success(response.data.message);
      setTitle("");
      setAmount("");
      setType("credit");
      setCategory("learning");

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      toast.error("Failed to add transaction");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="card shadow-lg p-4 animate-fade bg-white rounded-4">
              <h3 className="text-center mb-4 text-primary fw-bold text-dark">
                Add Transaction for{" "}
                <span className="text-gradient">{user.fullName}</span>
              </h3>

              <form className="d-flex flex-column gap-3">
                <input
                  type="text"
                  className="form-control modern-input"
                  placeholder="Transaction Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <input
                  type="number"
                  className="form-control modern-input"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <select
                  className="form-select modern-input"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="credit">Income</option>
                  <option value="debit">Expense</option>
                </select>

                <select
                  className="form-select modern-input"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="food">Food</option>
                  <option value="rent">Rent</option>
                  <option value="utilities">Utilities</option>
                  <option value="transportation">Transportation</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="clothing">Clothing</option>
                  <option value="health">Health</option>
                  <option value="salary">Salary</option>
                  <option value="learning">Learning</option>
                </select>

                <button
                  type="button"
                  className="btn btn-primary modern-btn w-100"
                  onClick={addTransaction}
                >
                  ➕ Add Transaction
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Toaster />
      <Footer />
    </>
  );
}

export default AddTransaction;
