using System.Linq;
using Swarm.Attachables;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		private Radar radar;
		private Harvester harvester;
		private SimpleMovement mover;
		private bool active;

		private void Start()
		{
			radar = GetComponent<Radar>();
			harvester = GetComponent<Harvester>();
			mover = GetComponent<SimpleMovement>();

			radar.RadarContactEvent += (o, a) => active = true;

			active = true;
		}

		private void Update()
		{
			if (!active || harvester.Target != null || mover.Target != null)
				return;

			var nextTarget = radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (nextTarget != null)
				mover.Target = nextTarget;
			else
				active = false;
		}
	}
}
