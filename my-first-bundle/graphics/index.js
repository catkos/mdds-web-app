// You can access the NodeCG api anytime from the `window.nodecg` object
// Or just `nodecg` for short. Like this!:
nodecg.log.info("Here's an example of using NodeCG's logging API!");

nodecg.Replicant("speakerReplicant", { defaultValue: "Tom Nook" });
nodecg.Replicant("roleReplicant", { defaultValue: "Real Estate Agent" });

const speakerRep = nodecg.Replicant("speakerReplicant");
const puhuja = document.getElementById("puhuja");
const roleRep = nodecg.Replicant("roleReplicant");
const rooli = document.getElementById('rooli');

speakerRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  puhuja.innerHTML = newValue;
  nameAnimation();
});

roleRep.on("change", (newValue, oldValue) => {
  console.log(`myRep changed from ${oldValue} to ${newValue}`);
  rooli.innerHTML = newValue;
  roleAnimation();
});

const blokki = document.getElementById("blokki");
const tokablokki = document.getElementById("tokablokki");

function nameAnimation() {
  blokki.classList.remove("title-block-animation");
  blokki.offsetWidth;
  blokki.classList.add("title-block-animation");

  puhuja.classList.remove("title-h1-animation");
  puhuja.offsetWidth;
  puhuja.classList.add("title-h1-animation");
}

function roleAnimation() {
  tokablokki.classList.remove("role-block-animation");
  tokablokki.offsetWidth;
  tokablokki.classList.add("role-block-animation");

  rooli.classList.remove("role-p-animation");
  rooli.offsetWidth;
  rooli.classList.add("role-p-animation");
}