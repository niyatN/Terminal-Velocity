
import json
import sys
import math
wall='wall'
blrAirportMap= [[wall,wall,wall,wall,1,wall,wall,wall,wall,wall,wall,wall,wall,2,wall,wall,wall,wall,wall,wall], # terminal entarance
        [0,0,0,0,0,wall,wall,wall,0,0,0,wall,wall,0,0,0,wall,0,0,0],
     [wall,wall,wall,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,wall,wall],
     [wall,wall,wall,'air_india',wall,wall,wall,wall,'indigo',wall,wall,wall,'singapore_airlines',wall,wall,wall,wall,'etihad',wall,wall], # airline checkin
     [0,0,0,0,0,wall,wall,wall,0,0,0,wall,0,0,0,0,wall,0,0,0],
     [wall,wall,wall,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,wall,wall],
     [wall,wall,wall,'male',wall,wall,wall,wall,'female',wall,wall,wall,wall,wall,wall,wall,wall,wall,wall,wall],  # security check in
     [wall,wall,0,0,0,wall,wall,wall,0,0,0,wall,wall,0,0,0,wall,wall,wall,wall],
     [wall,wall,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,wall,wall],
     [wall,wall,1,wall,wall,2,wall,wall,3,wall,wall,4,wall,wall,5,wall,6,wall,wall]]    #final gate 


airlineCheckin=3
securityCheckin=6

def main(airport,airline,gateNum):
	def minDist(src,dest):
		indexNum=0
		leastDist=math.inf
		for i in range(len(src)):
			dist=abs(src[i][0]-dest[0])+abs(src[i][1]-dest[1])
			if(dist<leastDist):
				leastDist=dist
				indexNum=i
		return src[indexNum]


	def isValid(curPos):
		if(curPos[0]>=len(airportDistMapping)):
			return False
		elif(curPos[1]>=len(airportDistMapping[1])):
			return False
		elif(mapAirport[curPos[0]][curPos[1]]==wall):
			return False
		else:
			return True


	def pathConstructor(source,destination,curPos,mapAirport,path):
		path.append(curPos)
		if(curPos==destination):
			return (path)
		else:
			if((not visited[curPos[0]+1][curPos[1]]) and (isValid([curPos[0]+1,curPos[1]]))):
				if(curPos[0]<destination[0]-1):
					return pathConstructor(source,destination,[curPos[0]+1,curPos[1]],mapAirport,path)
			if(curPos[0]+1==destination[0] and curPos[1]==destination[1]):
				return pathConstructor(source,destination,[curPos[0]+1,curPos[1]],mapAirport,path)
			if(curPos[1]>destination[1]):
				if(not visited[curPos[0]][curPos[1]-1] and (isValid([curPos[0],curPos[1]-1]))):
					return pathConstructor(source,destination,[curPos[0],curPos[1]-1],mapAirport,path)
			if(curPos[1]<destination[1]):
				if(not visited[curPos[0]][curPos[1]+1] and (isValid([curPos[0],curPos[1]+1]))):
					return pathConstructor(source,destination,[curPos[0],curPos[1]+1],mapAirport,path)
			path.pop(-1)


	def driverForPathConstructor(source,destination,mapAirport1):
		path=[]
		visited[source[0]][source[1]]=True
		path=[]
		ans=pathConstructor(source,destination,source,mapAirport1,path)
		return ans



	def getDistTime(path):
		length=len(path)
		time=0
		dist=0
		instructions=[]
		direction=''
		count=0
		for i in range(length-1):
			if(path[i][1]==path[i+1][1]):
				if(direction=='north'):
					count+=1
				else:
					instructions.append('go '+direction+' for '+str(count*50)+' metres.')
					count=1
					direction='north'
			if(path[i][0]==path[i+1][0] and path[i][1]>path[i+1][1]):
				if(direction=='east'):
					count+=1
				else:
					instructions.append('go '+direction+' for '+str(count*50)+' metres.')
					count=1
					direction='east'
			if(path[i][0]==path[i+1][0] and path[i][1]<path[i+1][1]):
				if(direction=='west'):
					count+=1
				else:
					instructions.append('go '+direction+' for '+str(count*50)+' metres.')
					count=1
					direction='west'
		time=length*1.5
		dist=50*length
		instructions.append('go '+direction+' for '+str(count*50)+' metres.')
		del(instructions[0])
		return {"time":time,"dist":dist,"instructions":instructions,"path":path}








	# print('function called')
	mapAirport=blrAirportMap #choosing the correct airport
	nrows=len(mapAirport)
	ncols=len(mapAirport[1])
	# print(nrows,ncols)

	airportDistMapping=[]
	for i in range(nrows):
		temp=[math.inf]*ncols
		airportDistMapping.append(temp)

	visited=[]
	for i in range(nrows):
		temp=[False]*ncols
		visited.append(temp)

	
	destination=blrAirportMap[airlineCheckin].index(airline)
	destination=[airlineCheckin,destination]
	sourceList=[]
	i=1
	while(i in mapAirport[0]):
		sourceList.append([0,mapAirport[0].index(i)])
		i+=1
	completePath=[]
	source=minDist(sourceList,destination)
	
	path=(driverForPathConstructor(source,destination,mapAirport))
	terminalToAirlineCheckin=getDistTime(path)
	for i in path:
		completePath.append(i)
	# print(completePath)
	
	source=destination
	destination=[securityCheckin,mapAirport[securityCheckin].index('female')]
	# print('source,destination',source,destination)

	path=(driverForPathConstructor(source,destination,mapAirport))
	airlineToSecurityCheckin=getDistTime(path)
	for i in path:
		completePath.append(i)
	# print(completePath)

	source=destination
	destination=[nrows-1,mapAirport[-1].index(gateNum)]

	# print('source,destination',source,destination)
	path=(driverForPathConstructor(source,destination,mapAirport))
	securityToBoardingGate=getDistTime(path)
	for i in path:
		completePath.append(i)
	# print(completePath)
	# terminalToAirlineCheckin=(json.dumps(terminalToAirlineCheckin))
	# airlineToSecurityCheckin=(json.dumps(airlineToSecurityCheckin))
	# securityToBoardingGate=(json.dumps(securityToBoardingGate))
	return(json.dumps({"path1":[terminalToAirlineCheckin,airlineToSecurityCheckin,securityToBoardingGate]}))


def fun():
	airport=sys.argv[1]
	airline=sys.argv[2]
	gateNum=int(sys.argv[3])
	print(main(airport,airline,gateNum))

	

fun()