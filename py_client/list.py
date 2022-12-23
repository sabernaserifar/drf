import requests
import json



endpoint = 'http://localhost:8000/api/purchases/7'


data = {
    "title": "This field is done",

}

r = requests.get(endpoint)

print(r)
#print(r.text)
#dict = json.loads(r.content)
# #print(r.headers)
#print(dict['results'])
