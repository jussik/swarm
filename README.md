#bot hull:
base cost
health
size (e.g. 5x5)
radius
weight limit

#component:
enabled
weight
cost
size (e.g. 2x1)

#component types (higher levels means better parameters, more weight, cost, size):
swarm communicator (distance)
factory (max hull/component level)
hover (accel, speed, turning)
treads (accel, speed, turning)
armour (durability)
shield (durability, recharge rate)
laser (damage per second)
self destruct mechanism (damage)
harvester (distance, ore per second, capacity)
ore hopper (capacity)
radar (distance)
battery (capacity)
reactor (power)
charging coil (distance, power, number of bots) -- charges other bots' batteries

#actions:
included with hull:
	detach component (drops onto ground)
	attach component (takes from ground)
movement:
target may be coordinate or 
	go to
	orbit
harvester:
	harvest
harvester/ore hopper:
	dump ore
weapon:
	attack

#functions:
get components
get component attribute
get radar contacts
get user defined targets (user clicks on location, bot, etc. to set)

#expressions: // NOTE: look into unity's and unreal's node based scripting
primitives (if/switch, filter, compare, arithmetic, log, of type)

#notes
level begins with each player being given a higher level bot containing reactor, factory, radar, swarm communicator, charging coils
level ends when only one faction has bots left
