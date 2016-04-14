using System.Collections.Generic;
using UnityEngine;

namespace Swarm
{
	public class Bot : Contactable
	{
		public int Level = 1;
		public int WeightLimit = 10;
		public int Health = 100;
		public int BaseCost = 50;
		public Faction Faction;
	}
}
