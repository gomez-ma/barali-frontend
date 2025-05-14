import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputGroup, FormControl, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import dayjs from 'dayjs';
import "dayjs/locale/th";
import th from 'date-fns/locale/th';
import { registerLocale } from 'react-datepicker';
registerLocale('th', th);

const SearchBox = ({
  initialCheckInDate = null,
  initialCheckOutDate = null,
  initialDestination = "",
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(initialDestination);
  const [checkInDate, setCheckInDate] = useState(initialCheckInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOutDate);
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => { }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/search-results");
    setLoading(false);
  }

  const datepickerCustomInput = ({ value, onClick, placeholder, disabled }) => (
    <InputGroup className="custom-datepicker">
      <InputGroup.Text className="bg-white border-end-0">
        <i className="bi bi-calendar text-primary"></i>
      </InputGroup.Text>
      <FormControl
        placeholder={placeholder}
        value={value}
        onClick={onClick}
        readOnly
        disabled={disabled}
        className="py-3 fs-6 border-start-0 shadow-sm"
      />
    </InputGroup>
  );

  return (
    <div className="search-container bg-white p-4 rounded-4 shadow-lg mb-4 mt-4">
      <Form onSubmit={handleSearch}>
        <Row className="align-items-end g-3">
          <Col xs={12} md={6} lg={4}>
            <Form.Group className="position-relative">
              <Form.Label className="mb-2 fw-semibold text-secondary d-flex align-items-center gap-2">
                จุดหมายปลายทาง
              </Form.Label>
              <InputGroup className="search-input-group">
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="ใส่จุดหมายปลายทาง หรือชื่อที่พัก"
                  aria-label="Search"
                  value={""}
                  onChange={""}
                  onClick={""}
                  className="py-3 fs-6 border-start-0"
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={3}>
            <Form.Group>
              <Form.Label className="mb-2 fw-semibold text-secondary d-flex align-items-center gap-2">
                เช็คอิน
              </Form.Label>
              <DatePicker
                selected={""}
                value={""}
                onChange={""}
                selectsStart
                startDate={""}
                endDate={""}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="เลือกวันที่"
                locale="th"
                customInput={datepickerCustomInput({ placeholder: "เลือกวันที่" })}
                popperContainer={({ children }) => (
                  <div style={{ zIndex: 2000, position: "relative" }}>{children}</div>
                )}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={6} md={3} lg={3}>
            <Form.Group>
              <Form.Label className="mb-2 fw-semibold text-secondary d-flex align-items-center gap-2">
                เช็คเอาท์
              </Form.Label>
              <DatePicker
                selected={""}
                value={""}
                onChange={""}
                selectsEnd
                startDate={""}
                endDate={""}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="เลือกวันที่"
                locale="th"
                disabled={""}
                customInput={datepickerCustomInput({ placeholder: "เลือกวันที่" })}
                popperContainer={({ children }) => (
                  <div style={{ zIndex: 2000, position: "relative" }}>{children}</div>
                )}
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={2}>
            <Form.Group>
              <Form.Label className="mb-2 fw-semibold text-secondary d-flex align-items-center gap-2">
                ผู้เข้าพัก
              </Form.Label>
              <InputGroup>
                <InputGroup.Text className="bg-white border-end-0">
                  <i className="bi bi-person text-muted"></i>
                </InputGroup.Text>
                <Form.Select className="py-3 fs-6 border-start-0">
                  <option>1 ผู้ใหญ่</option>
                  <option>2 ผู้ใหญ่</option>
                  <option>3 ผู้ใหญ่</option>
                  <option>4 ผู้ใหญ่</option>
                </Form.Select>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={2} className="d-flex align-items-end">
            <Button
              type="submit"
              variant="primary"
              className="search-btn w-100 d-flex align-items-center justify-content-center gap-2 py-3 fs-6 rounded-3 fw-bold"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                <i className="bi bi-search"></i>
              )}
              <span>ค้นหา</span>
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SearchBox;