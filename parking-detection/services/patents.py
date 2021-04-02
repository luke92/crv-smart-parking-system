from .apiRoutes import PATENTS
from .api import get
import json
from patent_configuration.Patent import Patent
from helpers.JsonManager import writeToJSONFile,readJSONFile

folder_patent = './camera_data'
file_patent = 'patentes'

def getPatents(token,session):
    response = []
    try:
        response = get(PATENTS,token,session)
        response = json.loads(response.content)
        writeToJSONFile(folder_patent, file_patent, response)
    except Exception as e:
        print(e)
        response = readJSONFile(folder_patent, file_patent)
    patents = []
    for patent in response:
        patent_new = Patent(patent['id'],patent['tipo'],patent['descripcion'],patent['nomenclatura'])
        patents.append(patent_new)
    return patents
