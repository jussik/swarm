using Swarm.Components;
using UnityEngine;

namespace Swarm
{
	public class Level : MonoBehaviour
	{
		public GameObject BotPrefab;

		private void Start()
		{
			var bot1 = Instantiate(BotPrefab);
			var mv1 = bot1.AddComponent<SimpleMovement>();

			var bot2 = Instantiate(BotPrefab);
			bot2.transform.position = new Vector3(3, 0, 2);
			var mv2 = bot2.AddComponent<SimpleMovement>();

			mv1.Target = bot2;

			var target = new GameObject("Target");
			target.transform.position = new Vector3(-2, 0, 0);
			mv2.Target = target;
		}
	}
}
