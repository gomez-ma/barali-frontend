import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const AccommodationCard = ({ accommodation }) => {
    return (
        <div className='col-md-4 mb-4'>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={"http://localhost:5000/uploads/accommodations/" + accommodation.image_name} />
                <Card.Body>
                    <Card.Title>{accommodation.name}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default AccommodationCard;