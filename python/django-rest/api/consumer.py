from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from rest_framework.exceptions import ValidationError

from api.serializers import InfoSerializer


class InfoConsumer(WebsocketConsumer):
    def connect(self):
        print("Connect")
        async_to_sync(self.channel_layer.group_add)("info", self.channel_name)
        self.accept()

    def disconnect(self, close_code):
        print("Disconnect")
        async_to_sync(self.channel_layer.group_discard)("info",
                                                        self.channel_name)

    def info_message(self, event):
        print("Send to websocket")
        self.send(text_data=json.dumps(event["data"]))

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        info = InfoSerializer(data=text_data_json)
        try:
            info.is_valid()
        except ValidationError:
            self.send(text_data=json.dumps({
                'status': "Incorrect message"
            }))
        else:
            info.save()
            self.send(text_data=json.dumps({
                'status': "Message received"
            }))

