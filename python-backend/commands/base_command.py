import abc


class Command(metaclass=abc.ABCMeta):
    def __init__(self, receiver):
        self._receiver = receiver

    @abc.abstractmethod
    def execute(self):
        pass


class ConcreteCommand(Command):
    def execute(self):
        self._receiver.action()
