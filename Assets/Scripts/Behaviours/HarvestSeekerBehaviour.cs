using System.Linq;
using Swarm.Attachables;
using UnityEngine;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		private Radar radar;
		private Harvester harvester;
		private SimpleMovement mover;
		private float? sleepUntil;

		private void Start()
		{
			radar = GetComponent<Radar>();
			harvester = GetComponent<Harvester>();
			mover = GetComponent<SimpleMovement>();
		}

		private void Update()
		{
			if (harvester.Target != null || mover.Target != null || Time.time < sleepUntil)
				return;

			var nextTarget = radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (nextTarget != null)
			{
				mover.Target = nextTarget;
				sleepUntil = 0.0f;
			}
			else sleepUntil = Time.time + 1.0f; // do not check again until a second from now
		}
	}
}
