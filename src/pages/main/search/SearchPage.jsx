import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Accordion, Badge } from 'react-bootstrap';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import formatPrice from '../../../utils/formatPrice';
import SearchBox from '../../../components/search/SearchBox';
import AccommodationService from '../../../services/api/accommodation/accommodation.service';
import TypeService from '../../../services/api/accommodation/type.service';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import FormatToBE from '../../../utils/FormatToBE';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalResults, setOriginalResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [availabilityData, setAvailabilityData] = useState({});
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    breakfast: false,
    freeCancel: false,
    highRating: false,
    selectedTypes: [],
  });
  const [expandedOffer, setExpandedOffer] = useState({});

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || 1;

  const checkInDate = checkIn ? dayjs(checkIn).toDate() : null;
  const checkOutDate = checkOut ? dayjs(checkOut).toDate() : null;

  // Group accommodations by type
  const groupByType = (accommodations) => {
    return accommodations.reduce((groups, acc) => {
      const typeName = acc.type?.name || 'Other';
      if (!groups[typeName]) {
        groups[typeName] = [];
      }
      groups[typeName].push(acc);
      return groups;
    }, {});
  };

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await TypeService.getAll();
        if (response?.data) {
          setTypes(response.data);
        }
      } catch (error) {
        console.error('Error fetching accommodation types:', error);
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    document.title = `Barali Beach Resort`;
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = destination
          ? await AccommodationService.getSearch(destination, checkIn, checkOut, guests)
          : await AccommodationService.getAll();
        const results = res?.data || [];
        setOriginalResults(results);
        setFilteredResults(results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchParams, destination, checkIn, checkOut, guests]);

  useEffect(() => {
    if (checkInDate && checkOutDate) {
      fetchAvailability(checkInDate, checkOutDate);
    }
  }, [checkInDate, checkOutDate]);

  useEffect(() => {
    const applyAllFilters = () => {
      const {
        priceRange,
        breakfast,
        freeCancel,
        highRating,
        selectedTypes,
      } = filters;

      const filtered = originalResults.filter(acc => {
        const price = acc.price_per_night || 0;
        const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
        const matchBreakfast = !breakfast || acc.breakfastIncluded;
        const matchFreeCancel = !freeCancel || acc.freeCancellation;
        const matchHighRating = !highRating || (acc.rating && acc.rating >= 8);
        const matchType = selectedTypes.length === 0 ||
          selectedTypes.includes(acc.type?.name);
        return inPriceRange && matchBreakfast && matchFreeCancel && matchHighRating && matchType;
      });

      setFilteredResults(filtered);
    };

    applyAllFilters();
  }, [filters, originalResults]);

  const fetchAvailability = async (checkInDate, checkOutDate) => {
    try {
      const res = await AccommodationService.getAvailability(
        dayjs(checkInDate).format('YYYY-MM-DD'),
        dayjs(checkOutDate).format('YYYY-MM-DD')
      );
      const availabilityItems = Array.isArray(res.data)
        ? res.data
        : res.data?.data || [];
      const map = {};
      availabilityItems.forEach(item => {
        map[item.accommodationId] = item.availableRooms;
      });
      setAvailabilityData(map);
    } catch (err) {
      console.error('Error fetching availability:', err);
    }
  };

  const resetFilters = () => {
    setFilters({
      priceRange: [0, 10000],
      breakfast: false,
      freeCancel: false,
      highRating: false,
      selectedTypes: [],
    });
    setFilteredResults(originalResults);
  };

  const handleTypeChange = (typeName) => {
    const newSelectedTypes = filters.selectedTypes.includes(typeName)
      ? filters.selectedTypes.filter(t => t !== typeName)
      : [...filters.selectedTypes, typeName];

    setFilters(prev => ({
      ...prev,
      selectedTypes: newSelectedTypes
    }));
  };

  const matchesSearchTerm = (acc) => {
    if (!destination) return true;
    const term = destination.toLowerCase();
    return (
      acc.name?.toLowerCase().includes(term) ||
      acc.city?.toLowerCase().includes(term) ||
      acc.province?.toLowerCase().includes(term) ||
      acc.type?.name?.toLowerCase().includes(term)
    );
  };

  const visibleResults = filteredResults.filter(matchesSearchTerm);
  const groupedVisibleResults = groupByType(visibleResults);

  // Render benefits with expand/collapse
  const renderBenefits = (benefits, accId, offerIdx) => {
    if (!benefits) return null;
    const key = `${accId}-${offerIdx}`;
    const showAll = expandedOffer[key];
    const shown = showAll ? benefits : benefits.slice(0, 2);
    return (
      <>
        {shown.map((b, i) => (
          <span key={i} className="me-3" style={{ color: b.highlight ? '#388e3c' : '#333', fontWeight: b.highlight ? 600 : 400 }}>
            {b.icon} {b.text}
          </span>
        ))}
        {benefits.length > 2 && (
          <span
            className="text-primary"
            style={{ cursor: 'pointer', fontSize: '0.95em' }}
            onClick={() => setExpandedOffer(prev => ({ ...prev, [key]: !showAll }))}
          >
            {showAll ? '▲ ซ่อนรายละเอียด' : `+${benefits.length - 2} รายละเอียดเพิ่มเติม ▼`}
          </span>
        )}
      </>
    );
  };

  return (
    <Container className='my-4'>
      <SearchBox resetFilter={resetFilters} />
      <Row className='mt-4'>
        <Col lg={3} className='mb-4'>
          <Card className='p-3 shadow-sm border-0' style={{ background: '#f9fafb' }}>
            <h5 className='fw-bold mb-3'>ตัวกรอง</h5>
            <Form.Group className="mb-4">
              <Form.Label>
                ช่วงราคา: <span className="fw-bold text-success">{filters.priceRange[0]}</span> - <span className="fw-bold text-success">{formatPrice(filters.priceRange[1])}</span>
              </Form.Label>
              <Slider
                range
                min={0}
                max={10000}
                step={100}
                value={filters.priceRange}
                onChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
              />
            </Form.Group>
            {types.length > 0 && (
              <Form.Group className="mb-4">
                <Form.Label>ประเภทที่พัก</Form.Label>
                {types.map((type) => (
                  <Form.Check
                    key={`type-${type.name}`}
                    id={`type-${type.name}`}
                    type="checkbox"
                    label={type.name}
                    checked={filters.selectedTypes.includes(type.name)}
                    onChange={() => handleTypeChange(type.name)}
                  />
                ))}
              </Form.Group>
            )}
            <Form.Group className="mb-4">
              <Form.Label>สิ่งอำนวยความสะดวก</Form.Label>
              <Form.Check
                id="breakfast"
                type="checkbox"
                label="รวมอาหารเช้า"
                checked={filters.breakfast}
                onChange={(e) => setFilters(prev => ({ ...prev, breakfast: e.target.checked }))}
              />
              <Form.Check
                id="freeCancel"
                type="checkbox"
                label="ยกเลิกฟรี"
                checked={filters.freeCancel}
                onChange={(e) => setFilters(prev => ({ ...prev, freeCancel: e.target.checked }))}
              />
              <Form.Check
                id="highRating"
                type="checkbox"
                label="คะแนนสูง (8+)"
                checked={filters.highRating}
                onChange={(e) => setFilters(prev => ({ ...prev, highRating: e.target.checked }))}
              />
            </Form.Group>
            <Button variant="outline-secondary" className="w-100" onClick={resetFilters}>
              รีเซ็ตตัวกรอง
            </Button>
          </Card>
        </Col>
        <Col lg={9}>
          <Card className='p-3 shadow-sm border-0' style={{ background: '#fff' }}>
            <h5 className='fw-bold mb-3'>ผลการค้นหาใน {destination ? `"${destination}"` : 'ทุกจุดหมายปลายทาง'}</h5>
            <div className="mb-2" style={{ color: '#888', fontSize: '1em' }}>
              <span className="me-3">ปลายทาง: <b>{destination || 'ไม่ระบุ'}</b></span>
              <span className="me-3">เช็คอิน: <b>{FormatToBE(checkIn) || 'ไม่ระบุ'}</b></span>
              <span className="me-3">เช็คเอาท์: <b>{FormatToBE(checkOut) || 'ไม่ระบุ'}</b></span>
              <span>จำนวนผู้เข้าพัก: <b>{guests}</b></span>
            </div>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-success" role="status" />
                <div className="mt-2">กำลังโหลดข้อมูล...</div>
              </div>
            ) : Object.keys(groupedVisibleResults).length > 0 ? (
              <>
                <div className="mb-3 text-end text-secondary">พบ {visibleResults.length} รายการ</div>
                <Accordion defaultActiveKey={Object.keys(groupedVisibleResults)} alwaysOpen>
                  {Object.entries(groupedVisibleResults).map(([typeName, accommodations]) => (
                    <Accordion.Item key={typeName} eventKey={typeName}>
                      <Accordion.Header>
                        <h5 className="mb-0">{typeName}</h5>
                      </Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          {accommodations.map((acc) => (
                            <Col key={acc.id} xs={12} className="mb-4">
                              <Card className="shadow-sm border-0" style={{ borderRadius: 12, background: '#f8fafd' }}>
                                <Row className="g-0">
                                  <Col md={5} className="d-flex flex-column align-items-center justify-content-center">
                                    <div style={{ width: '100%', height: 220, overflow: 'hidden', borderRadius: '12px 0 0 12px', background: '#f4f4f4' }}>
                                      <img
                                        src={acc.images?.[0] || 'https://picsum.photos/id/57/2000/3000'}
                                        alt={acc.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                      />
                                    </div>
                                    <div className="mt-2 d-flex flex-wrap align-items-center justify-content-center" style={{ fontSize: '0.97em', color: '#666' }}>
                                      <span className="me-3"><i className="bi bi-people"></i> {acc.maxGuests || 2} คน</span>
                                      <span className="me-3"><i className="bi bi-aspect-ratio"></i> {acc.size || '47 m²'}</span>
                                      <span className="me-3"><i className="bi bi-wifi"></i></span>
                                      <span className="me-3"><i className="bi bi-cup-straw"></i></span>
                                    </div>
                                    <div>
                                      <a href={acc.detailUrl || "#"} style={{ fontSize: '0.97em', color: '#1976d2', textDecoration: 'underline' }}>room details &amp; photos</a>
                                    </div>
                                  </Col>
                                  <Col md={7}>
                                    <Card.Body>
                                      {/* <h5 className="fw-bold mb-2" style={{ color: '#222' }}>{acc.name}</h5>
                                      <div className="mb-2" style={{ color: '#888', fontSize: '1em' }}>
                                        {acc.type?.name}
                                      </div> */}
                                      {(acc.offers || [
                                        {
                                          name: 'SUMMER ESCAPE SAVE 62% (MIN 2 NIGHTS)',
                                          save: 62,
                                          price: acc.price_per_night ? Math.round(acc.price_per_night * 0.38) : 3040,
                                          oldPrice: acc.price_per_night || 8000,
                                          benefits: [
                                            { icon: <i className="bi bi-cup-straw"></i>, text: 'Breakfast', highlight: false },
                                            { icon: <i className="bi bi-wifi"></i>, text: 'Internet', highlight: false },
                                            { icon: <i className="bi bi-check2"></i>, text: 'Amendable booking', highlight: true },
                                          ],
                                          bookingCondition: '100% advanced payment is required. If cancelled within 7 days prior to check-in date, 100 percent of total amount will be charged. No show, 100 percent of total amount will be charged.',
                                          freeCancel: acc.freeCancellation,
                                        }
                                      ]).map((offer, idx) => (
                                        <Card key={idx} className="mb-3 border-0" style={{ background: '#fff', borderRadius: 10, boxShadow: '0 1px 4px #e0e0e0' }}>
                                          <Card.Body className="py-2 px-3">
                                            <div className="d-flex align-items-center mb-1">
                                              <span className="fw-bold" style={{ fontSize: '1.05em', color: '#222' }}>
                                                <i className="bi bi-dot"></i> {offer.name}
                                              </span>
                                              <span className="ms-2" style={{ color: '#e57300', fontWeight: 600 }}>
                                                Save {offer.save}%
                                              </span>
                                            </div>
                                            <div className="mb-1" style={{ fontSize: '0.98em' }}>
                                              {renderBenefits(offer.benefits, acc.id, idx)}
                                            </div>
                                            <div className="mb-1" style={{ color: '#4caf50', fontSize: '0.97em' }}>
                                              {offer.freeCancel && <span>✓ ยกเลิกฟรี </span>}
                                              {offer.benefits.some(b => b.highlight) && <span>✓ Amendable booking</span>}
                                            </div>
                                            <div className="mb-1" style={{ fontSize: '0.93em' }}>
                                              <span className="fw-bold text-decoration-underline">Booking Condition</span> <br />
                                              <span>{offer.bookingCondition}</span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-between mt-2">
                                              <div>
                                                <span className="text-muted text-decoration-line-through me-2" style={{ fontSize: '1em' }}>
                                                  {formatPrice(offer.oldPrice)}
                                                </span>
                                                <span className="fw-bold" style={{ color: '#388e3c', fontSize: '1.3em' }}>
                                                  {formatPrice(offer.price)}
                                                </span>
                                                <span className="ms-1" style={{ fontSize: '0.95em', color: '#888' }}>/ คืน</span>
                                              </div>
                                              <Button variant="success" style={{ minWidth: 100, borderRadius: 20 }}>จองเลย</Button>
                                            </div>
                                          </Card.Body>
                                        </Card>
                                      ))}
                                      {availabilityData[acc.id] !== undefined && (
                                        <div className="mt-2">
                                          <Badge bg="info" style={{ fontSize: '1em' }}>ห้องว่าง: {availabilityData[acc.id]} ห้อง</Badge>
                                        </div>
                                      )}
                                    </Card.Body>
                                  </Col>
                                </Row>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </>
            ) : (
              <div className="text-center text-muted py-5">
                <i className="bi bi-emoji-frown" style={{ fontSize: 40 }}></i>
                <div className="mt-2">ไม่พบที่พักตามเงื่อนไขที่คุณระบุ</div>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;