import json
import os
from flask_cors import CORS

import psycopg2
from flask import Flask

app = Flask(__name__)
CORS(app)

PASSWORD = os.environ.get('DB_PASSWORD')
USER = os.environ.get('DB_USER')
DB_NAME = os.environ.get('DB_NAME')
HOST = os.environ.get('HOST')

def _get_connection():
    try:
        connect_str = "dbname={} user={} host={} password={}".format(DB_NAME, USER, HOST, PASSWORD)
        conn = psycopg2.connect(connect_str)
        cursor = conn.cursor()
        return cursor, conn
    except Exception as e:
        print(e)


def _execute_query():
    cursor, conn = _get_connection()
    cursor.execute('SELECT humidity, voltage, decay_day from arduino_info ORDER BY inputDate DESC LIMIT 5;')
    rows = {"data" : cursor.fetchall()}
    return json.dumps(rows)


@app.route('/data', methods=['GET'])
def get_post():
    data = _execute_query()
    return data


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
