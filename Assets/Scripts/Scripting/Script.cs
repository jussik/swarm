using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UnityEngine;

namespace Swarm.Scripting
{
	public class ScriptDefinition
	{
		public string InitialState;
	}

	public class Script
	{
		public static Script Parse(string filename)
		{
			// TODO: Get paths for other platforms
			//var dataPath = Environment.GetEnvironmentVariable("AppData");
			//if (dataPath == null)
			//	throw new NotSupportedException("Unable to locate AppData");
			//var basePath = Path.Combine(dataPath, "Swarm");
			//var behavioursPath = Path.Combine(basePath, "Behaviours");

			var def = JsonConvert.DeserializeObject<ScriptDefinition>(File.ReadAllText(filename));

			return null;
		}
	}
}
