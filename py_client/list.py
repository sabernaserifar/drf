import requests
import json



endpoint = 'http://127.0.0.1:8000/api/purchases/'


data = {
    "title": "This field is done",

}

r = requests.get(endpoint, json=data)

print(r.headers)
print(r.text)
#dict = json.loads(r.content)
# #print(r.headers)
#print(dict['results'])
