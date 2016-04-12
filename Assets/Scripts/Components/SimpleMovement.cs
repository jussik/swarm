using UnityEngine;

namespace Swarm.Components
{
	public class SimpleMovement : MonoBehaviour, IBotComponent
	{
		public float Speed = 2.0f;
		public GameObject Target;

		public float Weight { get { return 1; } }
		public Vector2 GridSize { get { return Size; } }

		private static readonly Vector2 Size = new Vector2(2, 2);

		private Rigidbody body;

		private void Start()
		{
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
