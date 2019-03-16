import os

import psycopg2
from flask import Flask

app = Flask(__name__)

PASSWORD = os.environ.get('DB_PASSWORD')
USER = os.environ.get('DB_USER')
DB_NAME = os.environ.get('DB_NAME')
HOST = os.environ.get('HOST')

try:
    conn_data = [DB_NAME, USER, HOST, PASSWORD]
    connect_str = "dbname={} user={} host={} password={}".format(*conn_data)
    conn = psycopg2.connect(connect_str)
    cursor = conn.cursor()
except Exception as e:
    print(e)


def _execute_query():
    cursor.execute('SELECT * from arduino_info ORDER BY inputDate DESC LIMIT 5;')
    rows = cursor.fetchall()
    return rows


@app.route('/data', methods=['GET'])
def get_post():
    data = _execute_query()
    return 'Request data is : {}'.format(data)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
