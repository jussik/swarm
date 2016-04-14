using System.Linq;
using Swarm.Attachables;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		private Radar radar;
		private Harvester harvester;
		private SimpleMovement mover;
		private Resource target;

		private void Start()
		{
			radar = GetComponent<Radar>();
			harvester = GetComponent<Harvester>();
			mover = GetComponent<SimpleMovement>();
		}

		private void Update()
		{
			if (harvester.Target != null || mover.Target != null)
				return;

			target = radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (target != null)
				mover.Target = target;
		}
	}
}
