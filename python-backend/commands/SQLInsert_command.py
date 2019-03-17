class SQLInsert:
    def __init__(self, connection, cursor, data: dict):
        self.connection = connection
        self.cursor = cursor
        self.data = data

    def action(self):
        data_tuple = (self.data['H'], self.data['V'], self.data['P'], '5c6272eb-fbd5-44f4-b11b-c6fbb74d274d', self.data['D'])
        base_query = """INSERT INTO public.arduino_info (humidity, voltage, product_type, probe_id, decay_day) VALUES (%s, %s, %s, %s, %s);"""
        print(base_query)
        self.cursor.execute(base_query, data_tuple)
        self.connection.commit()
