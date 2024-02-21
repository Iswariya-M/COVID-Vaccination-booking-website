from flask import Flask, render_template, request,jsonify,redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import or_ 
from flask_bcrypt import Bcrypt
from flask_cors import CORS 
from flask_migrate import Migrate

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(10), nullable=False, default='user')

class Hospital(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    image = db.Column(db.String(200), nullable=False)
 

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    phoneNumber = db.Column(db.String(15), nullable=False)
    dob = db.Column(db.String(10), nullable=False)
    age = db.Column(db.String(3))  # Add age to the database model
    bookingDate = db.Column(db.String(10), nullable=False)
    hospital = db.Column(db.String(50), nullable=False)



with app.app_context():
    admin_exists = User.query.filter_by(role='admin').first()
    if not admin_exists:
        hashed_admin_password = bcrypt.generate_password_hash('1010').decode('utf-8')
        admin_user = User(username='Aishwarya', email='aishurangan8@gmail.com', password=hashed_admin_password, role='admin')
        db.session.add(admin_user)
        db.session.commit()


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    
    new_user = User(username=data['username'], email=data['email'], password=hashed_password, role=data['role'])
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Register success'})
    except:
        return jsonify({'message': 'User already exists'})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter(or_(User.username == data['username'], User.email == data['username'])).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'message': 'Login success', 'role': user.role})
    else:
        return jsonify({'message': 'Login failed'})
        


@app.route('/api/hospitals', methods=['GET', 'POST'])
def handle_hospitals():
    if request.method == 'GET':
        hospitals = Hospital.query.all()
        hospitals_list = [{'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'image': hospital.image} for hospital in hospitals]
        return jsonify(hospitals_list)

    elif request.method == 'POST':
        data = request.json
        new_hospital = Hospital(name=data['name'], address=data['address'], image=data['image'])
        db.session.add(new_hospital)
        db.session.commit()
        return jsonify({'message': 'Hospital added successfully!'})



@app.route('/add-hospital', methods=['POST'])
def add_hospital():
    data = request.get_json()

    new_hospital = Hospital(name=data['name'], address=data['address'], image=data['image'])
    db.session.add(new_hospital)
    db.session.commit()

    return jsonify({'message': 'Hospital added successfully'})

@app.route('/api/hospitals/<int:hospital_id>', methods=['DELETE'])
def delete_hospital(hospital_id):
    hospital = Hospital.query.get_or_404(hospital_id)
    db.session.delete(hospital)
    db.session.commit()

    return jsonify({'message': 'Hospital deleted successfully'})


@app.route('/api/hospitals/search', methods=['GET'])
def search_hospitals():
    query = request.args.get('query', '').lower()
    results = Hospital.query.filter(Hospital.name.ilike(f"%{query}%") | Hospital.address.ilike(f"%{query}%")).all()
    hospitals_list = [{'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'image': hospital.image} for hospital in results]
    return jsonify(hospitals_list)


@app.route('/api/hospitals/book', methods=['GET'])
def get_hospitals_for_book():
    hospitals = Hospital.query.all()
    hospitals_list = [{'id': hospital.id, 'name': hospital.name, 'address': hospital.address, 'image': hospital.image} for hospital in hospitals]
    return jsonify(hospitals_list)


@app.route('/api/bookings', methods=['POST'])
def create_booking():
    data = request.json

   
    date_bookings = Booking.query.filter_by(bookingDate=data['bookingDate'], hospital=data['hospital']).all()
    if len(date_bookings) >= 10:
        return jsonify({'error': 'Hospital fully booked for the selected date'}), 400

    new_booking = Booking(
        name=data['name'],
        phoneNumber=data['phoneNumber'],
        dob=data['dob'],
        age=data['age'],  
        bookingDate=data['bookingDate'],
        hospital=data['hospital']
    )

    db.session.add(new_booking)
    db.session.commit()

    return jsonify({'message': 'Booking successful'}), 201




if __name__ == '__main__':
    app.run(debug=True, port=5000)
