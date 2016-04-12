using UnityEngine;

namespace Swarm.Components
{
	public interface IBotComponent
	{
		float Weight { get; }
		Vector2 GridSize { get; }
	}
}