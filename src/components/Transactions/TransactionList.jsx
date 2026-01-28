import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { generateMonthOptions } from "../../utils/dateUtils";

import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";

import "./TransactionList.css";

const TransactionList = ({ transactions, categories }) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const location = useLocation();
  const from = location.pathname + location.search;

  // console.log(
  //   "date sample:",
  //   transactions[0]?.date,
  //   typeof transactions[0]?.date
  // );

  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(selectedMonth)
  );

  const categoryNameById = (categoryId) => {
    if (categoryId && typeof categoryId === "object") return categoryId.name;
    const found = categories.find((c) => c._id === categoryId);
    return found ? found.name : "Uncategorized";
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center my-4">
        <Col xs="auto">
          <h1 className="mb-0">Transactions</h1>
        </Col>
      </Row>

      {/* Button */}
      <Row className="justify-content-center my-4">
        <Col xs="auto">
          <Button
            as={Link}
            to="/transactions/new"
            state={{ from }}
            className="btn-moneymentor"
            type="button"
          >
            + Add Transaction
          </Button>
        </Col>
      </Row>

      <Row className="justify-content-center mb-3">
        <Col xs={12} md={6} lg={4}>
          <Form.Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {generateMonthOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {!filteredTransactions.length ? (
        <p className="text-muted">No transactions for this month.</p>
      ) : (
        <Row className="g-3">
          {filteredTransactions.map((t) => {
            const amountClass =
              t.type === "Income" ? "text-success" : "text-danger";

            return (
              <Col key={t._id} xs={12}>
                <Link to={`/transactions/${t._id}`} state={{ from }}>
                  <Card className="shadow-sm tx-card">
                    <Card.Body>
                      <div className="d-flex align-items-center">
                        <div className="tx-date me-3 text-muted small">
                          {new Date(t.date).toLocaleDateString()}
                        </div>

                        <div className="flex-grow-1">
                          <div className="fw-semibold">
                            {categoryNameById(t.categoryId)}
                          </div>
                          <div className="text-muted small">
                            {t.description || "No description"}
                          </div>
                        </div>

                        <div
                          className={`tx-amount ms-3 text-end fw-semibold ${amountClass}`}
                        >
                          {t.type === "Income" && "+"  }$ 
                          {Number(t.amount).toFixed(2)}
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            );
          })}
        </Row>
      )}
      <Row className="justify-content-center mt-4">
        <Col xs="auto">
          <Button as={Link} to="/" type="button" className="btn-moneymentor">
            Return to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionList;
