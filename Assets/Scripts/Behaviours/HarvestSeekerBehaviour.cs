using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Swarm.Attachables;
using UnityEngine;

namespace Swarm.Behaviours
{
	public class HarvestSeekerBehaviour : Behaviour
	{
		private Radar radar;
		private Harvester harvester;
		private SimpleMovement mover;

		private enum State { Idle, Harvesting }
		private State state;

		private void Start()
		{
			radar = GetComponent<Radar>();
			harvester = GetComponent<Harvester>();
			mover = GetComponent<SimpleMovement>();

			// TODO: replace with proper state transition table
			Transition(State.Harvesting);
		}

		private void Transition(State newState)
		{
			StartCoroutine(TransitionCoroutine(newState));
		}
		private IEnumerator TransitionCoroutine(State newState)
		{
			ExitState();
			yield return null;
			state = newState;
			EnterState();
		}

		private void ExitState()
		{
			switch (state)
			{
				case State.Idle:
					radar.RadarContactEvent -= OnRadarContact;
					break;
				case State.Harvesting:
					harvester.TargetChanged -= HarvesterTargetChanged;
					break;
			}
		}

		private void EnterState()
		{
			switch (state)
			{
				case State.Idle:
					radar.RadarContactEvent += OnRadarContact;
					break;
				case State.Harvesting:
					harvester.TargetChanged += HarvesterTargetChanged;
					Seek();
					break;
			}
		}

		private void HarvesterTargetChanged(object sender, EventArgs eventArgs)
		{
			if(harvester.Target == null)
				Seek();
		}

		private void Seek()
		{
			StartCoroutine(SeekCoroutine());
		}
		private IEnumerator SeekCoroutine()
		{
			yield return null;
			var target = radar.Contacts.OfType<Resource>()
				.Where(r => r != null)
				.MinBy(r => (transform.position - r.transform.position).sqrMagnitude);

			if (target != null)
				mover.MoveTo(target);
			else
				Transition(State.Idle);
		}

		private void OnRadarContact(object sender, RadarContactArgs radarContactArgs)
		{
			if (radarContactArgs.Contact is Resource && !radarContactArgs.ContactRemoved)
				Transition(State.Harvesting);
		}
	}
}
