using System;
using UnityEngine;

namespace Swarm.Attachables
{
	public class SimpleMovement : Attachable
	{
		public Contactable Target;
		public float Speed = 2.0f;

		public event EventHandler TargetChanged;

		private Rigidbody body;
		private float boundaryRadius;

		protected void Start()
		{
			body = GetComponent<Rigidbody>();
			var bot = GetComponent<Bot>();
			if(bot != null)
			{
				boundaryRadius = bot.ContactRadius + 0.1f;
				RadiusTrigger.Create(transform, Layers.Sight, boundaryRadius, OnTouch);
			}
		}

		public void Stop()
		{
			if (Target != null)
				SetTarget(null);
		}

		public void MoveTo(Contactable contact)
		{
			if (contact != null && Target != contact
				&& Vector3.Distance(transform.position, contact.transform.position) > boundaryRadius + contact.ContactRadius)
				SetTarget(contact);
		}

		private void OnTouch(Contactable contact)
		{
			if (contact == Target)
				SetTarget(null);
		}

		private void FixedUpdate()
		{
			if (Target != null)
			{
				var diff = Target.transform.position - transform.position;
				body.velocity = diff.x * diff.x + diff.z * diff.z > 0.01f
					? diff.normalized * Time.fixedDeltaTime * Speed * 100.0f
					: Vector3.zero;
			}
			else
			{
				body.velocity = Vector3.zero;
			}
		}

		private void SetTarget(Contactable contact)
		{
			if (Target != contact)
			{
				Target = contact;
				if (TargetChanged != null)
					TargetChanged(this, EventArgs.Empty);
			}
		}
	}
}
