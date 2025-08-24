import toast from "react-hot-toast";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "./TransactionCard.css";

function TransactionCard({ _id, title, amount, category, type, createdAt, loadTransactions }) {
  const deleteTransaction = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/transaction/${_id}`);
      toast.success(response.data.message);
      loadTransactions();
    } catch (error) {
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <Card className="transaction-card shadow-lg border-0 rounded-4 p-2">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">{title}</h5>
          <small className="text-muted">
            {new Date(createdAt).toLocaleDateString()}{" "}
            {new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </small>
        </div>

        <p className="text-secondary">{category || "General"}</p>

        <div className="d-flex justify-content-between align-items-center">
          <span className={`fw-bold ${type === "credit" ? "text-success" : "text-danger"}`}>
            {type === "credit" ? "+" : "-"} ₹{amount}
          </span>
          <Button variant="outline-danger" size="sm" onClick={deleteTransaction}>
            <i className="bi bi-trash"></i> Delete
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TransactionCard;
