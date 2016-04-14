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

		private readonly HashSet<Resource> availableTargets = new HashSet<Resource>();
		private Resource target;

		private void Start()
		{
			var bot = GetComponent<Bot>();
			if (bot != null)
				RadiusTrigger.Create(transform, Layers.Sight, bot.ContactRadius + Range, OnEnter, OnExit);
		}

		// NOTE: in FixedUpdate because fixedDeltaTime ensures we don't get float errors
		private void FixedUpdate()
		{
			if(target == null || AmountStored >= Capacity)
				return;

			var toHarvest = Math.Min(HarvestRate * Time.fixedDeltaTime, Capacity - AmountStored);
			if (toHarvest > target.Value)
			{
				AmountStored += target.Value;
				Destroy(target.gameObject);
				availableTargets.Remove(target);
				SwitchTarget();
			}
			else
			{
				target.Value -= toHarvest;
				AmountStored += toHarvest;
			}
		}

		private void OnEnter(Contactable contact)
		{
			var res = contact as Resource;
			if (res != null)
			{
				availableTargets.Add(res);
				if (target == null)
					target = res;
			}
		}

		private void OnExit(Contactable contact)
		{
			var res = contact as Resource;
			if (res != null)
			{
				availableTargets.Remove(res);
				if(target == res)
					SwitchTarget();
			}
		}

		private void SwitchTarget()
		{
			target = availableTargets.FirstOrDefault();
		}
	}
}
