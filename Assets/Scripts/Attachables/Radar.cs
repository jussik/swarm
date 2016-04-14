using System;
using System.Collections.Generic;

namespace Swarm.Attachables
{
	public class RadarContactArgs : EventArgs
	{
		public readonly Contactable Contact;
		public readonly bool ContactRemoved;

		public RadarContactArgs(Contactable contact, bool removed)
		{
			Contact = contact;
			ContactRemoved = removed;
		}
	}

	public class Radar : Attachable
	{
		public float Range = 10.0f;

		public readonly HashSet<Contactable> Contacts = new HashSet<Contactable>();

		public event EventHandler<RadarContactArgs> RadarContactEvent;

		private void Start()
		{
			var bot = GetComponent<Bot>();
			if (bot != null)
				RadiusTrigger.Create(transform, Layers.Sight, bot.ContactRadius + Range, AddContact, RemoveContact);
		}

		private void AddContact(Contactable contact)
		{
			Contacts.Add(contact);
			if(RadarContactEvent != null)
				RadarContactEvent(this, new RadarContactArgs(contact, false));
		}

		private void RemoveContact(Contactable contact)
		{
			Contacts.Remove(contact);
			if(RadarContactEvent != null)
				RadarContactEvent(this, new RadarContactArgs(contact, true));
		}
	}
}
