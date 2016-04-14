using System;
using System.Collections.Generic;
using Swarm.Attachables;
using UnityEngine;

namespace Swarm
{
	public class Grid : MonoBehaviour
	{
		public int Width;
		public int Height;

		private GridPoint size;
		private Attachable[,] grid;

		private void Start()
		{
			size = new GridPoint(Width, Height);
			grid = new Attachable[size.X, size.Y];
		}

		public bool CanAttachComponent(Attachable comp, GridPoint pos)
		{
			return !TryAttachComponentInternal(comp, pos, false);
		}

		public bool TryAttachComponent(Attachable comp, GridPoint pos)
		{
			return TryAttachComponentInternal(comp, pos, true);
		}

		private bool TryAttachComponentInternal(Attachable comp, GridPoint pos, bool attach)
		{
			var end = pos + new GridPoint(comp.GridWidth, comp.GridHeight);
			if (pos.X < 0 || pos.Y < 0
				|| end.X >= size.X || end.Y >= size.Y
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
