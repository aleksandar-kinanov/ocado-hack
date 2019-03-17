import json
import os

import serial

from commands.SQLConnection import SQLConnection
from commands.SQLInsert_command import SQLInsert
from commands.SQLSelect_command import SQLSelect
from commands.base_command import ConcreteCommand
from commands.invoker import Invoker


PASSWORD = os.environ.get('DB_PASSWORD')
USER = os.environ.get('DB_USER')
DB_NAME = os.environ.get('DB_NAME')
HOST = os.environ.get('HOST') # 172.26.17.163

connection = SQLConnection(HOST, DB_NAME, USER, PASSWORD)
cursor = connection.get_cursor()

select_command = SQLSelect(connection, cursor)
invoker = Invoker()


def receive_arduino_information():
    ser = serial.Serial(port='/dev/ttyUSB0', baudrate=9600)

    print("connected to: " + ser.portstr)
    while True:
        line = ser.readline()
        data = json.loads(line.decode('utf-8'))
        insert_command = SQLInsert(connection, cursor, data)
        command_to_execute = ConcreteCommand(insert_command)
        invoker.store_command(command_to_execute)
        invoker.execute_commands()
        invoker.flush_commands()
    ser.close()


if __name__ == "__main__":
    receive_arduino_information()
