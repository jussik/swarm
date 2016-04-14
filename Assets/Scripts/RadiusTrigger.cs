using UnityEngine;

namespace Swarm
{
	public class RadiusTrigger : MonoBehaviour
	{
		public float Radius;
		public TriggerHandler OnEnter;
		public TriggerHandler OnExit;

		public delegate void TriggerHandler(Contactable contact);

		public static void Create(Transform parent, Layers layer, float radius,
			TriggerHandler onEnter = null, TriggerHandler onExit = null)
		{
			var container = new GameObject("RadiusTrigger." + layer);
			container.transform.parent = parent.transform;
			container.transform.localPosition = Vector3.zero;
			container.transform.localRotation = Quaternion.identity;
			container.transform.localScale = Vector3.one;
			container.layer = (int)layer;

			var collider = container.AddComponent<SphereCollider>();
			collider.isTrigger = true;
			collider.radius = radius;

			var trigger = container.AddComponent<RadiusTrigger>();
			trigger.Radius = radius;
			trigger.OnEnter = onEnter;
			trigger.OnExit = onExit;
		}

		private void OnDrawGizmos()
		{
			Gizmos.color = Color.yellow;
			Gizmos.DrawWireSphere(transform.position, Radius);
		}

		private void OnTriggerEnter(Collider other)
		{
			if (OnEnter != null)
			{
				var contact = other.GetComponentInParent<Contactable>();
				if (contact != null)
					OnEnter(contact);
			}
		}

		private void OnTriggerExit(Collider other)
		{
			if (OnExit != null)
			{
				var contact = other.GetComponentInParent<Contactable>();
				if (contact != null)
					OnExit(contact);
			}
		}
	}
}
