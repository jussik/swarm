using System.Collections.Generic;
using UnityEngine;

namespace Swarm
{
	public class Bot : Contactable
	{
		public int Level = 1;
		public int WeightLimit = 10;
		public int Health = 100;
		public int BaseCost = 50;
		public float SightRadius = 1.0f;
		public Faction Faction;

		private readonly HashSet<Contactable> contacts = new HashSet<Contactable>();
		private GameObject sightParent;
		private SphereCollider sightCollider;

		protected override void Start()
		{
			base.Start();

			sightParent = new GameObject("Sight");
			sightParent.transform.parent = transform;
			sightParent.layer = LayerMask.NameToLayer("Sight");

			sightCollider = sightParent.AddComponent<SphereCollider>();
			sightCollider.isTrigger = true;
			sightCollider.radius = SightRadius;
		}

		protected override void OnDrawGizmos()
		{
			base.OnDrawGizmos();

			Gizmos.color = Color.yellow;
			Gizmos.DrawWireSphere(transform.position, SightRadius);
		}

		private void OnTriggerEnter(Collider other)
		{
			var contact = other.GetComponentInParent<Contactable>();
			if (contact != null)
				contacts.Add(contact);
		}

		private void OnTriggerExit(Collider other)
		{
			var contact = other.GetComponentInParent<Contactable>();
			if(contact != null)
				contacts.Remove(contact);
		}
	}
}
