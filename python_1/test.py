import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('donation_website.db')

# Create a cursor object to interact with the database
cursor = conn.cursor()

# Create a table for your items without auto-incrementing id
cursor.execute('''
    CREATE TABLE IF NOT EXISTS donation (
        id INTEGER,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        PRIMARY KEY (id)
    )
''')

# Example: Insert data (donating an item)
# Make sure to provide a unique ID for the item
cursor.execute('''
    INSERT INTO donation (id, name, quantity) VALUES (?, ?, ?)
''', (11, 'Book', 70))

# Example: Retrieve data
cursor.execute('SELECT * FROM donation')
rows = cursor.fetchall()
for row in rows:
    print(row)

# Commit your changes and close the connection
conn.commit()
conn.close()
