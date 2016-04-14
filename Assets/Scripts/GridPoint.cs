namespace Swarm
{
	public struct GridPoint
	{
		public readonly int X;
		public readonly int Y;

		public GridPoint(int x, int y)
		{
			X = x;
			Y = y;
		}

		public static GridPoint operator +(GridPoint a, GridPoint b)
		{
			return new GridPoint(a.X + b.X, a.Y + b.Y);
		}
	}
}