using UnityEngine;

namespace Swarm
{
	public abstract class Contactable : MonoBehaviour
	{
		public float ContactRadius = 0.5f;
		private GameObject contactParent;
		private SphereCollider contactCollider;

		protected virtual void Start()
		{
			contactParent = new GameObject("Contact");
			contactParent.transform.parent = transform;
			contactParent.layer = LayerMask.NameToLayer("Contact");

			contactCollider = contactParent.AddComponent<SphereCollider>();
			contactCollider.isTrigger = true;
			contactCollider.radius = ContactRadius;
		}

		protected virtual void OnDrawGizmos()
		{
			Gizmos.color = Color.red;
			Gizmos.DrawWireSphere(transform.position, ContactRadius);
		}
	}
}
