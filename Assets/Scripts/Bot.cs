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
		public Faction Faction;

		private readonly HashSet<Contactable> contacts = new HashSet<Contactable>();

		protected override void Start()
		{
			base.Start();

			RadiusTrigger.Create(transform, Layers.Sight, ContactRadius, AddContact, RemoveContact);
		}

		private void AddContact(Contactable contact)
		{
			contacts.Add(contact);
		}

		private void RemoveContact(Contactable contact)
		{
			contacts.Remove(contact);
		}
	}
}
