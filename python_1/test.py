import sqlite3

class DonationDatabase:
    def __init__(self, db_name='donation_website.db'):
        # Initialize the connection to the database
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_table()

    def create_table(self):
        # Create the donation table if it doesn't exist
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS donation (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                quantity INTEGER NOT NULL
            )
        ''')
        self.conn.commit()

    def insert_donation(self, item_id, item_name, item_quantity):
        # Insert a donation item into the table
        self.cursor.execute('''
            INSERT INTO donation (id, name, quantity)
            VALUES (?, ?, ?)
        ''', (item_id, item_name, item_quantity))
        self.conn.commit()

    def fetch_all_donations(self):
        # Retrieve all donations from the table
        self.cursor.execute('SELECT * FROM donation')
        return self.cursor.fetchall()

    def close(self):
        # Close the connection to the database
        self.conn.close()

# Example usage:
db = DonationDatabase()

# Inserting donations
db.insert_donation(1, 'Pen', 10)
db.insert_donation(2, 'Notebook', 5)

# Fetching all donations
donations = db.fetch_all_donations()
for donation in donations:
    print(donation)

# Close the database connection when done
db.close()
