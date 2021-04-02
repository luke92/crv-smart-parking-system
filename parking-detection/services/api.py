import requests,json
from .apiRoutes import LOGIN
from helpers.JsonManager import readJSONFile

appsettings = readJSONFile('./camera_data', 'appsettings')
url = appsettings['api_url']
loginData = {
    'username': appsettings['username'],
    'password': appsettings['password']
}

headersContentType = 'application/json'

g_session = requests.Session()

def get(resource,token,session):
	try:
		return session.get("{}{}".format(url,resource), headers={
			'Content-Type': headersContentType,
			'Authorization': 'JWT ' + token
			},verify=False
		)
	except Exception as e:
		print(e) 
		return ''
	
def post(resource,data,token,session):
	try:
		return session.post("{}{}/".format(url,resource),data=json.dumps(data), headers={
			'Content-Type': headersContentType,
			'Authorization': 'JWT ' + token
			},verify=False
		)
	except Exception as e:
		print(e) 
		return ''

def put(resource,data,token,session):
	try:
		return session.put("{}{}/".format(url,resource),data=json.dumps(data), headers={
			'Content-Type': headersContentType,
			'Authorization': 'JWT ' + token
			},verify=False
		)
	except Exception as e:
		print(e) 
		return ''

def get_token():
	try:		
		login_response = g_session.post("{}{}/".format(url,LOGIN),data=json.dumps(loginData), headers={
			'Content-Type': headersContentType
			},verify=False
		)
		content_json = login_response.json()
		token = content_json['token']
		g_session.headers.update({
			'Content-Type': headersContentType,
			'Authorization': 'JWT ' + token
			})
		return token
	except Exception as e:
		print(e)
		return ''



