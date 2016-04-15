## Things

### Component classes
* IContactable: Anything in the game world a bot can know about
  * Bot: A single robotic unit
  * IAttachable: Things you can attach to a bot to make it do stuff (see Attachable types)
  * Resource: Collect this stuff to make more bots
* Script: An executable script which allows the Bot to do things with its Attachments and Contacts

### Non-component classes
* Contact: An IContactable reference and details about how it was detected (touch, radar, swarm, etc.)

### Bot
* level
* health
* weight limit
* base cost
* list of attachables
* grid of attached attachables
* bot radius
* contacts (e.g. bots or resources, by default only touching contacts, can be improved using radar or swarm comms)
* scripts

### Attachable
* level
* weight
* cost
* size in grid (e.g. 2x1)
* parameters (see attachable types for examples)
* is enabled
* parent (Bot)
* grid slot (if attached to grid)

### Resource
* value

### Contact
* entity
* contact type (flags: physical=1, radar=2, swarm=4)

## Scripting

### Actions
* included with hull:
  * detach attachable (detaches from grid, but does not remove weight)
  * attach attachable (must be in storage)
  * drop attachable
  * take attachable
* movement (target may be coordinate or contact):
  * go to target
  * orbit around target
* harvester:
  * harvest (target is physical contact of type harvestable, e.g. ore)
* harvester/ore hopper:
  * dump ore (target is ground or physical contact)
* weapon (target may be coordinate or contact):
  * attack target

### Functions
* get user defined targets (user clicks on location, bot, etc. to set)

### Expressions
**NOTE: look into unreal's node based scripting**

* if/switch,
* filter
* compare
* arithmetic
* log
* of type

### Utilities
* timer

## Notes

### Attachable types
* Swarm comms (range) -- joins swarm if within distance, allows communication and sharing of contacts
* Factory (max hull/attachable level) -- create bots
* Hover (accel, speed, turning)
* Treads (accel, speed, turning)
* Armour (durability) -- prevents hull damage, does not recharge
* Shield (durability, recharge rate) -- prevents hull damage, recharges using power
* Laser (range, damage per second, power drain)
* Self destruct mechanism (range, damage)
* Harvester (range, ore per second, capacity)
* Ore hopper (capacity)
* Radar (range) -- increases contacts
* Battery (capacity)
* Reactor (power)
* Charging coil (range, power, number of bots) -- charges other bots' batteries
* Repair arm (range, durability per second, number of bots) -- repairs own and other bots' armour
* Remote hacking (range, max level, number of bots) -- allows reading (potentially writing) of bots' attachables and scripts

### Example Bot types
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

## Script brainstorming

### Harvester script:

**Events (Triggers:out)**

* OnBegin
* Radar.OnNewContact(Type) -> Contact
* Harvester.OnHarvestingFinished
* Harvester.OnUnloadFinished

**Values (Triggers:none)**

* Harvester.IsFull -> Value

**Functions (Triggers:in+out)**

* Radar.GetNearestContact(Type) -> Contact [Success,Fail]
* If(Condition) [Then,Else]

**Actions (Triggers:in)**

* Mover.Move(Target)
* Transition(State)

**States:**

Idle:

1. Radar.OnNewContact(Resource):2
2. Transition(harvest)
3. Radar.OnNewContact(Factory):4
4. Transition(unload)

Harvest:

1. OnBegin:4
2. Harvester.OnHarvestingFinished:4
3. Harvester.IsFull
4. If(3.Value) Then:8, Else:5
5. GetNearestContact(Resource) Success:6, Fail:7
6. Move(5.Contact)
7. Transition(idle)
8. Transition(unload)

Unload:

1. OnBegin:2
2. GetNearestContact(Factory) Success:3, Fail:4
3. Mover.Move(2.Contact)
4. Transition(idle)
5. Harvester.OnUnloadFinished:6
6. Transition(harvest)