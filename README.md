##things

###hull type
* base cost
* initial health
* weight limit
* bot radius (for drawing and collider radius)
* component grid size (e.g. 5x5)

###hull
* health
* list of components
* grid of attached components
* bot radius

###bot type
* hull type
* list of components
* grid of attached components
* list of custom scripts

###bot (created from bot type)
* hull
* contacts (by default only touching contacts, can be improved using radar or swarm comms)

###component type
* weight
* cost
* size (e.g. 2x1)
* parameters (see component types for examples)

###component types (higher levels means better parameters, more weight, cost, size)
* swarm comms (range) -- joins swarm if within distance, allows communication and sharing of contacts
* factory (max hull/component level) -- create bots
* hover (accel, speed, turning)
* treads (accel, speed, turning)
* armour (durability) -- prevents hull damage, does not recharge
* shield (durability, recharge rate) -- prevents hull damage, recharges using power
* laser (range, damage per second, power drain)
* self destruct mechanism (range, damage)
* harvester (range, ore per second, capacity)
* ore hopper (capacity)
* radar (range) -- increases contacts
* battery (capacity)
* reactor (power)
* charging coil (range, power, number of bots) -- charges other bots' batteries
* repair arm (range, durability per second, number of bots) -- repairs own and other bots' armour
* remote hacking (range, max level, number of bots) -- allows reading (potentially writing) of bots' components and scripts

###component instance (entity, as it needs to be able to be dropped on the ground)
* is enabled
* is attached
* parent (bot)

###contact (each entity a bot knows about)
* entity
* contact type (flags: physical=1, radar=2, swarm=4)

##scripting

###actions
* included with hull:
  * detach component (detaches from grid, but does not remove weight)
  * attach component (must be in storage)
  * drop component
  * take component
* movement (target may be coordinate or contact):
  * go to target
  * orbit around target
* harvester:
  * harvest (target is physical contact of type harvestable, e.g. ore)
* harvester/ore hopper:
  * dump ore (target is ground or physical contact)
* weapon (target may be coordinate or contact):
  * attack target

###functions
* get user defined targets (user clicks on location, bot, etc. to set)

###expressions
**NOTE: look into unity's and unreal's node based scripting**
* if/switch,
* filter
* compare
* arithmetic
* log
* of type

###utilities
* timer

##notes

###example bot types
* base
  * reactor
  * factory
  * radar
  * swarm communicator
  * charging coils
* harvester
  * movement
  * havester
  * hopper
  * reactor or battery
  * radar or swarm comms
  * armour or shields (optional)
* soldier
  * movement
  * weapon
  * armour or shields
  * reactor or battery
  * radar or swarm comms
* support (keeps behind soldier bots that may lack reactor and have weak radar or swarm comms)
  * movement
  * reactor
  * radar and swarm comms
  * charging coils
  * repair arms
* mobile cloner (works by interfacing with bots and creating duplicates)
  * movement
  * reactor
  * factory
