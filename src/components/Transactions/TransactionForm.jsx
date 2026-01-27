import { useParams, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import * as transactionService from "../../services/transactionService";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ButtonGroup,
  ToggleButton,
  Stack,
} from "react-bootstrap";
import "./TransactionForm.css";

const TransactionForm = ({
  categories,
  handleAddTransaction,
  handleUpdateTransaction,
}) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/transactions";

  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    type: "Expense",
    categoryId: "",
    note: "",
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const transactionData = await transactionService.show(transactionId);

      // Prefill form data from the transaction returned by the API
      setFormData({
        amount: transactionData.amount ?? "",
        description: transactionData.description ?? "",
        // Convert ISO date to YYYY-MM-DD for <input type="date" />
        date: transactionData.date ? transactionData.date.slice(0, 10) : "",
        type: transactionData.type ?? "Expense",
        // categoryId might come populated (object) or as a string id
        categoryId:
          typeof transactionData.categoryId === "object"
            ? transactionData.categoryId._id
            : transactionData.categoryId ?? "",
        note: transactionData.note ?? "",
      });
    };

    if (transactionId) fetchTransaction();

    // Cleanup/reset (same idea as the lab)
    return () =>
      setFormData({
        amount: "",
        description: "",
        date: "",
        type: "Expense",
        categoryId: "",
        note: "",
      });
  }, [transactionId]);

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (transactionId) {
      handleUpdateTransaction(transactionId, formData);
    } else {
      handleAddTransaction(formData);
    }
  };

  const setType = (nextType) => {
    // When switching type, reset categoryId to avoid mismatched categories
    setFormData((prev) => ({ ...prev, type: nextType, categoryId: "" }));
  };

  const filteredCategories = categories.filter((c) => c.type === formData.type);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        {/*responsive rule: full on mobile, narrower on desktop */}
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm form-card">
            <Card.Body className="p-4">
              <h1 className="h3 text-center mb-4">
                {transactionId ? "Edit Transaction" : "New Transaction"}
              </h1>

              {/* Type toggle (like tabs) */}
              <Form.Group className="mb-4">
                <Form.Label className="d-block text-center">Type</Form.Label>

                <div className="d-flex justify-content-center">
                  <ButtonGroup className="type-toggle">
                    <ToggleButton
                      id="type-income"
                      type="radio"
                      name="type"
                      value="Income"
                      checked={formData.type === "Income"}
                      onChange={() => setType("Income")}
                      variant={
                        formData.type === "Income"
                          ? "success"
                          : "outline-secondary"
                      }
                    >
                      Income
                    </ToggleButton>

                    <ToggleButton
                      id="type-expense"
                      type="radio"
                      name="type"
                      value="Expense"
                      checked={formData.type === "Expense"}
                      onChange={() => setType("Expense")}
                      variant={
                        formData.type === "Expense"
                          ? "success"
                          : "outline-secondary"
                      }
                    >
                      Expense
                    </ToggleButton>
                  </ButtonGroup>
                </div>
              </Form.Group>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="amount-input">
                  <Form.Label>Amount *</Form.Label>
                  <Form.Control
                    required
                    name="amount"
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="categoryId-input">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    required
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleChange}
                  >
                    <option value="">Select a category...</option>
                    {filteredCategories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="date-input">
                  <Form.Label>Date *</Form.Label>
                  <Form.Control
                    required
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description-input">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Optional..."
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="note-input">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    name="note"
                    type="text"
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Optional..."
                  />
                </Form.Group>

                <Stack
                  direction="horizontal"
                  gap={3}
                  className="justify-content-center"
                >
                  <Button type="submit" className="btn-moneymentor px-5">
                    Save
                  </Button>

                  <Button
                    type="button"
                    variant="outline-secondary"
                    className="btn-moneymentor-secondary px-5"
                    onClick={() => navigate(from)}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionForm;
