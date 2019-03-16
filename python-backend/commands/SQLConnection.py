import psycopg2


class SQLConnection:
    def __init__(self, server, dbname, user, password):
        try:
            connect_str = "dbname={db_name} user={user} host={host} password={password}".format(db_name=dbname, user=user, host=server, password=password)
            self.conn = psycopg2.connect(connect_str)
            self.cursor = self.conn.cursor()
        except Exception as e:
            print(e)

    def get_cursor(self):
        return self.cursor

    def close(self):
        self.cursor.close()
        self.conn.close()

    def commit(self):
        self.conn.commit()
