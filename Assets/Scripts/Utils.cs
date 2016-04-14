using System;
using System.Collections.Generic;
using UnityEngine;

namespace Swarm
{
	public enum Layers { Contact = 8, Sight = 9 }

	public static class Extensions
	{
		public static TSource MinBy<TSource, TValue>(this IEnumerable<TSource> source, Func<TSource, TValue> valueSelector) where TValue : IComparable
		{
			using (var iter = source.GetEnumerator())
			{
				if (!iter.MoveNext())
					return default(TSource);

				var minSrc = iter.Current;
				var minVal = valueSelector(minSrc);
				while (iter.MoveNext())
				{
					var src = iter.Current;
					var val = valueSelector(src);
					if (val.CompareTo(minVal) < 0)
					{
						minSrc = src;
						minVal = val;
					}
				}
				return minSrc;
			}
		}
	}
}
