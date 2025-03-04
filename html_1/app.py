from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)  # Allow frontend requests

# Initialize the database
def init_db():
    conn = sqlite3.connect('donations.db')
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS donations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            payment_method TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

# Route to handle donations
@app.route('/donate', methods=['POST'])
def donate():
    data = request.json
    name = data.get('name')
    amount = data.get('amount')
    payment_method = data.get('payment_method')

    conn = sqlite3.connect('donations.db')
    c = conn.cursor()
    c.execute('INSERT INTO donations (name, amount, payment_method) VALUES (?, ?, ?, ?)',
              (name, amount, payment_method))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Donation received successfully!'})

# Route to get all donations
@app.route('/donations', methods=['GET'])
def get_donations():
    conn = sqlite3.connect('donations.db')
    c = conn.cursor()
    c.execute('SELECT * FROM donations')
    donations = [{'id': row[0], 'name': row[1], 'amount': row[2], 'payment_method': row[3]}
                 for row in c.fetchall()]
    conn.close()

    return jsonify(donations)

if __name__ == '__main__':
    app.run(debug=True)
