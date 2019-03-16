class SQLSelect:
    def __init__(self, connection, cursor):
        self.cursor = cursor
        self.connection = connection

    def action(self):
        self.cursor.execute('SELECT * from arduino_info ORDER BY inputDate DESC LIMIT 5;')

        rows = self.cursor.fetchall()
        self.connection.close()
        print(rows)

