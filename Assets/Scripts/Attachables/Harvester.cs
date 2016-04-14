using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace Swarm.Attachables
{
	public class Harvester : Attachable
	{
		public float Range = 0.3f;
		public float HarvestRate = 100.0f;
		public float Capacity = 700.0f;
		public float AmountStored;

		public readonly HashSet<Resource> AvailableTargets = new HashSet<Resource>();
		public Resource Target;

		private void Start()
		{
			var bot = GetComponent<Bot>();
			if (bot != null)
				RadiusTrigger.Create(transform, Layers.Sight, bot.ContactRadius + Range, OnEnter, OnExit);
		}

		// NOTE: in FixedUpdate because fixedDeltaTime ensures we don't get float errors
		private void FixedUpdate()
		{
			if(Target == null || AmountStored >= Capacity)
				return;

			var toHarvest = Math.Min(HarvestRate * Time.fixedDeltaTime, Capacity - AmountStored);
			if (toHarvest > Target.Value)
			{
				AmountStored += Target.Value;
				Destroy(Target.gameObject);
				AvailableTargets.Remove(Target);
				SwitchTarget();
			}
			else
			{
				Target.Value -= toHarvest;
				AmountStored += toHarvest;
			}
		}

		private void OnEnter(Contactable contact)
		{
			var res = contact as Resource;
			if (res != null)
			{
				AvailableTargets.Add(res);
				if (Target == null)
					Target = res;
			}
		}

		private void OnExit(Contactable contact)
		{
			var res = contact as Resource;
			if (res != null)
			{
				AvailableTargets.Remove(res);
				if(Target == res)
					SwitchTarget();
			}
		}

		private void SwitchTarget()
		{
			Target = AvailableTargets.FirstOrDefault();
		}
	}
}
