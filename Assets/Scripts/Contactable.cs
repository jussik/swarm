using UnityEngine;

namespace Swarm
{
	public abstract class Contactable : MonoBehaviour
	{
		public float ContactRadius = 0.5f;

		protected virtual void Start()
		{
			RadiusTrigger.Create(transform, Layers.Contact, ContactRadius);
		}
	}
}
