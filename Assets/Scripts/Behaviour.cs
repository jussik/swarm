using UnityEngine;

namespace Swarm
{
	public abstract class Behaviour<TState> : MonoBehaviour
	{
		public TState initialState;
	}
}
