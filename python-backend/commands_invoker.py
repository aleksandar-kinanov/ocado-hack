import os
import time

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
insert_command = SQLInsert(connection, cursor)
invoker = Invoker()


def receive_arduino_information():
    command_to_execute = ConcreteCommand(insert_command)
    invoker.store_command(command_to_execute)
    while True:
        invoker.execute_commands()
        print("Sleeping for 5....")
        time.sleep(5)


def main():
    receivers = [select_command]
    for receiver in receivers:
        concrete_command = ConcreteCommand(receiver)
        invoker.store_command(concrete_command)
        invoker.execute_commands()


if __name__ == "__main__":
    main()