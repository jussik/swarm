using System.Linq;
using Swarm.Attachables;
using UnityEngine;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		public Resource Target;

		private Radar radar;
		private Harvester harvester;
		private SimpleMovement mover;

		private void Start()
		{
			radar = GetComponent<Radar>();
			harvester = GetComponent<Harvester>();
			mover = GetComponent<SimpleMovement>();
		}

		private void Update()
		{
			GetTarget();
		}

		private void GetTarget()
		{
			if (harvester.Target != null || mover.Target != null)
				return;

			Target = radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (Target != null)
				mover.Target = Target;
		}
	}
}
