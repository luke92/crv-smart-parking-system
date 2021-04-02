from .apiRoutes import CONFIG,PARKINGS
from .api import get,post,put
import json
from parking_configuration.Parking import Parking
from helpers.JsonManager import writeToJSONFile,readJSONFile
import threading
import time

folder_parkings = './camera_data'
file_parkings = 'parkings'

def postParkings(parkings,token,session):
	formattedParkings = []
	for parking in parkings:
		formattedParkings.append(
			{
				"tl_x": parking.minx,
				"tl_y": parking.miny,
				"br_x": parking.maxx,
				"br_y": parking.maxy,
				"isOccupied": parking.state,
				"patent": parking.patent,
				"cameraId": parking.cameraId
			}	
		)

	data = {
		"parkings": formattedParkings
	}

	return post(PARKINGS,data,token,session)

def get_parkings_async(parkings,token,stop_threads,session):
	try:
		threading.Thread(target=get_parkings, args=(parkings,token,stop_threads,session,)).start()
	except Exception as e: print(e)

def get_parkings(parkings,token,stop_threads,session):
	while(stop_threads == False):
		response = []
		try:		
			response = get(PARKINGS,token,session)
			response = json.loads(response.content)
			writeToJSONFile(folder_parkings, file_parkings, response)
		except Exception as e:
			print(e)
			response = readJSONFile(folder_parkings, file_parkings)
			
		for parking in response:
			parking_new = Parking(parking['id'],parking['tl_x'],parking['tl_y'],parking['br_x'],parking['br_y'],'test',parking['isOccupied'], parking['patent'],parking['cameraId'])
			parking_new.id = parking['id']
			parkings.append(parking_new)
		
		time.sleep(5.0)

def getParkings(token,session):
	response = []
	parkings = []
	try:		
		response = get(PARKINGS,token,session)
		response = json.loads(response.content)
		writeToJSONFile(folder_parkings, file_parkings, response)
	except Exception as e:
		print(e)
		response = readJSONFile(folder_parkings, file_parkings)
		
	for parking in response:
		parking_new = Parking(parking['id'],parking['tl_x'],parking['tl_y'],parking['br_x'],parking['br_y'],'test',parking['isOccupied'], parking['patent'],parking['cameraId'])
		parking_new.id = parking['id']
		parkings.append(parking_new)
	return parkings

def put_parkings_async(parkings,token):
    try:
        threading.Thread(target=putParkings, args=(parkings,token,)).start()
    except Exception as e: print(e)


def putParkings(parkings,token,session):
	formattedParkings = []
	for parking in parkings:
		new_park = {
				"id": parking.id,
				"tl_x": parking.minx,
				"tl_y": parking.miny,
				"br_x": parking.maxx,
				"br_y": parking.maxy,
				"isOccupied": parking.state,
				"patent": parking.patent,
				"cameraId": parking.cameraId
			}
			
		formattedParkings.append(new_park)

	data = {
		"parkings": formattedParkings
	}

	return put(PARKINGS,data,token,session)