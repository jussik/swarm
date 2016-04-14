using UnityEngine;

namespace Swarm
{
	public abstract class Attachable : MonoBehaviour
	{
		public int Level = 1;
		public int Weight;
		public int Cost;
		public int GridWidth = 1;
		public int GridHeight = 1;
	}
}