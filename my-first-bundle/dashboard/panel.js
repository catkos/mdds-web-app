// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");

const speakerRep = nodecg.Replicant("speakerReplicant");
const speaker = document.getElementById("speaker");
const roleRep = nodecg.Replicant("roleReplicant");
const role = document.getElementById("role");

speakerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  speaker.value = newValue;
});

roleRep.on("change", (newValue, oldValue) => {
	console.log(`myRep changed from ${oldValue} to ${newValue}`);
	role.value = newValue;
  });

const speakerForm = document.getElementById("speakerForm");

speakerForm.addEventListener("submit", (e) => {
  e.preventDefault;
  speakerRep.value = speaker.value;
  roleRep.value = role.value;
});