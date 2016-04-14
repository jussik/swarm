using System.Linq;
using Swarm.Attachables;
using UnityEngine;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		public Resource Target;

		private Radar Radar;
		private Harvester Harvester;
		private SimpleMovement Mover;

		private void Start()
		{
			Radar = GetComponent<Radar>();
			Harvester = GetComponent<Harvester>();
			Mover = GetComponent<SimpleMovement>();
			GetTarget();
		}

		private void Update()
		{
			GetTarget();
		}

		private void GetTarget()
		{
			if (Harvester.Target != null || Mover.Target != null)
				return;

			Target = Radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (Target != null)
				Mover.Target = Target;
		}
	}
}
