class SQLInsert:
    def __init__(self, connection, cursor):
        self.connection = connection
        self.cursor = cursor

    def action(self):
        arduino_info = {"humidity": 12.4, "voltage": 172, "freshnessCategory": 1, "productType": 'orange',
                        "probeId": '5c6272eb-fbd5-44f4-b11b-c6fbb74d274d'}
        base_query = 'INSERT INTO public.arduino_info (humidity, voltage, "freshnessCategory", "productType", "probeId") VALUES {values};'.format(
            values=tuple(arduino_info.values()))
        print(base_query)
        self.cursor.execute(base_query)
        self.connection.commit()
