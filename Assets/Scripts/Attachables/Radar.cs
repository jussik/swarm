using System.Collections.Generic;

namespace Swarm.Attachables
{
	class Radar : Attachable
	{
		public float Range = 10.0f;

		public readonly HashSet<Contactable> Contacts = new HashSet<Contactable>();

		private void Start()
		{
			var bot = GetComponent<Bot>();
			if (bot != null)
				RadiusTrigger.Create(transform, Layers.Sight, bot.ContactRadius + Range, AddContact, RemoveContact);
		}

		private void AddContact(Contactable contact)
		{
			Contacts.Add(contact);
		}

		private void RemoveContact(Contactable contact)
		{
			Contacts.Remove(contact);
		}
	}
}
