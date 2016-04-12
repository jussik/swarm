using UnityEngine;

namespace Swarm.Components
{
	public class SimpleMovement : MonoBehaviour, IBotComponent
	{
		public float Speed = 2.0f;
		public GameObject Target;

		public float Weight { get { return 1; } }
		public GridPoint GridSize { get; private set; }

		private Rigidbody body;

		private void Start()
		{
			GridSize = new GridPoint(2, 2);
			body = GetComponent<Rigidbody>();
		}

		private void FixedUpdate()
		{
			var diff = Target.transform.position - transform.position;
			body.velocity = diff.x * diff.x + diff.z * diff.z > 0.01f
				? diff.normalized * Time.fixedDeltaTime * Speed * 100.0f
				: Vector3.zero;
		}
	}
}
