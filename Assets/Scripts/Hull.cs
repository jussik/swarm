using System;
using System.Collections.Generic;
using Swarm.Components;
using UnityEngine;

namespace Swarm
{
	public class Hull : MonoBehaviour
	{
		public float WeightLimit { get { return 10.0f; } }

		private readonly IBotComponent[,] grid;

		public Hull()
		{
			grid = new IBotComponent[5, 5];
		}

		public bool CanAttachComponent(IBotComponent comp, GridPoint pos)
		{
			return !TryAttachComponentInternal(comp, pos, false);
		}

		public bool TryAttachComponent(IBotComponent comp, GridPoint pos)
		{
			return TryAttachComponentInternal(comp, pos, true);
		}

		private bool TryAttachComponentInternal(IBotComponent comp, GridPoint pos, bool attach)
		{
			var end = pos + comp.GridSize;
			if (pos.X < 0 || pos.Y < 0
				|| end.X >= grid.GetLength(0) || end.Y >= grid.GetLength(1)
				|| AreaHasComponent(pos, end))
				return false;

			if (attach)
			{
				for (var x = pos.X; x < end.X; x++)
				{
					for (var y = pos.Y; y < end.Y; y++)
					{
						grid[x, y] = comp;
					}
				}
			}

			return true;
		}

		private bool AreaHasComponent(GridPoint pos, GridPoint end)
		{
			for (var x = pos.X; x < end.X; x++)
			{
				for (var y = pos.Y; y < end.Y; y++)
				{
					if (grid[x, y] != null)
						return true;
				}
			}
			return false;
		}
	}
}
