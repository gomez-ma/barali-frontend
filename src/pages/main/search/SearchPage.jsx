// import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import SearchBox from '../../../components/search/SearchBox';

const SearchPage = () => {
  const [searchParams] = useSearchParams();

  const destination = searchParams.get('destination') || '';
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';
  const guests = searchParams.get('guests') || 1;

  return (
    <Container className='my-4'>
      <SearchBox />
      <p>
        {`ค้นหาที่พักใน ${destination} ระหว่างวันที่ ${checkIn} ถึง ${checkOut} สำหรับ ${guests} คน`}
      </p>
    </Container>
  )
}
export default SearchPage