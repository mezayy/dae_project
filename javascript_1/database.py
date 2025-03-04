import sqlite3

# Connect to the SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('donations.db')
cursor = conn.cursor()

# Create a table to store donation information
cursor.execute('''
    CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount REAL NOT NULL,
        payment_method TEXT NOT NULL
    )
''')

conn.commit()
conn.close()
