using UnityEngine;

namespace Swarm.Attachables
{
	public class SimpleMovement : Attachable
	{
		public GameObject Target;
		public float Speed = 2.0f;

		private Rigidbody body;

		protected void Start()
		{
			body = GetComponent<Rigidbody>();
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
	}
}
