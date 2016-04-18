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

A script is a number of node definitions optionally grouped by states.
Must be kept in a format that is easily representable using nodes in flow based programming.

TODO: nested states, variables

### Script language

**References**

.NET Dataflow: https://msdn.microsoft.com/en-us/library/hh228603(v=vs.110).aspx

**Notes**

Nodes can be *pure* or *non-pure*.

**Pure** nodes include external values or functions which do not affect external state or have failure states (or multiple output states in general). They do not have any triggers. e.g.

* Constants (true, 123)
* Types (Resource)
* Provider variables that cannot be altered within the scope of an event (e.g. Harvester.IsFull)

**Non-pure** nodes are those that trigger events, alter shared state, have failure states, or multiple different output states (triggers). They have at least 1 trigger. e.g.

* Events (OnBegin, Radar.OnNewContact)
* Methods with side effects (Radar.GetNearest or Mover.MoveTo)
* Flow control (If, While)
* Functions with failure states (Cast)

Each node can only have one root source for non-pure (event instigated) inputs.
i.e. Each port must either be pure or derivable from the same event as the others.

All output nodes of pure and activated nodes should have a valid value. e.g. in a Cast node, the output port should provide the original object if the cast fails. *NOTE:* This means the different output triggers may change the type of an output.

**State**

A *state* encompasses processes and event handlers.
Once a *state* is exited, its event handlers will be unregistered.

Define a *state*: `#stateName`.

**Nodes**

A *node* encompasses a single executable statement.

```
:getRes Radar.GetNearest(Resource) .then -> :moveToRes
|_____/ |______________/|________/ |______/ |________/
|label  |node function  |arguments |trigger |expression
```

**Label** (optional):
Gives a name to this node so it may be referred to elsewhere. Always begins with `:`.

**Function**:
The function the node will execute, e.g. `Harvester.IsFull` or `If`.

**Arguments** (optional, multiple):
Arguments to pass to the function. Parentheses may be omitted if no arguments required.

An argument may be one of the following:

* An input port on the current node `.value`
* An output port in another node `:getResource.contact`
* A static string representing a type or value, e.g. `true` or `Resource`

**Trigger** (optional, multiple):
If the function has the ability to activate another node, it is done through a trigger.

The trigger may not always have a name, e.g. `OnBegin -> :getResource`.

A function may have multiple triggers, e.g.
```
If(Harvester.IsFull)
    .then -> #unload
    .else -> :findResource
```

**Expression**:
The instruction to execute once a triggered is activated.

An expression may be one of the following:

* A state, e.g. `-> #unload`
* A node label, e.g. `-> :getResource`
* A function, e.g. `-> Mover.Move(.contact)`

A function expression may not activate any output triggers.

### Example harvester script:

```
OnInit -> #harvest

#idle
Radar.OnNewContact(Resource) -> #harvest

#harvest
OnBegin -> :ifFull
Harvester.OnEndHarvesting -> :ifFull
:ifFull If(Harvester.IsFull)
    .then -> #unload
    .else -> :getResource
:getResource Radar.GetNearest(Resource)
    .success -> :moveToContact
    .fail -> #idle
:moveToContact Mover.Move(:getResource.contact)

#unload
OnBegin -> :getFactory
:getFactory Radar.GetNearest(Factory)
    .success -> Mover.Move(.contact)
    .fail -> #idle
Harvester.OnEndUnload -> #harvest
```

**Tokens**

```ebnf
terminal = "(" | ")" | "," | "->";
ident    = :alpha: { :alphanum: };
state    = "#" ident;
node     = ":" ident;
port     = "." ident;
```

In regex:

```
[(),]|->
|#[A-Za-z][A-Za-z0-9]*
|:[A-Za-z][A-Za-z0-9]*
|\.[A-Za-z][A-Za-z0-9]*
|[A-Za-z][A-Za-z0-9]*
```

**Grammar**

```ebnf
statement  = [ node ], function, { trigger }
           | state;
function   = ident, [ port ], [ "(", [ arguments ], ")" ];
arguments  = reference, { ",", reference };
reference  = port
           | ( ident | node ) [ port ]
trigger    = [ port ], "->", expression;
expression = state
           | node [ port ]
           | function;
```
