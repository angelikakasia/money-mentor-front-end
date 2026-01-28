import { useParams, Link, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import * as transactionService from "../../services/transactionService";
import "./TransactionDetails.css";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Stack,
  Modal,
} from "react-bootstrap";

const TransactionDetails = ({ categories, handleDeleteTransaction }) => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState(null);
  //to handle button delete
  const [showDelete, setShowDelete] = useState(false);

  const location = useLocation();
  const from = location.state?.from || "/transactions";

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId);
      setTransaction(transactionData);
    };

    fetchTransaction();
  }, [transactionId]);

  //to manage Delete Button state
  const openDelete = () => setShowDelete(true);
  const closeDelete = () => setShowDelete(false);

  const confirmDelete = () => {
    handleDeleteTransaction(transactionId);
    closeDelete();
  };

  const categoryNameById = (categoryId) => {
    // If categoryId is populated (object):
    if (categoryId && typeof categoryId === "object") return categoryId.name;

    // If categoryId is a string id:
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  if (!transaction) {
    return (
      <Container className="py-4">
        <p className="text-muted">Loading...</p>
      </Container>
    );
  }

  const isIncome = transaction.type === "Income";
  const amountClass = isIncome ? "text-success" : "text-danger";

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h1 className="h3 text-center mb-4">Transaction Details</h1>

              <div className="text-center mb-4">
                <div className="text-muted">{transaction.type}</div>
                <div className={`h4 mb-0 fw-semibold ${amountClass}`}>
                  {isIncome ? "+" : "-"}${Number(transaction.amount).toFixed(2)}
                </div>
              </div>

              <div className="mb-2">
                <span className="fw-semibold">Category:</span>{" "}
                {categoryNameById(transaction.categoryId)}
              </div>

              <div className="mb-2">
                <span className="fw-semibold">Date:</span>{" "}
                {new Date(transaction.date).toLocaleDateString()}
              </div>

              <div className="mb-2">
                <span className="fw-semibold">Description:</span>{" "}
                {transaction.description || "No description"}
              </div>

              <div className="mb-4">
                <span className="fw-semibold">Note:</span>{" "}
                {transaction.note || "No note"}
              </div>

              <Stack
                direction="horizontal"
                gap={2}
                className="justify-content-center"
              >
                <Button
                  as={Link}
                  to={`/transactions/${transactionId}/edit`}
                  state={{ from: location.pathname + location.search }}
                  className="btn-moneymentor"
                  type="button"
                >
                  Edit
                </Button>

                <Button type="button" variant="danger" onClick={openDelete}>
                  Delete
                </Button>

                <Button
                  type="button"
                  className="btn-moneymentor-back"
                  onClick={() => navigate(from)}
                >
                  Back
                </Button>
              </Stack>
            </Card.Body>
          </Card>
          <Modal show={showDelete} onHide={closeDelete} centered>
            <Modal.Header closeButton>
              <Modal.Title>Delete transaction?</Modal.Title>
            </Modal.Header>

            <Modal.Body>This action can't be undone.</Modal.Body>

            <Modal.Footer>
              <Button
                variant="outline-secondary"
                type="button"
                onClick={closeDelete}
              >
                Cancel
              </Button>
              <Button variant="danger" type="button" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionDetails;
